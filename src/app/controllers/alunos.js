const { age, date, birthDay } = require('../../lib/utils');
const Intl = require('intl');

module.exports = {
    index(req, res) {
        return res.render("alunos/index");
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

        const foundAluno = data.alunos.find(function(aluno, foundIndex) {
            if (id == aluno.id) {
                index = foundIndex;
                return true;
            };
        });
        
        return;
    },

    delete(req, res) {
        return
    }
}
