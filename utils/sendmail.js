import nodemailer from 'nodemailer';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const accountTransport = require('../account_transport.json');

export function sendMail(req, user, project, res, callback) {
    const mailOptions = {
        from: accountTransport.auth.user,
        to: user.email,
        bcc: 'braulioecheverria@kinal.org.gt',
        subject: 'Asignación de Proyecto Académico',
        text: `Hola ${user.name},\n\nTe informamos que se te ha asignado el siguiente proyecto:\n\nNombre del proyecto: ${project.name}\nRepositorio Backend: ${project.repositoryBack}\nRepositorio Frontend: ${project.repositoryFront}\n\nPor favor revisa los enlaces y comunícate con tu instructor si tienes dudas.\n\nSaludos cordiales,\nEquipo de Coordinación Académica`,
        html: `<div style="font-family: Arial, sans-serif; color: #222;">
            <h2>Asignación de Proyecto Académico</h2>
            <p>Estimado/a <strong>${user.name}</strong>,</p>
            <p>Nos complace informarte que se te ha asignado el siguiente proyecto:</p>
            <ul>
                <li><strong>Nombre del proyecto:</strong> ${project.name}</li>
                <li><strong>Repositorio Backend:</strong> <a href="${project.repositoryBack}">${project.repositoryBack}</a></li>
                <li><strong>Repositorio Frontend:</strong> <a href="${project.repositoryFront}">${project.repositoryFront}</a></li>
            </ul>
            <p>Por favor revisa los enlaces y comunícate con tu instructor si tienes alguna duda o inconveniente.</p>
            <p style="margin-top: 30px;">Saludos.<br>Equipo de docentes 6to Informática.</p>
        </div>`
    };

    const transporter = nodemailer.createTransport(accountTransport);

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({
                response: "Error al enviar el correo, proyecto no asignado.",
                error: "Failed to send email / Look the network connection"
            });
        } else {
            console.log('Correo enviado correctamente:', info.response);
            return callback(user.email);
        }
    });
}