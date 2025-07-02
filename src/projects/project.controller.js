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
        const projects = await projectModel.find()
        if (projects.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay proyectos disponibles para asignar",
                error: 'No Projects Found'
            })
        }

        const randomProject = projects[Math.floor(Math.random() * projects.length)]

        const updatedStudent = await Student.findOneAndUpdate(
            { 
                studentId: studentId, 
                assigned: false
            },
            { 
                projectAssigned: randomProject._id,
                assigned: true 
            },
            { 
                new: true,
                runValidators: true 
            }
        )

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "Número de carnet no encontrado o ya se le ha asignado proyecto",
                error: 'Not Found Student / Already assigned project'
            })
        }

        const response = {
            success: true,
            message: "Proyecto asignado exitosamente, recibirás un correo de confirmación",
            data: {
                student: updatedStudent,
                project: randomProject
            }
        }

        sendMail(updatedStudent, randomProject)
            .then(email => {
                console.log(`Email enviado exitosamente a: ${email}`);
            })
            .catch(error => {
                console.error('Error al enviar el correo:', error);
            });

        return res.status(200).json(response)

    }catch(err){
        console.error('Error en asignProject:', err)
        return res.status(500).json({
            success: false,
            message: "Error general al asignar proyecto",
            error: err.message
        })
    }
}
