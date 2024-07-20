export type GetUser = {
    id: number
    username: string
    created_at: string | null
}

export type GetMember = {
    current_page: number
    data: {
        id: string
        name: string
        tel: string
        birth_date: string
        created_at: string | null
    }[]
    from: number
    last_page: number
    to: number
    total: number
}

export type State = {
    text: string,
    success: boolean
}
  
export type Action = {
    setText: (value: string) => void,
    setSuccess: (value: boolean) => void
}
