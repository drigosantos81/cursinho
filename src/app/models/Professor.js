const db = require('../../config/db');
const { age, date } = require('../../lib/utils');

module.exports = {

    all(callback) {
        db.query(`
            SELECT my_teacher.*, COUNT(students) AS total_alunos FROM my_teacher
            LEFT JOIN students ON (students.professor_id = my_teacher.id)
            GROUP BY my_teacher.id
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
    },

    update(data, callback) {
        const query = `
            UPDATE my_teacher SET
            avatar_url=($1), name=($2), birth_date=($3), gender=($4), services=($5), estudo=($6), aula=($7)
            WHERE id = $8
        `;

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.estudo,
            data.aula,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) {
                throw `Database error! ${err}`;
            }

            callback();
        });
    },

    delete(id, callback) {
        db.query(`
            DELETE FROM my_teacher
            WHERE id = $1`, [id], function(err, results) {
            if (err) {
                throw `Database error! ${err}`;
            }

            return callback();
        });
    }

}