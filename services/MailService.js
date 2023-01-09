import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure: false,
  auth: {
    user: 'oudea.nicolas@gmail.com',
    pass: 'xsmtpsib-ad345a952cd12a3d91abd364070b3fcc773ec858ac1eaed8d1037e9ed3490326-4BEvqAUz2ZG6V1dk'
  }
});

const sendInvitationEmail = (to, invitation,travel) => {
  const mailOptions = {
    from: 'goyave@example.com',
    to,
    subject: `Invitation to join ${travel.name}`,
    text: `You have been invited by ${travel.leader.email} to join ${travel.name}, ${travel.description}. Click the link below to accept or decline the invitation:
http://example.com/invitation/${invitation._id}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

export {sendInvitationEmail};