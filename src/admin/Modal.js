import {Dialog, Transition} from '@headlessui/react'
import { Fragment, useState } from "react"
import {db} from "../firebase"
import { doc, deleteDoc } from "firebase/firestore"

function Modal({open, setOpen, id, document}) {
    const [loading, setLoading] = useState(false)
    const deleteDocument = async (e) => {
        e.preventDefault()
        if (loading) return;

        setLoading(true)

        await deleteDoc(doc(db, document, id))
                .then(() => console.log('doc deleted successfully'))
                .catch((err) => console.log(err))

        setOpen(false)
        setLoading(false)
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog 
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
                onClose={() => setOpen(false)}
            >
            <div className='flex items-end justify-center min-h-[800px] 
                sm:h-screen pt-4 px-4 pb-28 text-center sm:block sm:p-0' >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo='opacity-100'
                    leave="ease-in duration-200"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>
                <span 
                    className='hidden sm:inline-block sm:align-middle sm:h-screen' 
                    aria-hidden='true'
                >
                    &#8203;
                </span>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave="ease-in duration-200"
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left 
                    overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                    >
                        <div>
                            <div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-medium text-gray-900"
                                    >
                                        Are you sure you want to delete this document with id of {id} ?
                                    </Dialog.Title>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 flex space-x-2">
                                <button
                                    onClick={deleteDocument}
                                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 
                                    bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:right-2 ring-offset-2 ring-red-500
                                    disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300'
                                >
                                    {!loading ? 'Delete' : 'Deleting...'}
                                </button>
                                <button onClick={() => setOpen(false)} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 
                                    bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none " >Cancel</button>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal