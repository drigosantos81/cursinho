const db = require('../../config/db');
const { age, date } = require('../../lib/utils');

module.exports = {

    all(callback) {
        db.query(`
        SELECT * FROM my_teacher
        ORDER BY name ASC`, function(err, results) {
            if (err) {
                throw `Problemas com o banco de dados! ${err}`
            }

            callback(results.rows);
        });
    },

    post(data, callback) {
        const query = `
            INSERT INTO my_teacher (avatar_url, name, birth_date, gender, services, estudo, aula, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `;

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.estudo,
            data.aula,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if (err) {
                throw `Problemas com o banco de dados! ${err}`
            }

            callback(results.rows[0]);
        });
    },

    find(id, callback) {
        db.query(`
            SELECT * FROM my_teacher
            WHERE id = $1`, [id], function(err, results) {
            if (err) {
                throw `Problemas com o banco de dados! ${err}`
            }

            callback(results.rows[0]);
        });
    }
}