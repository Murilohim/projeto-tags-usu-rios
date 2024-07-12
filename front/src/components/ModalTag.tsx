import { XIcon } from 'lucide-react'
import { useCreateTag } from '../hooks/querys/useCreateTag'
import { useState } from 'react'


interface ModalTagProps {
    toggleOpenModalTag: (action: boolean) => void
    openModalTag: boolean
}

export const ModalTag = (
    { toggleOpenModalTag, openModalTag }: ModalTagProps
) => {
    const [nameTag, setNameTag] = useState<string>('')

    const { mutate } = useCreateTag(setNameTag)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        const body = {
            name: nameTag
        }
        mutate(body)
    }

    return (
        <>
            {
                openModalTag && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-md"></div>
                        <div className="relative bg-gray-700 rounded-lg shadow-lg w-full max-w-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-white">Adicionar Tag</h2>
                                <button
                                    onClick={() => toggleOpenModalTag(false)}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    <XIcon size={24} className="text-white hover:text-gray-900" />
                                </button>
                            </div>
                            <div>
                                <form
                                    onSubmit={handleSubmit}
                                    className='grid grid-cols-1 gap-1'
                                >
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium">Nome da Tag</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:border-orange-500 focus:ring-orange-500 focus:border-2 bg-[#1F2937] h-8 hover:outline-none hover:border-2 hover:border-orange-500 hover:ring-orange-500 px-3"
                                            name="name"
                                            value={nameTag}
                                            onChange={(e) => setNameTag(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div
                                        className="w-full flex justify-end items-center space-x-4"
                                    >
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-orange-500 to-red-800 px-6 py-3 rounded-lg shadow-md hover:from-orange-400 hover:to-red-700 transition-colors duration-200 item"
                                        >
                                            Salvar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                )
            }
        </>
    )
}