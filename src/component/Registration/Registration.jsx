import { useEffect, useState } from "react"

import AcademicInfo from "./AcademicInfo"
import BasicDetail from "./BasicDetail"
import ParentInfo from "./ParentInfo"

const currentSavedStep = sessionStorage.getItem("currStep")
const Registration = ({ setTab }) => {
    const [currentStep, setCurrentStep] = useState(parseInt(currentSavedStep) || 0)


    useEffect(() => {
        setCurrentStep(0)
    }, [])


    const stepHanlder = (newStepVal) => {
        setCurrentStep(newStepVal)
        sessionStorage.setItem("currStep", newStepVal)
    }


    const stepName = {
        0: "Basic Detail",
        1: "Academic Info",
        2: "Parent Info"
    }


    return (
        <div className="bg-blue-100 w-full justify-around flex m-5 rounded-3xl p-5">
            <div className="w-full p-28">
                <p className="text-[50px] text-center">{stepName[currentStep]}</p>
            </div>
            <div className="w-full">
                {currentStep === 0 && <BasicDetail setNextStep={stepHanlder} currentStep={currentStep} />}
                {currentStep === 1 && <AcademicInfo setNextStep={stepHanlder} currentStep={currentStep} />}
                {currentStep === 2 && <ParentInfo setNextStep={stepHanlder} currentStep={currentStep} setTab={setTab} />}
            </div>

        </div>
    )
}


export default Registration