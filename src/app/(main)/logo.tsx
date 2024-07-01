'use client'

import Image from "next/image"

export default function Logo() {
    return (
        <div onClick={() => window.location.href = '/'} className="flex items-center gap-x-3 cursor-pointer">
            <Image src='logo.svg' alt='Logo' width={28} height={28} priority />
            <h1 className="font-semibold text-xl">Test project</h1>
        </div>
    )
}