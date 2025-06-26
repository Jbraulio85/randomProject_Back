import Student from "./student.model.js"

export const createStudent = async (req, res) => {
    try {
        const { studentId, name, surname, email, section, multi, students } = req.body;
        if (multi && students.length > 0) {
            for (const student of students) {
                const newStudent = new Student(
                    {
                        studentId: student.studentId,
                        name: student.name,
                        surname: student.surname,
                        email: student.email,
                        section: student.section
                    }
                )
                await newStudent.save()
            }
            return res.status(200).json({
                success: true,
                message: "Estudiantes guardados correctamente",
                data: null
            })
        } else {
            const student = new Student(
                {
                    studentId,
                    name,
                    surname,
                    email,
                    section
                }
            )
            await student.save()
            return res.status(200).json({
                success: true,
                message: "Estudiante agregado exitosamente",
                data: student
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al agregar datos",
            error: err.message
        })
    }
}

