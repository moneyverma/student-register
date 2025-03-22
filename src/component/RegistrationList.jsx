import React, { useEffect, useState } from 'react'
import { clearSession, deleteData, fetchRegistration } from '../service/registration.service'

function RegistrationList({ setTab }) {

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)

    // fetch data
    const fetchData = () => {
        clearSession()
        setLoader(true)
        fetchRegistration().then(resp => {

            setData(resp.result)
            setLoader(false)
        }).catch(error => {
            setLoader(false)
            console.log(error)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])


    const deleteHanlder = async (id) => {
        await deleteData(id)
        fetchData()
    }

    const editHandler = (data) => {
        sessionStorage.setItem("editPayload", JSON.stringify(data))
        sessionStorage.setItem("isEdit", true)
        setTab(0)

    }


    return (
        <div className="relative overflow-x-auto p-6">

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Student name
                        </th>


                        <th scope="col" className="px-6 py-3">
                            Class
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Guardian Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Guardian Phone
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data?.map(item => (
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.student_name}
                            </th>

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.class}
                            </th>

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.guardian_name}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.guardian_phone}
                            </th>

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div>
                                    <button type="button" className="bg-amber-300 m-2 p-2" onClick={() => editHandler(item)}>Edit</button>
                                    <button type="button" className="bg-cyan-500 m-2 p-2" onClick={() => deleteHanlder(item.id)}>Delete</button>
                                </div>
                            </th>
                        </tr>
                    ))}
                    {data?.length === 0 && !loader && <tr colspan="9"> <p className="text-xl">No Data</p></tr>}
                    {loader && <tr colspan="9"> <p className="text-xl">Loading...</p></tr>}

                </tbody>
            </table>


        </div>

    )
}

export default RegistrationList