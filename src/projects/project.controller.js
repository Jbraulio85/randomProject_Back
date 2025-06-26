import projectModel from "./project.model.js"
import Student from '../student/student.model.js'
import { sendMail } from "../../utils/sendmail.js";

export const createProject = async (req, res) => {
    try{
        const {name, repositoryBack, repositoryFront} = req.body;
        const project = new projectModel({ name, repositoryBack, repositoryFront})
        await project.save()
        return res.status(200).json({
            success: true,
            message: "Proyecto agregado exitosamente",
            data: project
        })
    }catch(e){
        return res.status(500).json({
            success: false,
            message: "Error al crear el proyecto",
            error: e.message
        })
    }
}

export const asignProject = async (req, res)=>{
    const { studentId } = req.body
    try{
        const studentExist = await Student.findOne({studentId})
        if(studentExist && !studentExist.assigned){
            const projects = await projectModel.find()
            if (projects.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No hay proyectos disponibles para asignar",
                    error: 'No Projects Found'
                })
            }
            const randomProject = projects[Math.floor(Math.random() * projects.length)]

            studentExist.projectAssigned = randomProject._id
            studentExist.assigned = true
            
            //Agregar lo del Emailer
            sendMail(req, studentExist, randomProject, res, async (email)=>{
                await studentExist.save()
                return res.status(200).json({
                    success: true,
                    message: `Proyecto asignado exitosamente, revisa tu correo ${email}`,
                    data: {
                        student: studentExist,
                        project: randomProject
                    }
                })
            })
        }else{
            return res.status(404).json({
                success: false,
                message: "Número de carnet no encontrado o ya se le ha asignado proyecto",
                error: 'Not Found Student / Already assigned project'
            })
        }

    }catch(err){
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Error general al asignar proyecto",
            error: err.message
        })
    }
}
