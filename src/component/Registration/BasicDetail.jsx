import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';



function BasicDetail({ setNextStep, currentStep }) {

    const sessionVal = JSON.parse(sessionStorage.getItem("basicInfo"))
    const isEdit = JSON.parse(sessionStorage.getItem("isEdit"))
    const editPayload = JSON.parse(sessionStorage.getItem("editPayload"))


    const initialValue = {
        student_name: (isEdit ? editPayload["student_name"] : sessionVal?.student_name) || "",
        email: (isEdit ? editPayload["email"] : sessionVal?.email) || "",
        phone_number: (isEdit ? editPayload["phone_number"] : sessionVal?.phone_number) || "",
    }

    const Validation = Yup.object().shape({
        student_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phone_number: Yup.string().matches(`^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`, "Invalid Phone number").min(10).required("Required")
    });


    const submitFormDataHandler = (values) => {
        sessionStorage.setItem("basicInfo", JSON.stringify(values))
        setNextStep(currentStep + 1)
    }

    return (

        <div className="max-w-sm p-6 bg-white border border-white rounded-lg shadow-md ">

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                    initialValues={initialValue}
                    validationSchema={Validation}
                    onSubmit={submitFormDataHandler}
                    enableReinitialize={true}
                >
                    {(formik) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="student_name" className="block text-sm/6 font-medium text-gray-900">
                                    Student Name
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="student_name"
                                        name="student_name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    <p className="text-red-500">
                                        <ErrorMessage name="student_name" />
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email
                                </label>

                                <div className="mt-2">
                                    <Field name="email" id="email" type="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                    <p className="text-red-500">
                                        <ErrorMessage name="email" />
                                    </p>

                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone_number" className="block text-sm/6 font-medium text-gray-900">
                                    Phone Number
                                </label>
                                <div className="mt-2">
                                    <Field name="phone_number" id="phone_number" type="text" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />

                                    <p className="text-red-500">
                                        <ErrorMessage name="phone_number" />
                                    </p>

                                </div>
                            </div>

                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Next
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

        </div>


    )
}

export default BasicDetail