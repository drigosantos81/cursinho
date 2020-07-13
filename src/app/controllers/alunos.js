const Aluno = require('../models/Aluno');
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
            callback(alunos) {
                const pagination = {
                    total: Math.ceil(alunos[0].total / limit),
                    page
                }
                return res.render("alunos/index", { alunos, pagination, filter });
            }
        }

        Aluno.paginate(params);
    },
    
    create(req, res) {
        Aluno.professorSelectOptions(function(options) {
            return res.render("alunos/create", { professorOptions: options });
        });
    },
    
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos.");
            }
        }

       Aluno.post(req.body, function(aluno) {
           return res.redirect(`/alunos/${aluno.id}`);
       });
    },
    
    show(req, res) {
        Aluno.find(req.params.id, function(aluno) {
            if (!aluno) {
                return res.send('Registro não encontrado');
            }

            aluno.age = age(aluno.date_birth);
            aluno.birthDay = birthDay(aluno.date_birth).iso;
            aluno.created_at = date(aluno.created_at).format;

            return res.render('alunos/show', { aluno });
        });
    },
    
    edit(req, res) {
        Aluno.find(req.params.id, function(aluno) {
            if (!aluno) {
                return res.send('Registro não encontrado');
            }

            aluno.birth = date(aluno.date_birth).iso;

            Aluno.professorSelectOptions(function(options) {
                return res.render("alunos/edit", { aluno, professorOptions: options });
            });
        });
    },
    
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Por favor preencha todos os campos');
            }
        }

        Aluno.update(req.body, function() {
            return res.redirect(`/alunos/${req.body.id}`);
        });
        
    },
    
    delete(req, res) {
        Aluno.delete(req.body.id, function() {
            return res.redirect(`/alunos`)
        });
    }

}
