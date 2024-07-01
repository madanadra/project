import { Metadata } from "next";
import Image from "next/image";
import Form from "./form";

export const metadata: Metadata = {
  title: "Login - Test project",
};

export default function Page() {
    return (
        <div className='grid gap-y-10 max-w-sm mx-auto py-12 px-4'>
            <Image src='logo.svg' alt='Logo' width={96} height={96} priority className='mx-auto' />
            <h1 className='text-2xl text-center font-bold'>Test project</h1>
            <Form />
        </div>
    )
}