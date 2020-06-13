const Aluno = require('../models/Aluno');
const { age, date, birthDay } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        Aluno.all(function(alunos) {
            return res.render("alunos/index", { alunos });
        });
    },
    
    create(req, res) {
        return res.render("alunos/create");
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
        Aluno.find(req.params.id, function(professor) {
            if (!professor) {
                return res.send('Registro não encontrado');
            }

            professor.age = age(professor.birth);
            professor.services = professor.services.split(',');
            professor.created_at = date(professor.created_at).format;

            return res.render('alunos/show', { professor });
        });
    },
    
    edit(req, res) {
        Aluno.find(req.params.id, function(professor) {
            if (!professor) {
                return res.send('Registro não encontrado');
            }

            professor.birth = date(professor.birth).iso;

            return res.render('alunos/edit', { professor });
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
