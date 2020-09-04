const Aluno = require('../models/Aluno');
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
        // PROMISE
        Professor.allPromise()
        .then(function(results) {
            const professorSelected = results.rows;
            return res.render("alunos/create", { professorSelected });
        }).catch(function(err) {
            throw new Error(err);
        });
    },
    
    async post(req, res) {
        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos.");
            }
        }

        let results = await Aluno.post(req.body);
        const aluno = results.rows[0];

        results = await Professor.allPromise();
        const professores = results.rows;

        return res.render('alunos/create', { aluno, professores });
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
    
    async edit(req, res) {
        let results = await Aluno.findPromise(req.params.id);
        const aluno = results.rows[0];

        if (!aluno) {
            return res.send('Produto não encontrado');
        }

        aluno.birth = date(aluno.date_birth).iso;

        results = await Professor.allPromise();
        const professorSelected = results.rows;

        return res.render("alunos/edit", { aluno, professorSelected });

        // PROMISE

        // .then(function(results) {
        //     const professorSelected = results.rows;
        //     return res.render("alunos/create", { aluno, professorSelected });
        // }).catch(function(err) {
        //     throw new Error(err);
        // });
        
        // CALLBACK 

        // Aluno.find(req.params.id, function(aluno) {
        //     if (!aluno) {
        //         return res.send('Registro não encontrado');
        //     }

        //     aluno.birth = date(aluno.date_birth).iso;
        //     Aluno.professorSelectOptions(function(options) {
        //         return res.render("alunos/edit", { aluno, professorOptions: options });
        //     });
        // });
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
