"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Building2, Clock, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().email(),
  subject: z.string().min(2).max(255),
  message: z.string(),
});

export const ContactSection = () => {
  const [sent, setSent] = useState<any>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "Web Development",
      message: "",
    },
  });

  useEffect(() => {
    setSent(false)
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { firstName, lastName, email, subject, message } = values;

        const emailPayload = {
            email: email,
            subject: `Nueva consulta de ${firstName}, ${lastName}`,
            message: { text: `Email de la consulta ${email}, Consulta: ${subject}, Mensaje: ${message}` },            
        };
        
        try {
            const response = await fetch("/api/sendContact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailPayload),
        });
    
            const result = await response.json();
            console.log("Respuesta del servidor:", result);
            setSent(true)
        } catch (error) {
            console.error("Error enviando solicitud:", error);
        }  
  }

  return (
    <section id="contact" className="w-[100%] md:w-[100%] lg:w-[85%] lg:max-w-screen-xl m-auto py-24 px-5 sm:py-32">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <h2 className="text-lg text-primary mb-2 tracking-wider">
              Customer Services
            </h2>

          </div>
          <p className="mb-8 text-muted-foreground lg:w-5/6">
            Estamos aquí para ayudarte! Explora nuestras preguntas frecuentes 
            o contáctanos si tienes alguna duda o necesitas asistencia.
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 mb-1">
                <Building2 />
                <div className="font-bold">Encontranos</div>
              </div>

              <div>Vicente Lopez, Ciudad Autonoma de Buenos Aires</div>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Phone />
                <div className="font-bold">Número</div>
              </div>

              <div><a href="tel:5491124730269" target="_blank">+54 9 11 2473-0269</a></div>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Mail />
                <div className="font-bold">Mail</div>
              </div>

              <div><a href="mailto:info@rayolavados.com" target="_blank">info@rayolavados.com</a></div>
            </div>

            {/* <div>
              <div className="flex gap-2">
                <Clock />
                <div className="font-bold">Visit us</div>
              </div>

              <div>
                <div>Monday - Friday</div>
                <div>8AM - 4PM</div>
              </div>
            </div> */}
          </div>
        </div>

        <Card className="bg-muted/60 dark:bg-card">
          <CardHeader className="text-primary text-2xl"> </CardHeader>
           <CardContent>
            { sent ? 
              <p className="mb-8 text-muted-foreground lg:w-5/6">
                Tu consulta a sido enviada, en breve nuestro equipo se pondrá en 
                contacto para responder tu consulta. Gracias por su consulta.
              </p>
              :
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full gap-4"
              >
                <div className="flex flex-col md:!flex-row gap-8">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="dark:text-white">Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Leopoldo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="dark:text-white">Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Miranda" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="leomirandadev@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-white">Tema</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Asistencia al cliente">
                              Asistencia al cliente
                            </SelectItem>
                            <SelectItem value="Servicio Washer">
                              Servicio Washer 
                            </SelectItem>
                            <SelectItem value="Servicios Coorporativos">
                              Servicios Coorporativos
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-white">Mensaje</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Mensaje..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>

                <Button className="mt-4">Enviar Mensaje</Button>
              </form>
            </Form>}
          </CardContent> 

          <CardFooter></CardFooter>
        </Card>
      </section>
    </section>
  );
};
