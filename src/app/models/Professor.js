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

    findProfessor(filterMaster, callback) {
        db.query(`
            SELECT my_teacher.*, COUNT(students) AS total_alunos FROM my_teacher
            LEFT JOIN students ON (students.professor_id = my_teacher.id)
            WHERE my_teacher.name ILIKE '%${filterMaster}%'
            OR my_teacher.services ILIKE '%${filterMaster}%'
            GROUP BY my_teacher.id
            ORDER BY total_alunos DESC
        `, function(err, results) {
            if (err) {
                throw `Database error! ${err}`
            }

            callback(results.rows);
        });
    },

    findAluno(filterAluno, callback) {
        db.query(`
            SELECT students.* FROM students
            WHERE students.name ILIKE '%${filterAluno}%'
            ORDER BY students DESC
        `, function(err, results) {
            if (err) {
                throw `Database error! ${err}`
            }

            callback(results.rows);
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
    },

    paginate(params) {
        const { filter, limit, offset , callback } = params;

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT COUNT(*) FROM my_teacher
            ) AS total`

        if (filter) {
            filterQuery = `
            WHERE my_teacher.name ILIKE '%${filter}%'
            OR my_teacher.services ILIKE '%${filter}%'`

            totalQuery = `(
                SELECT COUNT(*) FROM my_teacher
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT my_teacher.*, ${totalQuery}, COUNT(students) AS total_students FROM my_teacher
            LEFT JOIN students ON (my_teacher.id = students.professor_id)
            ${filterQuery}
            GROUP BY my_teacher.id LIMIT $1 OFFSET $2`
        
        db.query(query, [limit, offset], function(err, results) {
            if (err) {
                throw `Database error! ${err}`;
            }

            callback(results.rows);
        });
    }

}