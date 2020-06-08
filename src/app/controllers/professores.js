const fs = require('fs');
const data = require('../data.json');
const { age, date } = require('../utils');

// index
exports.index = function(req, res) {
    return res.render("professores/index", { professores: data.professores });
};

exports.create = function(req, res) {
    return res.render("professores/create");
}

// create - POST
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor, preencha todos os campos.");
        }
    }

    let { avatar_url, name, birth, estudo, aula, services } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.professores.length + 1);

    data.professores.push({
        id, 
        avatar_url, 
        name, 
        birth, 
        aula,
        estudo,
        services, 
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Erro ao salvar o arquivo.");

        return res.redirect("/professores");
    });
};

// show
exports.show = function(req, res) {
    const { id } = req.params;

    const foundProfessor = data.professores.find(function(professor) {
        return id == professor.id;
    });
    
    if (!foundProfessor){
        return res.send("Professor não encontrado.");
    }

    const professor = {
        ...foundProfessor,
        age: age(foundProfessor.birth),
        services: foundProfessor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundProfessor.created_at),
    }

    return res.render("professores/show", { professor });
};

// edit
exports.edit = function(req, res) {
    const { id } = req.params;

    const foundProfessor = data.professores.find(function(professor) {
        return id == professor.id;
    });
    
    if (!foundProfessor){
        return res.send("Professor não encontrado.");
    }

    const professor = {
        ...foundProfessor,
        birth: date(foundProfessor.birth),
    }
    
    return res.render("professores/edit", { professor });
}

// update - PUT
exports.put = function(req, res) {
    const { id } = req.body;
    let index = 0;

    const foundProfessor = data.professores.find(function(professor, foundIndex) {
        if (id == professor.id) {
            index = foundIndex;
            return true;
        };
    });
    
    if (!foundProfessor){
        return res.send("Professor não encontrado.");
    }

    const professor = {
        ...foundProfessor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id),
    }

    data.professores[index] = professor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Erro ao salvar o arquivo.");
        }
        return res.redirect(`/professores/${id}`);
    })

};

// delete - DELETE
exports.delete = function(req, res) {
    const { id } = req.body;

    const filteredProfessores = data.professores.filter(function(professor) {
        return professor.id != id;
    });

    data.professores = filteredProfessores;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Erro ao salvar o arquivo.");
        };
    });

    return res.redirect("/professores");
};
