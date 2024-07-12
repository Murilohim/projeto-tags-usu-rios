import { PlusIcon, XIcon } from 'lucide-react'
import { useGetAllTags } from '../hooks/querys/useGetAllTags'
import useForm from '../hooks/useForm'
import { useCreateClient } from '../hooks/querys/useCreateClient'
import { ClientWithTags } from '../services/endpoints/createClientsWithTags'
import Select from 'react-select'
import { customStyles } from '../constants/selectStyles'
import { ModalTag } from './ModalTag'
import { useEffect, useState } from 'react'
import { useGetClientById } from '../hooks/querys/useGetClientById'
import { useEditClient } from '../hooks/querys/useEditClient'

interface ModalProps {
    toggleOpenModal: (action: boolean) => void
    openModal: boolean
    editClient: string
    setEditClient: (edit: string) => void
}

export const ModalForm = (
    { toggleOpenModal, openModal, editClient, setEditClient }: ModalProps
) => {
    const [form, handleInputChange, setForm, clear] = useForm({
        name: '',
        email: '',
        tagIds: ''
    })

    const [openModalTag, setOpenModalTag] = useState<boolean>(false)

    const toggleOpenModalTag = (action: boolean): void => {
        setOpenModalTag(action)
    }


    const { data } = useGetAllTags()
    const { mutate } = useCreateClient(clear)
    const { data: dataClient } = useGetClientById(editClient)
    const { mutate: mutateEdit } = useEditClient(clear)

    useEffect(() => {
        if (dataClient) {
            setForm({
                name: dataClient.client_name,
                email: dataClient.client_email,
                tagIds: dataClient?.tags?.map((tag: { id: string }) => tag.id) || []
            })
        }
    }, [dataClient, setForm])

    const optionsTags = data?.tags?.map((tag: { id: string; name: string }) => ({
        value: tag.id,
        label: tag.name
    })) || []


    const handleTagChange = (selectedOptions:
        { value: string; label: string }[]
    ): void => {
        const tagIds: string[] = selectedOptions.map((option: { value: string }) => option.value);
        setForm(prevForm => ({ ...prevForm, tagIds }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        const body: ClientWithTags = {
            name: form.name,
            email: form.email,
            tagIds: form.tagIds
        }

        if (editClient) {
            mutateEdit({ id: editClient, body })
        } else {
            mutate(body)
        }
    }

    const onCloseModal = (): void => {
        toggleOpenModal(false)
        if (editClient) {
            setEditClient('')
            clear()
        }
    }

    return (
        <>
            {
                openModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-md"></div>
                        <div className="relative bg-gray-700 rounded-lg shadow-lg w-full max-w-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-white">Adicionar Cliente</h2>
                                <button
                                    onClick={onCloseModal}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    <XIcon size={24} className="text-white hover:text-gray-900" />
                                </button>
                            </div>
                            <div>
                                <form
                                    onSubmit={handleSubmit}
                                    className='grid grid-cols-1 gap-1 lg:mx-24 '
                                >
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium">Nome</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:border-orange-500 focus:ring-orange-500 focus:border-2 bg-[#1F2937] h-8 hover:outline-none hover:border-2 hover:border-orange-500 hover:ring-orange-500 px-3"
                                            name="name"
                                            value={form.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            className="mt-1 block w-full bg-[#1F2937] rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 h-8 focus:outline-none focus:border-2 hover:outline-none hover:border-2 hover:border-orange-500 hover:ring-orange-500 px-3"
                                            name="email"
                                            value={form.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="mb-1 block text-sm font-medium">Tags</label>
                                        <div className='flex items-center'>
                                            <div className='flex-1'>
                                                <Select
                                                    options={optionsTags}
                                                    isMulti
                                                    onChange={(selectedOptions) => handleTagChange(selectedOptions as { value: string; label: string }[])}
                                                    value={optionsTags.filter((option: { value: string; label: string }) => form.tagIds.includes(option.value)
                                                    )}
                                                    styles={customStyles}
                                                    placeholder='Selecione as tags'
                                                    noOptionsMessage={() => 'Nenhuma tag cadastrada'}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="ml-2 p-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-400 transition-colors duration-200"
                                                onClick={() => toggleOpenModalTag(true)}
                                            >
                                                <PlusIcon />
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        className="w-full flex justify-end items-center space-x-4"
                                    >
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-orange-500 to-red-800 px-6 py-3 rounded-lg shadow-md hover:from-orange-400 hover:to-red-700 transition-colors duration-200 item"
                                        >
                                            {editClient ? 'Editar' : 'Salvar'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
            <ModalTag
                toggleOpenModalTag={toggleOpenModalTag}
                openModalTag={openModalTag}
            />
        </>
    )
}