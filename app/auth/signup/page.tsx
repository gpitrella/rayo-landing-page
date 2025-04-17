'use client';

import { useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../styles/auth.css'
import { register } from "@/app/store/auth/authSlice";
import { useRouter } from "next/navigation";
import BtnLoader from "@/components/btnLoader";
// import { Button } from "../../../components/ui/button";
import Error from "@/components/error";
import { RootState, useAppDispatch } from "@/app/store/store";
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface SignupProp {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}


const Page = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { error, loading, status } = useSelector((state: RootState) => state.auth);


    useEffect(() => {
    if (status == true) {
      router.push("/auth/login");
    }
    }, [router, dispatch, status]);

    let SignupSchema = Yup.object().shape({
        firstName: Yup.string().required('Required!'),
        lastName: Yup.string().required('Required!'),
        email: Yup.string().required('Required!').email('Invalid Email'),
        password: Yup.string().required().min(8, 'Minimum of 8 characters')
    });

    if(error){
        toast.error(error, {id: error})
    }



    const handleSubmit = async(value: SignupProp) =>{
        const {email, password, firstName, lastName} = value;
        console.log('value:', value)
        dispatch(register({email, password, firstName, lastName}));
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
        <div className="container mx-auto ml-0 px-0 w-[85%] mt-[20px]">
            <div className="grid grid-cols-12 text-left lg:text-left">
            <div className="col-span-full rounded-xl border border-white bg-white/90 dark:bg-card dark:border-zinc-800 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
    
                <div className="max-w-screen-sm mx-auto mb-5 text-left text-3xl md:text-5xl font-bold">
                    <h1 className="leading-tight">
                        Registrarse 
                    </h1>
                </div>
    
                <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={value=>{
                            handleSubmit(value)
                        }}
                    >
                        {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="flex w-full gap-3">
                            <div className="flex flex-col w-full">
                                <label className="text-base font-medium mb-1 dark:text-white">Nombre</label>
                                <Field name="firstName" type="text" placeholder="Firstname" className="px-4"/>
                                {errors.firstName && touched.firstName ? (<span className="text-[#ec4242] text-sm mt-1">{errors.firstName}</span>) : null}
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-base font-medium mb-1 dark:text-white">Apellido</label>
                                <Field name="lastName" type="text" placeholder="Lastname" className="px-4"/>
                                {errors.lastName && touched.lastName ? (<span className="text-[#ec4242] text-sm mt-1">{errors.lastName}</span>) : null}
                            </div>
                        </div>
                        <div className="flex flex-col mt-3">
                            <label className="text-base font-medium mb-1 dark:text-white">Email</label>
                            <Field name="email" type="text" placeholder="Email" className="px-4"/>
                            {errors.email && touched.email ? (<span className="text-[#ec4242] text-sm mt-1">{errors.email}</span>) : null}
                        </div>
                        <div className="flex flex-col mt-3">
                            <label className="text-base font-medium mb-1 dark:text-white">Password</label>
                            <Field name="password" type="password" placeholder="Password" className="px-4"/>
                            {errors.password && touched.password ? (<span className="text-[#ec4242] text-sm mt-1">{errors.password}</span>) : null}
                        </div>
                        <Button className={loading ? 'button-disabled mt-5' : 'button mt-5'} disabled={loading} >{ loading ? <BtnLoader /> : 'Registrarse' }</Button>
                        {/* Removi el type="submit" del BUTTON estaba generando problemas de estilos*/}

                    </Form>
                        )}
                    </Formik>
                    <div className="mt-3">
                        <p className="text-center text-dark mt-2 text-base ">Ya tienes una cuenta? <Link href={"/auth/login"}><span className="font-semibold text-lightblue ">Login</span></Link></p>
                    </div>  

                </div>    
             </div>
        </div>
      </div>
    );    
}

 
export default Page;