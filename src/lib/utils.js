module.exports = {
    age(timestamp) {
        
        const today = new Date();
        const birthDate = new Date(timestamp);
        
        let age = today.getFullYear() - birthDate.getFullYear();        
        const month = today.getMonth() - birthDate.getMonth();
        
        if ( month < 0 ||
            month == 0 &&
            today.getDate() <= birthDate.getDate()) {
                age = age - 1;
        }
        
        return age;
    },

    date(timestamp) {

        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        // Padrão de data no HTML: yyyy-mm-dd
        return {
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        } 
    },

    birthDay(timestamp) {

        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        // Padrão de data no HTML: yyyy-mm-dd
        return {
            day,
            month,
            year,
            iso: `${day}/${month}`,
            birthDate: `${month}/${year}`,
            format: `${day}/${month}/${year}`
        };
    }
}