const db = require('../../config/db');
const { age, date } = require('../../lib/utils');

module.exports = {

    all(callback) {
        db.query(`
        SELECT * FROM students
        ORDER BY name ASC`, function(err, results) {
            if (err) {
                throw `Problemas com o banco de dados! ${err}`
            }

            callback(results.rows);
        });
    },

    post(data, callback) {
        const query = `
            INSERT INTO students (avatar_url, name, email, date_birth, escola, ch, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.escola,
            data.ch,
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
            SELECT * FROM students
            WHERE id = $1`, [id], function(err, results) {
            if (err) {
                throw `Problemas com o banco de dados! ${err}`
            }

            callback(results.rows[0]);
        });
    },

    update(data, callback) {
        const query = `
            UPDATE students SET
            avatar_url=($1), name=($2), email=($3), date_birth=($4), escola=($5), ch=($6), estudo=($7)
            WHERE id = $7
        `;

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.escola,
            data.ch,
            date(Date.now()).iso,
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
            DELETE FROM students
            WHERE id = $1`, [id], function(err, results) {
            if (err) {
                throw `Database error! ${err}`;
            }

            return callback();
        });
    }

}