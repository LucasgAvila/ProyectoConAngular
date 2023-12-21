var Project = require('../models/project')

var controller = {

    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la Home'
        })
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Soy el metodo o la accion test del controlador del proyecto'
        })
    },

    saveProject: function (req, res) {
        var project = new Project();
 
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null
 
        project.save((err, prohectStored) => {
            if(err) return res.status(500).send({
                message: 'Error al guardar el documento'
            }) 
            if(!prohectStored) return res.status(404).send({
                message: 'No se ha podido guardar el proyecto'
            })
            return res.status(200).send({project: prohectStored})
        })
            
    },
        getProject: async function(req, res){
            var projectId = req.params.id;
            let project;

            if(projectId == null) return res.status(404).send({
                message : "Error al devolver datos"})
                try {
                project = await Project.findById(projectId)
                return res.status(200).send({project})
            }   
                catch (error) {
                return res.status(404).send({
                    message: "El proyecto no existe"
                })
            }
            
        },
        
        getProjects: function(req, res){
            
            Project.find({}).sort('-year')
            .then((projects)=>{

                if(!projects) return res.status(404).send({message: "No hay proyectos que mostrar..."});
     
                return res.status(200).send({message: "Proyectos ",
                                             projects});
            }).catch((err)=>{
                if(err) return res.status(500).send({message: "Error al devolver los datos"});
            })
        },

        updateProject: function(req, res){
            var projectId = req.params.id;
            var update = req.body;
     
            Project.findByIdAndUpdate(projectId, update)
            .then((projectUpdated)=>{
                return res.status(200).send({
                    project: projectUpdated
                })
            })
            .catch(() => {
                return res.status(404).send({message: "Proyecto no encontrado para actualizar."});
            })
        },

        deleteProject: function (req, res) {
            var projectId = req.params.id;
     
            Project.findByIdAndDelete(projectId)
                .then((Project) => {
                    return res.status(200).send({
                        message: "Projecto Eliminado"
                    })
                })
                .catch(() => {
                    return res.status(404).send({ message: "Projecto no encontrado" })
                })
        },

        uploadImage: async function (req, res) {
            try {
                const projectId = req.params.id;
                const fileName = 'Imagen no subida';
     
                if (req.files && req.files.image) {
                    const filePath = req.files.image.path;
                    const fileSplit = filePath.split('/');
                    const fileNameNew = fileSplit[fileSplit.length - 1];
     
                    const updateImage = await 
                    Project.findByIdAndUpdate(
                        projectId,
                        { image: fileNameNew },
                        { new: true }
                    );
     
                    if (updateImage) {
                        return res.status(200).send({
                            files: fileNameNew,
                            message: 'El archivo se ha subido con éxito'
                        });
                    } else {
                        return res.status(404).send({
                            message: 'No se ha encontrado el proyecto'
                        });
                    }
                } else {
                    return res.status(200).send({
                        message: fileName
                    });
                }
            } catch (err) {
                return res.status(500).send({ message: 'Error al llamar al método uploadImage' });
            }
        }
}

module.exports = controller;