import { useState } from "react"

export type InitialState = {
    [key: string]: string | string[]
}

const useForm = (initialState: InitialState) => {
    const [form, setForm] = useState(initialState)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setForm({ ...form, [name]: value })
    }

    const clear = (): void => {
        setForm(initialState)
    }

    return [form, handleInputChange, setForm, clear] as const
}

export default useForm