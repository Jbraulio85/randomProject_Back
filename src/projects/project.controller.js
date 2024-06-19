import projectModel from "./project.model.js"

export const createProject = async (req, res) => {
    const {name, repository} = req.body;

    const project = new projectModel({ name, repository})

    await project.save()

    res.status(200).json({
        response: "Projecto agregado exitosamente",
        project
    })
}

