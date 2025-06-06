import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
// import { PiCornersOutLight } from "react-icons/pi";

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export async function POST(req) {

  try {
    const body = await req.json();
    const { subject, message, email } = body;
    console.log('process.env.NEXT_PUBLIC_TEMPLATE_EMAIL_CONTACT: ', process.env.NEXT_PUBLIC_TEMPLATE_EMAIL_CONTACT)

    const msgRayo = {
      to: 'info@rayolavados.com',
      template_id: 'd-104c6e7a817d4574be1b255237d1dcc4',
      from: process.env.NEXT_PUBLIC_SENDGRID_FROM_EMAIL,
      dynamic_template_data: {
        subject: subject, // Usa los datos dinámicos definidos en SendGrid
        message: message.text,
        email: email
      }, 
    };
    
    await sendgrid.send(msgRayo); 
    return NextResponse.json({ success: true });    

  } catch (error) {

    console.error("Error enviando correo:", error.response?.body || error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}