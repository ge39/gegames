import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, eventType, message } = req.body;

    // Exibe as variáveis no console para verificar se estão corretas
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

    // Criação do transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Acessando a variável de ambiente
        pass: process.env.EMAIL_PASS,  // Acessando a variável de ambiente
      },
      tls: {
        rejectUnauthorized: false,  // Desativa a verificação de certificados SSL
      },
      secure: true,  // Conexão segura
    });

    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,  // Envia para o e-mail configurado
        subject: `Solicitação de Orçamento de ${name}`,
        html: `
          <h3>Solicitação de Orçamento</h3>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone}</p>
          <p><strong>Tipo de Evento:</strong> ${eventType}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${message}</p>
        `,
      });

      return res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      return res.status(500).json({ success: false, message: 'Erro ao enviar o e-mail. Tente novamente mais tarde.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Método ${req.method} não permitido` });
  }
}
