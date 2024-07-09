import nodemailer from 'nodemailer'
import {google} from 'googleapis'
import accountTransport from './../../account_transport.json' assert { type: 'json' };

const OAuth2 = google.auth.OAuth2;
const mail_rover = async (callback) => {
    const oauth2Client = new OAuth2(
        accountTransport.auth.clientId,
        accountTransport.auth.clientSecret,
        "https://developers.google.com/oauthplayground",
    );
    oauth2Client.setCredentials({
        refresh_token: accountTransport.auth.refreshToken,
        tls: {
            rejectUnauthorized: false
        }
    });
    console.log('pasa')
    oauth2Client.getAccessToken((err, token) => {
        if (err)
            return console.log(err);
        accountTransport.auth.accessToken = token;
        callback(nodemailer.createTransport(accountTransport));
    });
};

export function 

sendMail(req, user, project, res, callback) {
    //const baseUrl = `${req.protocol}://${req.get('host')}/`;
    const mailOptions = {
        from: accountTransport.user,
        to: user.email,
        bcc: 'proyectosdevgt@gmail.com',
        subject: 'Asignación de proyecto',
        text: `Hola ${user.name}, tu proyecto es ${project.name}, el repositorio del frontend es ${project.repositoryFront} y del backend ${project.repositoryBack} `,
        html: `<p>Hola ${user.name},</p><p>tu proyecto es <strong>${project.name}</strong>, el repositorio del frontend es ${project.repositoryFront} y el del backend ${project.repositoryBack}</p>`
    };

    mail_rover(function (emailTransporter) {
        emailTransporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).json(
                    {
                        response: "Error al enviar el correo, proyecto no asignado.",
                        error: "Failed to send email / Look the network connection"
                    }
                )
            } else {
                console.log('Correo enviado correctamente:', info.response);
                return callback(user.email); // Llama al callback cuando el correo se haya enviado correctamente
            }
        });
    });
}