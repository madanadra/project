'use client'

import { delete_member } from "@/fetch"
import { GetMember } from "@/typing"
import { useEffect, useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { PiTrashSimple } from "react-icons/pi"
import Load from "../load"
import { useNotif } from "@/zustand"

export default function Delete({item, remove}: {item: GetMember['data'][0], remove: (value: string) => void}) {
    const [show, setShow] = useState(false)
    const {setText, setSuccess} = useNotif()
    const [state, formAction] = useFormState(delete_member, null)
    const form = useRef<HTMLFormElement>(null)

    useEffect(() => {
        !show && form.current && form.current.reset()
    }, [show])

    useEffect(() => {
        if (state?.unauth) {
            window.location.reload()
        } else if (state?.success) {
            setText('Successfully delete')
            setSuccess(true)
            remove(item.id)
        } else if (state?.error) {
            setText(state.error)
            setSuccess(false)
        }
    }, [state])

    const Button = () => {
        const {pending} = useFormStatus()

        return (
            <button type="button" onClick={() => setShow(true)} disabled={pending} 
            className="p-2.5 rounded-md bg-red-500 text-red-950 hover:bg-red-400 disabled:bg-red-400">
                {pending ? <Load size="small" /> : <PiTrashSimple />}
            </button>
        )
    }
    
    return (
        <form ref={form} action={formAction} onSubmit={() => setShow(false)}>
            <Button />
            <div onClick={() => setShow(false)} className={`${show ? '' : 'hidden'} fixed inset-0 grid items-center bg-slate-950 bg-opacity-60 p-4 sm:px-8 z-50`}>
                <div onClick={(e) => e.stopPropagation()} className="grid gap-y-2 bg-slate-50 rounded-md border border-slate-300 p-4 w-full max-w-sm mx-auto anim-modal">
                    <input type='text' name='id' value={item.id} className='hidden' />
                    <h1 className="text-lg font-semibold">Delete</h1>
                    <h1>Are you sure you want to delete "<span className="font-medium">{item.name}</span>"?</h1>
                    <div className="flex items-center justify-end gap-x-6 mt-6">
                        <button type="button" onClick={() => setShow(false)} className="font-semibold text-sm text-slate-600">Cancel</button>
                        <button type="submit" className="font-semibold text-sm text-red-700">Delete</button>
                    </div>
                </div>
            </div>
        </form>
    )
}