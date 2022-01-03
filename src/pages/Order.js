import { useState } from "react"
import { useLocation } from "react-router-dom"
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import Form from "../components/Form"
import Header from "../components/Header"
import 'react-phone-number-input/style.css'

function Order() {
    const { search } = useLocation()
    const [success, setSuccess] = useState(null)
    const params = new URLSearchParams(search)
    const onSubmit = async (data) => {
        const { fullName, email, number } = data
        if(!fullName || !email || !number) return;

        const sendDataToDb = await addDoc(collection(db, `${params.get('ticketType')}`), {
            ...data
        }).then(() => {
            setSuccess('Thank you for Submitting, We call you')
        }).then(() => {
            setTimeout(() => {
                setSuccess(null)
            }, 3000)
        }).catch(error => console.log(error))
        
        return sendDataToDb
    }
    return (
        <div>
            <Header orderHeader />
            <div style={{
                background: 'rgb(2,0,36)',
                background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(116,9,121,1) 44%, rgba(89,56,152,1) 100%, rgba(0,212,255,1) 100%)',
            }} className="min-h-[92vh] py-28 flex justify-center items-center flex-col relative overflow-y-hidden px-6 ">
                <h3 className="absolute top-[105px] md:top-20 text-3xl text-white">red&black party</h3>
                <div className="max-w-xl w-full mt-14">
                    {params.get('ticketType') === 'One Person' && (
                        <Form 
                            title="Enter Your details"
                            ticketType={`Ticket for ${params.get('ticketType')}`}
                            formArr={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Emai', name: 'email', type: 'email',},
                                {label: 'Phone Number', name: 'phoneNumber', type: 'number',},
                            ]}
                            submitBtn='Submit'
                            onSubmit={(data) => onSubmit(data)}
                            successMsg={success}
                            redirect={null}
                        />
                    )}
                    {params.get('ticketType') === 'Couple' && (
                        <Form 
                            title="Enter Your details"
                            ticketType={`Ticket for ${params.get('ticketType')}`}
                            clientType='Men'
                            formArr={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Number', name: 'number', type: 'number',},
                            ]}
                            formArr2={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Number', name: 'number', type: 'number',},
                            ]}
                            submitBtn='Submit'
                            onSubmit={(data) => onSubmit(data)}
                            successMsg={success}
                            redirect={null}
                        />
                    )}
                    {params.get('ticketType') === ('4 Boys' || '4 Girls') && (
                        <Form 
                            title="Enter Your details"
                            ticketType={`Ticket for ${params.get('ticketType')}`}
                            formArr={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Number', name: 'number', type: 'number',},
                            ]}
                            formArr2={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Number', name: 'number', type: 'number',},
                            ]}
                            formArr3={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Number', name: 'number', type: 'number',},
                            ]}
                            formArr4={[
                                {label: 'Full name', name: 'fullName', type: 'text',},
                                {label: 'Email', name: 'email', type: 'email',},
                                {label: 'Number', name: 'number', type: 'number',},
                            ]}
                            submitBtn='Submit'
                            onSubmit={(data) => onSubmit(data)}
                            successMsg={success}
                            redirect={null}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Order