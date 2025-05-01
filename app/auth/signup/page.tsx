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
import { ArrowRight } from "lucide-react";
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
        dispatch(register({email, password, firstName, lastName}));
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
            <div className="container mx-auto ml-0 px-0 max-w-[400px] mt-[20px]">
                <div className="grid grid-cols-12 text-left lg:text-left">
                <div className="col-span-full rounded-xl border border-white bg-white/90 dark:bg-card dark:border-zinc-800 py-8 px-6 md:p-10 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200">
        
                    <div className="max-w-screen-sm mx-auto mb-5 text-left text-3xl md:text-4xl font-bold">
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
                                    <Field name="firstName" type="text" placeholder="Nombre" className="px-4 dark:text-black"/>
                                    {errors.firstName && touched.firstName ? (<span className="text-[#ec4242] text-sm mt-1">{errors.firstName}</span>) : null}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-base font-medium mb-1 dark:text-white">Apellido</label>
                                    <Field name="lastName" type="text" placeholder="Apellido" className="px-4  dark:text-black"/>
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
                            <Button className={loading ? 'button-disabled w-full font-bold group/arrow mt-5' : 'button w-full font-bold group/arrow mt-5'} disabled={loading} >
                                { loading ? <BtnLoader /> : 'Registrarse' }
                                { !loading ? <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" /> : null}                        </Button>
                            {/* Removi el type="submit" del BUTTON estaba generando problemas de estilos*/}

                        </Form>
                            )}
                        </Formik>
                        <div className="mt-3">
                            <p className="text-center text-dark mt-2 text-base ">Ya tienes una cuenta? <Link href={"/auth/login"} ><span className="font-semibold text-lightblue ">Login</span></Link></p>
                        </div>  

                    </div>    
                 </div>
            </div>
        </div>
    );    
}

 
export default Page;