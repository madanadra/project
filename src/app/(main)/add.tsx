'use client'

import { create_member } from "@/fetch"
import { useEffect, useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import Load from "../load"
import { useNotif } from "@/zustand"

export default function Add() {
    const [show, setShow] = useState(false)
    const {setText, setSuccess} = useNotif()
    const [state, formAction] = useFormState(create_member, null)
    const form = useRef<HTMLFormElement>(null)

    useEffect(() => {
        !show && form.current && form.current.reset()
    }, [show])

    useEffect(() => {
        if (state?.unauth) {
            window.location.reload()
        } else if (state?.success) {
            setText('Successfully add')
            setSuccess(true)
        } else if (state?.error) {
            setText(state.error)
            setSuccess(false)
        }
    }, [state])

    const Button = () => {
        const {pending} = useFormStatus()

        return (
            <button type="button" onClick={() => setShow(true)} disabled={pending} 
                className='flex justify-center items-center gap-x-2.5 py-2 px-3 text-sm font-semibold rounded-md
                bg-slate-950 hover:bg-slate-800 disabled:bg-slate-800 text-slate-50'>
                    {pending && <Load size="small" />} Add
                </button>
        )
    }
    
    return (
        <form ref={form} action={formAction} onSubmit={() => setShow(false)}>
            <Button />
            <div onClick={() => setShow(false)} className={`${show ? '' : 'hidden'} fixed inset-0 grid items-center bg-slate-950 bg-opacity-60 p-4 sm:px-8 z-50`}>
                <div onClick={(e) => e.stopPropagation()} className="grid gap-y-2 bg-slate-50 rounded-md border border-slate-300 p-4 w-full max-w-sm mx-auto anim-modal">
                    <h1 className="text-lg font-semibold">Add</h1>
                    <div className="grid gap-y-4 text-sm my-2">
                        <div className='grid gap-y-2'>
                            <h1 className='font-medium'>Name</h1>
                            <input type='text' name='name'
                            className='bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                        </div>
                        <div className='grid gap-y-2'>
                            <h1 className='font-medium'>Tel</h1>
                            <input type='tel' name='tel'
                            className='bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 mt-6">
                        <button type="button" onClick={() => setShow(false)} className="font-semibold text-sm text-slate-600">Cancel</button>
                        <button type="submit" className="font-semibold text-sm">Add</button>
                    </div>
                </div>
            </div>
        </form>
    )
}