"use client";
import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { app } from "../../../config/firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import routeGuardWasher from "@/app/guard/routeGuardWasher"
import * as Yup from "yup";

const db = getFirestore(app);
const storage = getStorage(app);

const validationSchema = Yup.object().shape({
  telefono: Yup.string()
    .required("El número de teléfono es obligatorio")
    .matches(/^\d{10}$/, "Debe ser un número válido de 10 dígitos"),
  documento: Yup.mixed().required("Debes cargar tu documento de identidad"),
  numberID: Yup.string()
    .matches(/^\d+$/, "Solo se permiten números")
    .required("El documento es obligatorio"),
  monotributo: Yup.mixed().required("Debes cargar el alta de monotributo"),
  mayorEdad: Yup.boolean().oneOf([true], "Debes ser mayor de edad"),
  terminos: Yup.boolean().oneOf([true], "Debes aceptar los términos y condiciones"),
});

const subirArchivo = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
};

const RegistroUsuario = () => {
  const router = useRouter();

  const guardarInfo = async (values: any) => {
    const { telefono, documento, monotributo } = values;
    console.log('values: ', values)


    // await subirArchivo(documento, `documentos/${documento.name}`);
    // await subirArchivo(monotributo, `monotributo/${monotributo.name}`);

    // await addDoc(collection(db, "usuarios"), {
    //   telefono,
    //   mayorEdad: true,
    //   terminosAceptados: true,
    //   documentoUrl: `documentos/${documento.name}`,
    //   monotributoUrl: `monotributo/${monotributo.name}`,
    // });

    // router.push("/capacitacion");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md mt-16 rounded-md">
      <h1 className="text-lg font-bold mb-4">Documentación necesario para ser Washer</h1>
      <Formik
        initialValues={{
          telefono: "",
          documento: null,
          numberID: '',
          monotributo: null,
          mayorEdad: false,
          terminos: false,
        }}
        validationSchema={validationSchema}
        onSubmit={guardarInfo}
      >
        {({ setFieldValue }) => (
          <Form className="pb-4 flex flex-col">
            <div className="flex flex-col mb-3">
              <label className="text-base font-medium mb-1">Número de Teléfono</label>
              <Field
                name="telefono"
                type="tel"
                placeholder="Ingresar número. Ej.: 54 9 11 6764 9876"
                className="px-4 border dark:text-black"
              />
              <ErrorMessage name="telefono" component="span" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-base font-medium mb-1">Número de DNI</label>
              <Field
                name="numberID"
                type="tel"
                placeholder="Ingresar DNI. Ej.: 27987652"
                className="px-4 border dark:text-black"
              />
              <ErrorMessage name="numberID" component="span" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-base font-medium mb-1">Documento de Identidad </label>
              <input
                type="file"
                onChange={(e) => setFieldValue("documento", e.target.files?.[0] || null)}
                className="px-4 border dark:text-black"
              />
              <ErrorMessage name="documento" component="span" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-base font-medium mb-1">Alta de Monotributo</label>
              <input
                type="file"
                onChange={(e) => setFieldValue("monotributo", e.target.files?.[0] || null)}
                className="px-4 border dark:text-black"
              />
              <ErrorMessage name="monotributo" component="span" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex flex-col mt-3">
              <label className="text-base font-medium mb-1">
                <Field type="checkbox" name="mayorEdad" className="mr-2" />
                Soy mayor de edad
              </label>
              <ErrorMessage name="mayorEdad" component="span" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex flex-col mt-3">
              <label className="text-base font-medium mb-1">
                <Field type="checkbox" name="terminos" className="mr-2" />
                Acepto los términos y condiciones
              </label>
              <ErrorMessage name="terminos" component="span" className="text-red-500 text-sm mt-1" />
            </div>

            <Button
              type="submit"
            >
              Guardar y continuar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default routeGuardWasher(RegistroUsuario);