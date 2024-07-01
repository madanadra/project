'use client'

import { FormEvent, useEffect, useState } from "react"
import { PiMagnifyingGlass } from "react-icons/pi"

export default function Search({value}: {value: string}) {
    const [search, setSearch] = useState<string>('')

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (search) {
            window.location.href = '?s='+search
        }
    }

    useEffect(() => {
        setSearch(value ? value : '')
    }, [value])

    return (
        <form onSubmit={submit} className="w-full flex items-center isolate -space-x-px">
            <input type="text" placeholder="Search name" value={search} onChange={(e) => setSearch(e.target.value)}
            className="text-sm w-full bg-slate-50 rounded-l-md py-2 px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none" />
            <button type="submit" disabled={!search} 
            className="bg-slate-50 p-2.5 text-slate-600 rounded-r-md ring-1 ring-inset ring-slate-300 hover:bg-slate-200 disabled:bg-slate-300">
                <PiMagnifyingGlass />
            </button>
        </form>
    )
}