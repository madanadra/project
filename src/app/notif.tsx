'use client'

import { useNotif } from "@/zustand";
import { PiX } from "react-icons/pi";

export default function Notif() {
    const {text, success, setText} = useNotif()

    const Test = ({value}: {value: string}) => {
        return (value &&
            <div className='anim-notif max-w-sm mx-auto fixed top-0 right-0 p-4'>
                <div className={`${success ? ' bg-green-300 border border-green-500' : 'bg-red-300 border border-red-500'} 
                flex items-center gap-x-4 justify-between rounded-md text-sm p-4`}>
                    <h1 className="line-clamp-3">{value}</h1>
                    <div><PiX onClick={() => setText('')} className={`${success ? ' text-green-700' : ' text-red-700'} text-xl cursor-pointer`} /></div>
                </div>
            </div>
        )
    }
    
    return (
        <Test value={text} />
    )
}