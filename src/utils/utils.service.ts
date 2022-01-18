import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {

    async convertPassword(password: string): Promise<string> {
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword
    }

    async sendMail(
        emailTo: string,
        emailSubject: string,
        options = { emailBody: '', bCC: '', attached: ''}
    ) {
        // configuração esse tercho deve ser um método a parte.
        //Parte 1 da configuração 
        const clientId = process.env.CLIENT_ID;
        const secretKey = process.env.SECRET_KEY;
        const refresh_token = process.env.REFRESH_TOKEN;
        const redirectURI = 'https://developers.google.com/oauthplayground';
        const OAuth2 = google.auth.OAuth2;

        const oauth2Client = new OAuth2(clientId, secretKey, redirectURI);

        oauth2Client.setCredentials({
            refresh_token
        });

        const accessToken = oauth2Client.getAccessToken();

        //Parte 2 da configuração
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            logger: false,
            debug: false,
            auth: {
                type: 'OAuth2',
                user: 'noreply.emerjestudo@gmail.com',
                clientId: clientId,
                clientSecret: secretKey,
                refreshToken: refresh_token,
                accessToken
            }
        });

        //template do e-mail, também um método a parte.
        const BEMVINDO = `
            Seja muito bem vindo à EMERJ.
            <br/><br/>
            A vida é como uma grande firma, a qual despede seus colaboradores e contrata novos. 
            Profissionais esses que precisam sempre estar inovando, se especializando e caminhando 
            lado a lado da tecnologia e inovação.  
            O Gestor deve servir a equipe de colaboradores e não o inverso! 
            Como é de conhecimento de todos estamos em expansão comercial e estrutural, 
            conquistando novos  clientes, contratando novos profissionais, desenvolvendo e implementando 
            estratégias cada vez mais estratégicas e inovadoras. 
            Paralelo a esta expansão estamos implementando políticas de gestão pautadas na 
            igualdade e meritocracia, sempre buscando oferecer aos colaboradores de maneira 
            semelhante um ambiente de trabalho e ferramentas para as atividades laborais.
            <br/><br/>    
        `;

        const mailOptions = {
            from: 'noreply.emerjestudo@gmail.com',
            to: emailTo,
            bcc: 'a.tangy@gmail.com',
            subject: emailSubject,
            html: `
            <h1 style='font-sixe:2.5em; text-align: center; fonte-family: arial;'>${emailSubject}</h1>
            <p style='width:40%; margin: 0 auto;'>
                ${options.emailBody ? options.emailBody : BEMVINDO}
                Se este e-mail não foi solicitado, por favor desconsidere-o e informe o suporte@emerj.jus.br.
                <br/><br/>
                Atenciosamente,<br/>
                EMERJ.
            </p>
            `
        };
        //envia email
        try{
            const result = transporter.sendMail(mailOptions);
            if (!result.reject){
                return { mensage: 'E-mail enviado com sucesso!' };
            } else {
                return { message: result.reject};
            }
        }catch(error){
            return { message: error.message };
        }
    }
}
