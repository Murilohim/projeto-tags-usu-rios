import { useMemo, useState } from "react"
import { Table } from "../components/Table"
import { useGetAllClients } from "../hooks/querys/useGetAllClients"
import { tableHeaders } from "../constants/tableMock"
import { ModalForm } from "../components/ModalForm";

interface DataQuery {
    client_id: string;
    client_name: string;
    client_email: string;
    tags: {
        name: string;
        id: string
    }[]
}

export const ClientsSection = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [editClient, setEditClient] = useState<string>('')

    const [currentPage, setCurrentPage] = useState<number>(1)
    const clientsPerPage = 5
    const [sortOrder, setSortOrder] = useState<string>('ASC')
    const [search, setSearch] = useState<string>('')

    const { data, isLoading, isError } = useGetAllClients(currentPage, clientsPerPage, sortOrder, search)

    const totalPages = data ? Math.ceil(data.clientsTags.total / clientsPerPage) : 1

    const toggleOpenModal = (action: boolean, edit?: string): void => {
        if (edit) {
            setEditClient(edit)
        }

        setOpenModal(action)
    }

    const tableData = useMemo(() => {
        return data?.clientsTags?.clients?.map((data: DataQuery) => {
            return {
                id: data.client_id,
                name: data.client_name,
                email: data.client_email,
                tags: data.tags ? data.tags.map((tag: {
                    name: string;
                    id: string
                }) => tag.name) : []
            }
        })

    }, [data])

    const renderTable: JSX.Element = useMemo(() => {
        if (isError) {
            return (
                <div className="flex items-center justify-center mt-20">
                    <div className="p-4 rounded-lg">
                        ⚠️ Ocorreu um erro ao carregar os dados, tente novamente mais tarde.
                    </div>
                </div>
            )
        }

        if (isLoading) {
            return (
                <div className="flex items-center justify-center mt-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500">
                    </div>
                </div>
            )
        }

        return (
            <Table
                headers={tableHeaders}
                data={tableData || []}
                openModal={openModal}
                toggleOpenModal={toggleOpenModal}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
        )
    }, [isError, isLoading, tableData, openModal, currentPage, totalPages, sortOrder])


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value)
        setCurrentPage(1)
    }

    return (
        <div className="flex flex-col items-center  lg:mt-4">
            <h1 className="text-4xl sm:text-6xl lg:text-6xl text-center tracking-wide">
                Tabela de
                <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">{" "}Clientes</span>
            </h1>
            <div
                className="flex flex-col lg:flex-row items-center justify-between w-full mt-4 lg:mt-8"
            >
                <div>
                    <input
                        type="text"
                        placeholder="Pesquisar por nome..."
                        className="w-full mt-4 p-2 rounded-lg shadow-md bg-gray-800 text-white"
                        value={search}
                        onChange={handleSearch}
                        name="search"
                    />
                </div>
                <div className="mt-4 lg:mt-0">
                    <button
                        onClick={() => toggleOpenModal(true)}
                        className="bg-gradient-to-r from-orange-500 to-red-800 text-white px-4 py-2 rounded-lg shadow-md hover:from-orange-400 hover:to-red-700 transition-colors duration-200">
                        Adicionar Cliente
                    </button>
                </div>
            </div>

            {renderTable}

            <ModalForm
                toggleOpenModal={toggleOpenModal}
                openModal={openModal}
                editClient={editClient}
                setEditClient={setEditClient}
            />
        </div>
    )
}