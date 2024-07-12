import { Pencil, Trash2 } from 'lucide-react';
import { TableData, TableHeaders } from '../constants/tableMock';
import { useDeleteClient } from '../hooks/querys/useDeleteClient';

interface TableProps {
  headers: TableHeaders[];
  data: TableData[]
  openModal: boolean
  toggleOpenModal: (action: boolean, edit?: string) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  sortOrder: string
  setSortOrder: (order: string) => void
}

export const Table = (
  { headers, data, toggleOpenModal, currentPage, setCurrentPage, totalPages, setSortOrder, sortOrder }: TableProps
) => {

  const { mutate } = useDeleteClient()

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (): void => {
    const order = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleDelete = (id: string): void => {
    mutate(id)
  }

  return (
    <>
      <div className="overflow-x-auto w-full mt-10">
        <table className="min-w-full bg-gray-900 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-orange-500 to-red-800 text-white">
            <tr>
              {
                headers.map((header: TableHeaders) => (
                  <th
                    key={header.key}
                    className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                    onClick={handleSort}
                  >
                    {header.label} {header.key === 'name' ? (sortOrder === 'ASC' ? '▲' : '▼') : ''}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {
              data.length === 0 && (
                <tr>
                  <td colSpan={headers.length} className="px-6 py-4 whitespace-nowrap text-center bg-gray-800">
                    Nenhum cliente encontrado/cadastrado na base de dados.
                  </td>
                </tr>
              )
            }
            {
              data.map((client, index) => (
                <tr key={index} className="bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200">
                  {
                    headers.map((header, index) => {
                      if (header.key === 'actions') {
                        return (
                          <td key={index} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <button className="text-blue-400 hover:text-blue-500" onClick={() => toggleOpenModal(true, String(client.id))}>
                                <Pencil size={20} />
                              </button>
                              <button className="text-red-400 hover:text-red-500" onClick={() => handleDelete(String(client.id))}>
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </td>
                        );
                      }
                      if (header.key === 'tags') {
                        return (
                          <td key={index} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {
                                (client[header.key] as string[]).map((tag, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-600 text-white rounded-md text-xs">{tag}</span>
                                ))
                              }
                            </div>
                          </td>
                        )
                      }
                      return <td key={index} className="px-6 py-4 whitespace-nowrap">{client[header.key]}</td>;
                    })
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {/* Paginação */}
      <div className="flex justify-between items-center w-full mt-4 text-white">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-700 text-gray-300 rounded-md ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-600'}`}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-700 text-gray-300 rounded-md ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-600'}`}
        >
          Próxima
        </button>
      </div>
    </>
  )
}