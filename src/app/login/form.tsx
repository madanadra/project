'use client'

import { login } from "@/fetch"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { useFormState } from "react-dom"
import Load from "../load"
import { useNotif } from "@/zustand"

export default function Form() {
  const [password, setPassword] = useState<string>('')
  const {setText, setSuccess} = useNotif()
  const [state, formAction] = useFormState(login, null)

  useEffect(() => {
    if (state?.success) {
      window.location.reload()
    } else if (state?.error) {
      setPassword('')
      setText(state.error)
      setSuccess(false)
    }
  }, [state])

  const Button = () => {
    const {pending} = useFormStatus()

    return (
      <button type="submit" disabled={pending || state?.success}
      className='flex justify-center items-center gap-x-2.5 py-2 px-3 font-semibold rounded-md bg-slate-950 text-slate-50 hover:bg-slate-800 disabled:bg-slate-800 mt-2'>
          {(pending || state?.success) && <Load size="small" />} Login
      </button>
    )
  }


  return (
    <form action={formAction} className='w-full grid gap-y-4 text-sm rounded-md bg-slate-50 p-4 border border-slate-300'>
      <div className='grid gap-y-2'>
        <h1 className='font-medium'>Username</h1>
        <input type='text' name='username' 
        className='bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
      </div>
      <div className='grid gap-y-2'>
        <h1 className='font-medium'>Password</h1>
        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}
        className='bg-slate-50 rounded-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none' />
      </div>
      <Button />
    </form>
  )
}