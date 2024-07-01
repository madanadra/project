'use client'

import { logout } from "@/fetch"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { PiSignOut } from "react-icons/pi"
import Load from "../load"
import { useNotif } from "@/zustand"

export default function Logout() {
    const [show, setShow] = useState(false)
    const {setText, setSuccess} = useNotif()
    const [state, formAction] = useFormState(logout, null)

    useEffect(() => {
        if (state?.success || state?.unauth) {
          window.location.href = '/login'
        } else if (state?.error) {
          setText(state.error)
          setSuccess(false)
        }
    }, [state])

    const Button = () => {
        const {pending} = useFormStatus()
    
        return (<>
            <button formAction={formAction} disabled={pending || state?.success || state?.unauth} 
            className="font-semibold text-sm text-red-700">Logout</button>
            <div className={`${pending || state?.success || state?.unauth ? 'grid' : 'hidden'} bg-slate-50 p-4 sm:px-8 fixed inset-0`}>
              <div className="grid gap-y-4 content-center justify-items-center mx-auto">
                <Load size="large" />
                <h1 className="font-medium text-lg text-center">Logout</h1>
              </div>
            </div>
        </>)
      }
    
    return (<>
        <PiSignOut onClick={() => setShow(true)} className="text-xl text-slate-600 hover:text-slate-950 cursor-pointer" />
        <div onClick={() => setShow(false)} className={`${show ? '' : 'hidden'} fixed inset-0 grid items-center bg-slate-950 bg-opacity-60 p-4 sm:px-8 z-50`}>
            <form onClick={(e) => e.stopPropagation()} className="grid gap-y-2 bg-slate-50 rounded-md border border-slate-300 p-4 w-full max-w-sm mx-auto anim-modal">
                <h1 className="text-lg font-semibold">Logout</h1>
                <h1>Are you sure you want to logout?</h1>
                <div className="flex items-center justify-end gap-x-6 mt-6">
                    <button type="button" onClick={() => setShow(false)} className="font-semibold text-sm text-slate-600">Cancel</button>
                    <Button />
                </div>
            </form>
        </div>
    </>)
}