import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const accountTransport = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN
  }
};

export function sendMail(req, user, project, res, callback) {
    const mailOptions = {
        from: accountTransport.auth.user,
        to: user.email,
        bcc: 'braulioecheverria@kinal.org.gt',
        subject: 'Asignación de Proyecto Académico',
        text: `Hola ${user.name},\n\nTe informamos que se te ha asignado el siguiente proyecto:\n\nNombre del proyecto: ${project.name}\nRepositorio Backend: ${project.repositoryBack}\nRepositorio Frontend: ${project.repositoryFront}\n\nPor favor revisa los enlaces y comunícate con tu instructor si tienes dudas.\n\nSaludos cordiales,\nEquipo de Coordinación Académica`,
        html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 32px 0;">
          <div style="max-width: 520px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 32px 36px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <img src='https://i.ibb.co/84tQx6H5/Escudo-Transparente.png' alt='Proyecto' style='width:64px; margin-bottom: 8px;'>
              <h2 style="color: #2d3748; margin: 0 0 8px 0;">Asignación de Proyecto Académico</h2>
            </div>
            <p style="color: #222; font-size: 1.08em;">Estimado/a <strong>${user.name}</strong>,</p>
            <p style="color: #222;">Nos complace informarte que se te ha asignado el siguiente proyecto:</p>
            <div style="background: #f1f5fb; border-radius: 8px; padding: 18px 20px; margin: 18px 0;">
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 10px;"><strong>Nombre del proyecto:</strong> <span style='color:#2b6cb0;'>${project.name}</span></li>
                <li style="margin-bottom: 10px;"><strong>Repositorio Backend:</strong> <a href="${project.repositoryBack}" style="color: #3182ce; text-decoration: underline;">${project.repositoryBack}</a></li>
                <li><strong>Repositorio Frontend:</strong> <a href="${project.repositoryFront}" style="color: #3182ce; text-decoration: underline;">${project.repositoryFront}</a></li>
              </ul>
            </div>
            <p style="color: #222;">Por favor revisa los enlaces y comunícate con tu instructor si tienes alguna duda o inconveniente.</p>
            <div style="margin-top: 36px; text-align: right;">
              <span style="color: #4a5568; font-size: 1em;">Saludos cordiales,<br><strong>Equipo de docentes 6to Informática</strong></span>
            </div>
          </div>
          <div style="text-align:center; color:#b0b0b0; font-size:0.95em; margin-top:18px;">Este es un mensaje automático, por favor no responder a este correo.</div>
        </div>
        `
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