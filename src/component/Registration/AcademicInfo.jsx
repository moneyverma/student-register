import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';


function AcademicInfo({ setNextStep, currentStep }) {


    const isEdit = JSON.parse(sessionStorage.getItem("isEdit"))
    const editPayload = JSON.parse(sessionStorage.getItem("editPayload"))
    const sessionVal = JSON.parse(sessionStorage.getItem("academicInfo"))


    const initialValue = {
        class: (isEdit ? editPayload["class"] : sessionVal?.class) || "",
        subjects: (isEdit ? editPayload["subjects"]?.length > 0 && editPayload["subjects"]?.split(",") : sessionVal?.subjects?.length > 0 && sessionVal?.subjects?.split(",")) || "",
        marks: (isEdit ? editPayload["marks"] : sessionVal?.marks) || "",
    }




    const Validation = Yup.object().shape({
        class: Yup.string().required('Required'),
        subjects: Yup.mixed().required('Required'),
        marks: Yup.number()
    });


    const submitFormDataHandler = (values) => {

        if (values.subjects.length === 0) {
            alert("Please select the subject")
            return false
        }

        sessionStorage.setItem("academicInfo", JSON.stringify({ ...values, subjects: values.subjects.join(",") }))
        setNextStep(currentStep + 1)
    }

    const backHandler = () => {
        setNextStep(currentStep - 1)
    }


    const classOption = [
        { key: "", value: "Select Class" },
        { key: "1", value: "1st" },
        { key: "2", value: "2st" },
        { key: "3", value: "3st" },
        { key: "4", value: "4st" },
    ]

    return (
        <div className="w-[500px] p-6 bg-white border border-white rounded-lg shadow-md ">

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                    initialValues={initialValue}
                    validationSchema={Validation}
                    onSubmit={(value) => submitFormDataHandler(value)}
                    enableReinitialize={true}
                >
                    {(formik) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="class" className="block text-sm/6 font-medium text-gray-900">
                                    Class
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="class"
                                        as="select"
                                        name="class"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        {classOption.map(item => (
                                            <option key={item.value} value={item.key}>{item.value}</option>
                                        ))}
                                    </Field>
                                    <p className="text-red-500">
                                        <ErrorMessage name="class" />
                                    </p>

                                </div>
                            </div>

                            <div>
                                <label htmlFor="subjects" className="block text-sm/6 font-medium text-gray-900">
                                    Subject
                                </label>

                                <div className="mt-2 flex">
                                    <div className="m-3">
                                        <Field name="subjects" id="subjects" type="checkbox" value="Math" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Math</label>
                                    </div>

                                    <div className="m-3">
                                        <Field name="subjects" id="subjects" type="checkbox" value="English" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">English</label>
                                    </div>

                                    <div className="m-3">
                                        <Field name="subjects" id="subjects" type="checkbox" value="science" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Science</label>
                                    </div>

                                    <div className="m-3">
                                        <Field name="subjects" id="subjects" type="checkbox" value="CS" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">CS</label>
                                    </div>
                                </div>
                                <p className="text-red-500">
                                    <ErrorMessage name="subjects" />
                                </p>

                            </div>


                            <div>
                                <label htmlFor="class" className="block text-sm/6 font-medium text-gray-900">
                                    Marks
                                </label>
                                <div className="mt-2">
                                    <Field name="marks" id="marks" type="text" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                    <p className="text-red-500">
                                        <ErrorMessage name="marks" />
                                    </p>

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
                                    Next
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AcademicInfo