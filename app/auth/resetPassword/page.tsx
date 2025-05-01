"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkUserLoggedIn } from "@/app/services/auth.service";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../styles/auth.css';
import Error from "@/components/error";
import { RootState, useAppDispatch } from "@/app/store/store";
import { login, resetPassword, reset } from "@/app/store/auth/authSlice";
import { useSelector } from "react-redux";
import BtnLoader from "@/components/btnLoader";
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";




const Page = () => {
    const { error, loading, status } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const dispatch = useAppDispatch();


    useEffect(()=>{
        const isAuthenticated = checkUserLoggedIn();
        if(isAuthenticated){
            router.push('/home')
        }
    },)

    useEffect(() => {
      if (status == true) {
        router.push("/home");
      }
    }, [router, dispatch, status]);

    if(status == true){
        router.push('/home')
    }

    if(error){
        toast.error(error, {id: error});
    }

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid Email'),
    });


    async function resetPasswordUser(email: string): Promise<void> {
      try {
        await dispatch(resetPassword(email)).unwrap();
        toast.success("Se ha enviado un correo de recuperación.");
      } catch (error) {
        toast.error(`Error: ${error}`);
      }
    }
   
    return (
      <div className="!flex h-auto w-[90%] md:w-[85%] lg:w-[85%] mt-6 lg:max-w-screen-xl mx-auto items-center justify-between">
        <Image
          width={1200}
          height={1200}
          src="/BG_Rayo.png"
          alt="bg-img"
          className="absolute inset-0 ml-auto w-[770px] h-[580px] rounded-bl-[100px] object-cover object-center"
        />
        <div className="container ml-0 px-0 max-w-[400px] mt-[20px]">
          <div className="grid grid-cols-12 text-left lg:text-left">
            <div className="col-span-full rounded-xl border border-white bg-white/90 dark:bg-card dark:border-zinc-800 py-8 px-6 md:p-10 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200">
  
              <div className="w-full mx-auto mb-5 text-left text-3xl md:text-4xl font-bold">
                <h1 className="leading-tight">
                  Restablecer Password 
                </h1>
              </div>
              <Formik
               initialValues={{ email: "" }}
               validationSchema={LoginSchema}
               onSubmit={(value) => {
                 console.log("value: ", value);
                 resetPasswordUser(value.email); // Llama a la función corregida
               }}
             >
                 {({ errors, touched, isSubmitting }) => (
                 <Form className="pb-4">
                     <div className="flex flex-col">
                         <label className="text-base font-medium mb-1 dark:text-white">Email</label>
                         <Field name="email" placeholder="Ingresar email" className="px-4 dark:text-black"/>
                         {errors.email && touched.email ? (<span className="text-[#ec4242] text-sm mt-1">{errors.email}</span>) : null}
                     </div>
                     <Button className={loading ? 'button-disabled w-full font-bold group/arrow mt-5' : 'button w-full font-bold group/arrow mt-5'}  disabled={loading}>
                       { loading ? <BtnLoader /> : 'Recuperar contraseña' }
                       { !loading ? <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" /> : null }
                     </Button> 
                     {/* Removi el type="submit" del BUTTON estaba generando problemas de estilos*/}
                 </Form>
                     )}
             </Formik>
             <div className="relative flex">
                 <span className="border-b-2 border-b-zinc-200 w-full block mb-[14px]"></span>
                   <p className="text-center text-dark mt-2 mb-2 px-3 leading-none">o</p>
                 <span className="border-b-2 border-b-zinc-200 w-full block mb-[14px]"></span>                        
             </div> 

             <div className="mt-3">
                 <p className="text-center text-dark mt-2 text-base ">Ya tenes una cuenta? <Link href={"/auth/login"} legacyBehavior><span className="font-semibold text-lightblue ">Login</span></Link></p>
             </div>     

            </div>       
            
          </div>
        </div>
      </div>
    );
}

 
export default Page;