'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Login, checkUserLoggedIn } from "@/app/services/auth.service";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../styles/auth.css'
import Error from "@/components/error";
import { RootState, useAppDispatch } from "@/app/store/store";
import { login, reset } from "@/app/store/auth/authSlice";
import { useSelector } from "react-redux";
import BtnLoader from "@/components/btnLoader";
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import Image from "next/image";



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
           <div className="container mx-auto px-0 w-full mt-[20px]">
             <div className="grid grid-cols-12 text-left lg:text-left">
               <div className="col-span-full rounded-xl border border-white bg-white/90 dark:bg-card dark:border-zinc-800 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
     
                 <div className="max-w-screen-sm mx-auto mb-5 text-left text-3xl md:text-5xl font-bold">
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
                        <Form>
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
                        <Link href={"/forgot-password"}><p className="font-medium text-lightblue text-right mt-2">Forgot Password?</p></Link>
                        <Button className={loading ? 'button-disabled' : 'button'} type="submit" disabled={loading}>{ loading ? <BtnLoader /> : 'Login' }</Button>
                    </Form>
                        )}
                </Formik>
                <div className="mt-3">
                    <p className="text-center text-dark mt-2 text-base ">Do not have an account? <Link href={"/auth/signup"}><span className="font-semibold text-lightblue ">Sign up</span></Link></p>
                </div>     

               </div>       
               
             </div>
           </div>
         </div>
       );
}

 
export default Page;