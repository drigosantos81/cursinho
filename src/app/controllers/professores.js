const Professor = require('../models/Professor');
const { age, date, birthDay } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query;

        page = page || 1;
        limit = limit || 3;
        let offset = limit * (page - 1);

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(professores) {
                const pagination = {
                    total: Math.ceil(professores[0].total / limit),
                    page
                }
                return res.render("professores/index", { professores, pagination, filter });
            }
        };

        Professor.paginate(params);
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

        Professor.post(req.body, function(professor) {
            return res.redirect(`/professores/${professor.id}`);
    });
    },
    
    show(req, res) {
        Professor.find(req.params.id, function(professor) {
            if (!professor) {
                return res.send('Registro não encontrado');
            }

            professor.age = age(professor.birth_date);
            professor.services = professor.services.split(',');
            professor.created_at = date(professor.created_at).format;

            return res.render('professores/show', { professor });
        });
    },
    
    edit(req, res) {
        Professor.find(req.params.id, function(professor) {
            if (!professor) {
                return res.send('Registro não encontrado');
            }

            professor.birth = date(professor.birth_date).iso;

            return res.render('professores/edit', { professor });
        });
    },
    
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor preencha todos os campos');
            }
        }

        Professor.update(req.body, function() {
            return res.redirect(`/professores/${req.body.id}`);
        });
        
    },
    
    delete(req, res) {
        Professor.delete(req.body.id, function() {
            return res.redirect(`/professores`)
        });
    }

}
