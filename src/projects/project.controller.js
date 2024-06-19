import projectModel from "./project.model.js"
import Student from '../student/student.model.js'

export const createProject = async (req, res) => {
    const {name, repository} = req.body;

    const project = new projectModel({ name, repository})

    await project.save()

    res.status(200).json({
        response: "Projecto agregado exitosamente",
        project
    })
}

export const asignProject = async (req, res)=>{
    const { studentId } = req.body
    try{
        const studentExist = await Student.findOne({studentId})
        if(studentExist && !studentExist.assigned){
            const projects = await projectModel.find()
            if (projects.length === 0) {
                return res.status(404).json({
                    response: "No hay proyectos disponibles para asignar",
                    error: 'No Projects Found'
                })
            }
            const randomProject = projects[Math.floor(Math.random() * projects.length)]

            studentExist.projectAssigned = randomProject._id
            studentExist.assigned = true
            await studentExist.save()

            //Agregar lo del Emailer

            res.status(200).json({
                response: "Proyecto asignado exitosamente",
                project: randomProject
            })
        }else{
            return res.status(404).json(
                {
                    response: "Número de carnet no encontrado o ya se le ha asignado proyecto",
                    error: 'Not Found Student'
                }
            )
        }

    }catch(err){
        console.error(err)
        return res.status(500).json(
            {
                response: "Error general al asignaro proyecto",
                error: err
            }
        )
    }
}
