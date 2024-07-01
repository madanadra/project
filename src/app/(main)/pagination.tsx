'use client'

import { useSearchParams } from "next/navigation"
import { PiCaretLeft, PiCaretRight } from "react-icons/pi"

export default function Pagination({current_page, last_page}: {current_page: number, last_page: number}) {
    const params = useSearchParams().get('s') || ''

    const move = (page: string) => {
        const s = params ? 's='+params : ''
        const p = page === '1' ? '' : 'page='+page
        const qm = s || p ? '?' : ''
        const and = s && p ? '&' : ''
        const to = '/'+qm+s+and+p

        window.location.href = to
    }

    return (
        <div className="flex items-center isolate -space-x-px">
            <button type="button" disabled={current_page <= 1} onClick={() => move((current_page-1).toString())}
            className="p-2.5 rounded-l-md bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-300 hover:bg-slate-200 disabled:bg-slate-300">
                <PiCaretLeft />  
            </button>
            <select value={current_page} onChange={(e) => move(e.target.value)} className="text-sm bg-slate-50 py-[8.5px] px-3 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-950 outline-none">
                {Array.from({ length: last_page }, (_, index) => index+1).map(item =>
                    <option key={item} value={item}>{item}</option>
                )}
            </select>
            <h1 className="text-sm text-slate-600 py-2 px-3 bg-slate-50 ring-1 ring-inset ring-slate-300">of {last_page}</h1>
            <button type="button" disabled={current_page >= last_page} onClick={() => move((current_page+1).toString())}
            className="p-2.5 rounded-r-md bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-300 hover:bg-slate-200 disabled:bg-slate-300">
                <PiCaretRight />
            </button>
        </div>
    )
}