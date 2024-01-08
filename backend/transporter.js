const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "entregasallin@gmail.com",
        pass: "yspivtwfcsayoxqa"
    },

});

const sendEmail = (name, orderId) => transporter.sendMail({
    from: "entregasallin@gmail.com",
    to: process.env.EMAIL_DEFAULT,
    subject: 'Nova encomenda',
    html: `
    <html>

    <body
        style="background-color: #f1f1f1; font-family: Arial, sans-serif; margin: 0; padding: 0; height: 100%; display: flex; justify-content: center; align-items: center;">
        <div style="text-align: center; background-color: #ffffff; color: #333; padding: 20px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); height: 100%; justify-content: space-between; display: flex;
          flex-direction: column">
            <h1 style="font-family: 'Georgia', 'Times New Roman', 'Times', serif; margin: 0; color: #333;">Nova encomenda de
                ${name}!</h1>
                <p style="font-size: 20px;font-family: Arial, font-weight:700,Helvetica, sans-serif;">E essa é a encomenda número...${orderId}</p>
            <span>
                <p style="font-size: 16px;font-family: Arial, Helvetica, sans-serif;">De uma clicada ai meu camarada</p>

                <a href="${process.env.ORDER_URL}/${orderId}" style="text-decoration: none;">
                    <button
                        style="font-weight: 700; background-color: #ba8f00; cursor: pointer;;color: white; border: none; padding: 15px 30px; border-radius: 5px; font-size: 16px; cursor: pointer;">
                        Confira a encomenda</button>
                </a>
            </span>
        </div>
    </body>
    
    </html>
    `,
});

module.exports = sendEmail