const { age, date } = require('../../lib/utils');
const Intl = require('intl');

module.exports = {
    index(req, res) {
        return res.render("professores/index");
    },
    
    create(req, res) {
        return res.render("professores/create");
    },
    
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos.");
            }
        }

       return;
    },
    
    show(req, res) {
        return;
    },
    
    edit(req, res) {
        return;
    },
    
    put(req, res) {
        const { id } = req.body;
        let index = 0;

        const foundProfessor = data.professores.find(function(professor, foundIndex) {
            if (id == professor.id) {
                index = foundIndex;
                return true;
            };
        });
        
       return;
    },
    
    delete(req, res) {
        return;
    }
}
