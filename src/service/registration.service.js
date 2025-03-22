import { collection, addDoc, getDocs, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const registraion = async (values) => {
    try {
        const docRef = await addDoc(collection(db, "student"), values);
        return {
            message: "Saved Successfully",
            details: docRef.id
        }
    } catch (error) {
        return {
            message: "Error, Data not saved",
            details: error.message
        }
    }
}


export const fetchRegistration = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "student"));
        let result = []
        querySnapshot.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id })

        });
        return {
            message: "Data fetched",
            result: result
        }
    } catch (error) {
        return {
            message: "Error, Data not saved",
            details: error.message
        }
    }
}

export const deleteData = async (id) => {
    try {
        await deleteDoc(doc(db, "student", id));
        return {
            message: "Data Removed"
        }
    } catch (error) {
        return {
            message: "Error, Data not deleted",
            details: error.message
        }
    }
}


export const updateData = async (data) => {
    try {
        const docRef = doc(db, "student", data.id);
        await updateDoc(docRef, data);

        return {
            message: "Data Updated"
        }
    } catch (error) {
        return {
            message: "Error, Data not deleted",
            details: error.message
        }
    }
}


export const clearSession = () => {
    sessionStorage.removeItem("basicInfo")
    sessionStorage.removeItem("academicInfo")
    sessionStorage.removeItem("parentInfo")
    sessionStorage.removeItem("editPayload")
    sessionStorage.removeItem("isEdit")
}