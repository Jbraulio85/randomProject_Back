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
            res.status(200).json({
                response: "Estudiante guardado correctamente"
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
            res.status(200).json({
                response: "Estudiante agregado exitosamente",
                project: student
            })
        }
    } catch (err) {
        return res.status(500).json(
            {
                response: "Error al agregar datos",
                error: err
            }
        )
    }
}

