"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkUserLoggedIn } from "@/app/services/auth.service";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../styles/auth.css';
import LoginWithGoogle from './googleLogin';
import Error from "@/components/error";
import { RootState, useAppDispatch } from "@/app/store/store";
import { login, loginGoogle, reset } from "@/app/store/auth/authSlice";
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
        password: Yup.string().required('Password is required').min(8, 'Minimum of 8 characters')
    });

    async function loginUser(email: string, password: string){
        dispatch(login({email, password}))
    }
   
    return (
         <div className="!flex h-auto w-[85%] md:w-[85%] lg:w-[85%] mt-6 lg:max-w-screen-xl mx-auto items-center justify-between">
           <Image
             width={1200}
             height={1200}
             src="/BG_Rayo.png"
             alt="bg-img"
             className="absolute inset-0 ml-auto w-[770px] h-[580px] rounded-bl-[100px] object-cover object-center"
           />
           <div className="container ml-0 px-0 max-w-[400px] mt-[20px]">
             <div className="grid grid-cols-12 text-left lg:text-left">
               <div className="col-span-full rounded-xl border border-white bg-white/90 dark:bg-card dark:border-zinc-800 p-10 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200">
     
                 <div className="w-full mx-auto mb-5 text-left text-3xl md:text-5xl font-bold">
                   <h1 className="leading-tight">
                     Login 
                   </h1>
                 </div>
     
                 <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={value=>{
                        loginUser(value.email, value.password)
                    }}
                    >
                        {({ errors, touched, isSubmitting }) => (
                    <Form className="pb-4">
                        <div className="flex flex-col">
                            <label className="text-base font-medium mb-1 dark:text-white">Email</label>
                            <Field name="email" placeholder="Enter your email" className="px-4"/>
                            {errors.email && touched.email ? (<span className="text-[#ec4242] text-sm mt-1">{errors.email}</span>) : null}
                        </div>
                        <div className="flex flex-col mt-3">
                        <label className="text-base font-medium mb-1 dark:text-white">Password</label>
                            <Field type='password' name="password" placeholder="Enter your password" className="px-4"/>
                            {errors.password && touched.password ? (<span className="text-[#ec4242] text-sm mt-1">{errors.password}</span>) : null}
                        </div>
                        <Link href={"/forgot-password"}><p className="font-medium text-lightblue text-right mt-2">Olvidaste el password?</p></Link>
                        <Button className={loading ? 'button-disabled' : 'button w-full font-bold group/arrow mt-5'}  disabled={loading}>
                          { loading ? <BtnLoader /> : 'Iniciar Sesión' }
                          <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
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
                <LoginWithGoogle/>
                
                <div className="mt-3">
                    <p className="text-center text-dark mt-2 text-base ">No tienes una cuenta? <Link href={"/auth/signup"}><span className="font-semibold text-lightblue ">Registrarse</span></Link></p>
                </div>     

               </div>       
               
             </div>
           </div>
         </div>
       );
}

 
export default Page;