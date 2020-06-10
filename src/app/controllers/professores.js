const Professor = require('../models/Professor');
const { age, date, birthDay } = require('../../lib/utils');
const Intl = require('intl');

module.exports = {
    index(req, res) {
        Professor.all(function(professores) {
            return res.render("professores/index", { professores });
        });
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
           return res.redirect(`/professores/${professor.id}`); // /${professor.id}
       });
    },
    
    show(req, res) {
        Professor.find(req.params.id, function(professor) {
            if (!professor) {
                return res.send('Registro não encontrado');
            }

            professor.age = age(professor.birth);
            professor.services = professor.services.split(',');
            professor.created_at = date(professor.created_at).format;

            return res.render('professores/show', { professor });
        });
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
