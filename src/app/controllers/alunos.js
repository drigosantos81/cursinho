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

            return res.render('alunos/edit', { aluno });
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
