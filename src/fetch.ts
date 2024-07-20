'use server'

import { revalidateTag } from "next/cache"
import { cookies } from 'next/headers'
import axios, { AxiosError } from "axios"

export async function get_user() {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/get-user', {
            headers: {
                'Authorization': 'Bearer '+cookies().get('auth-id')?.value,
                'Accept': 'application/json'
            },
            cache: 'no-cache',
            next: {
                tags: ['get-user']
            }
        })

        if (!res.ok) throw new Error('get-user '+res.status)

        const data = await res.json()
        return {data: data.data}
    } catch(err) {
        if (err instanceof Error) return {error: err.message}
        
        return {error: 'Terjadi kesalahan'}
    }
}

export async function get_member({search, page}: {search: string, page: string}) {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/get-member/'+(search ? search : '')+'?page='+(page ? page : '1'), {
            headers: {
                'Authorization': 'Bearer '+cookies().get('auth-id')?.value,
                'Accept': 'application/json'
            },
            cache: 'no-cache',
            next: {
                tags: ['get-member']
            }
        })

        if (!res.ok) throw new Error('get-member '+res.status)

        const data = await res.json()
        return {data: data.data}
    } catch(err) {
        if (err instanceof Error) return {error: err.message}
        
        return {error: 'Terjadi kesalahan'}
    }
}

export async function login(_current: any, e: FormData) {
    const username = e.get('username')
    const password = e.get('password')

    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/login', 
        {username: username, password: password})

        if (data.error) return {error: data.error}

        const token: string = data.token
        cookies().set('auth-id', token, { 
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 3600*24*7
        })
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function logout(_current: any) {
    try {
        await axios.delete(process.env.NEXT_PUBLIC_BASE_API+'/logout', 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })
        
        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function create_member(_current: any, e: FormData) {
    const name = e.get('name')
    const tel = e.get('tel')
    const birth_date = e.get('birth-date')
    
    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_API+'/create-member', 
        {
            name: name,
            tel: tel,
            birth_date: birth_date
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('get-member')

        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function edit_member(_current: any, e: FormData) {
    const id = e.get('id')
    const name = e.get('name')
    const tel = e.get('tel')
    const birth_date = e.get('birth-date')
    
    try {
        const { data } = await axios.patch(process.env.NEXT_PUBLIC_BASE_API+'/edit-member/'+id, 
        {
            name: name,
            tel: tel,
            birth_date: birth_date
        }, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        revalidateTag('get-member')

        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}

export async function delete_member(_current: any, e: FormData) {
    const id = e.get('id')
    
    try {
        const { data } = await axios.delete(process.env.NEXT_PUBLIC_BASE_API+'/delete-member/'+id, 
        {
            headers: { Authorization: 'Bearer '+cookies().get('auth-id')?.value }
        })

        if (data.error) return {error: data.error}

        return {success: true}

    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) return {unauth: true}

        return {error: 'Kode kesalahan: '+error.response?.status}
    }
}