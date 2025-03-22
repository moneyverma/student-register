import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import { clearSession, registraion, updateData } from '../../service/registration.service';



function ParentInfo({ setNextStep, currentStep, setTab }) {

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const isEdit = JSON.parse(sessionStorage.getItem("isEdit"))
    const editPayload = JSON.parse(sessionStorage.getItem("editPayload"))
    const sessionVal = JSON.parse(sessionStorage.getItem("academicInfo"))



    const initialValue = {
        guardian_name: (isEdit ? editPayload["guardian_name"] : sessionVal?.guardian_name) || "",
        guardian_phone: (isEdit ? editPayload["guardian_phone"] : sessionVal?.guardian_phone) || "",
        relation: (isEdit ? editPayload["relation"] : sessionVal?.relation) || "",
    }


    const Validation = Yup.object().shape({
        guardian_name: Yup.string().required('Required'),
        guardian_phone: Yup.string().required('Required'),
        relation: Yup.string().required('Required'),
    });


    const submitFormDataHandler = async (values) => {
        sessionStorage.setItem("parentInfo", JSON.stringify(values))
        const basicInfo = JSON.parse(sessionStorage.getItem("basicInfo"))
        const academicInfo = JSON.parse(sessionStorage.getItem("academicInfo"))

        const formValues = {
            ...basicInfo,
            ...academicInfo,
            ...values
        }
        try {

            if (isEdit) {
                await updateData({ ...formValues, id: editPayload?.id })
            } else {
                await registraion(formValues)
            }

            setSuccess(true)
            setTimeout(() => {
                clearSession()
                setNextStep(0) // reset  
                setTab(1)
            }, 1500);

        } catch (error) {
            setError(false)

        }

    }


    const backHandler = () => {
        setNextStep(currentStep - 1)
    }

    const relationOption = [
        { key: "", value: "Select" },
        { key: "monther", value: "Monther" },
        { key: "father", value: "Father" },
    ]

    return (
        <div className="max-w-sm p-6 bg-white border border-white rounded-lg shadow-md ">

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {success === false ? <Formik
                    initialValues={initialValue}
                    validationSchema={Validation}
                    onSubmit={submitFormDataHandler}
                    enableReinitialize={true}
                >
                    {(formik) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="guardian_name" className="block text-sm/6 font-medium text-gray-900">
                                    Guardian Name
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="guardian_name"
                                        name="guardian_name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    <ErrorMessage name="guardian_name" className="text-red-500" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="guardian_phone" className="block text-sm/6 font-medium text-gray-900">
                                    Guardian Phone
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="guardian_phone"
                                        name="guardian_phone"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    <ErrorMessage name="guardian_phone" className="text-red-500" />
                                </div>
                            </div>


                            <div>

                                <label htmlFor="relation" className="block text-sm/6 font-medium text-gray-900">
                                    Relation
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="relation"
                                        as="select"
                                        name="relation"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        {relationOption.map(item => (
                                            <option key={item.value} value={item.key}>{item.value}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="relation" className="text-red-500" />
                                </div>
                            </div>



                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="m-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={backHandler}
                                >
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    className="m-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit
                                </button>
                            </div>



                        </Form>
                    )}
                </Formik> : <div className="bg-green-300 p-2 border-4 rounded ">
                    <h1>Form Submitted</h1>
                </div>}

            </div>
        </div>
    )
}

export default ParentInfo
