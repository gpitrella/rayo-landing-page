import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
// import { PiCornersOutLight } from "react-icons/pi";

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export async function POST(req, res) {

  try {
    const body = await req.json();
    const { email, subject, message } = body;

    const msg = {
      to: email,
      template_id:'d-552c8faabdc44c4e8a35e15621965592',
      from: process.env.NEXT_PUBLIC_SENDGRID_FROM_EMAIL,
      dynamic_template_data: {
        subject: subject, // Usa los datos dinámicos definidos en SendGrid
        message: message.text,
        email: email
      }, 
    };

    const msgRayo = {
      to: 'info@rayolavados.com',
      template_id:'d-82e058dbae084168b907e6bcc55f6351',
      from: process.env.NEXT_PUBLIC_SENDGRID_FROM_EMAIL,
      dynamic_template_data: {
        subject: subject, // Usa los datos dinámicos definidos en SendGrid
        message: message.text,
      }, 
    };
    
    await sendgrid.send([msg, msgRayo]); 
    return NextResponse.json({ success: true });    

  } catch (error) {

    console.error("Error enviando correo:", error.response?.body || error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}