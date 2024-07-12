export interface TableHeaders {
    key: string;
    label: string;
}

export interface TableData {
    [key: string]: string | string[];
}

export const tableHeaders: TableHeaders[] = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'tags', label: 'Tags' },
    { key: 'actions', label: 'Ações' },
];

export const tableData = [
    { name: 'John Doe', email: 'john.doe@example.com', tags: ['VIP', ' Ativo'] },
    { name: 'Jane Smith', email: 'jane.smith@example.com', tags: ['Novo', 'Inativo'] },
    { name: 'Jane Smith', email: 'jane.smith@example.com', tags: ['Novo', 'Inativo'] },
    { name: 'Jane Smith', email: 'jane.smith@example.com', tags: ['Novo', 'Inativo'] },
    { name: 'Jane Smith', email: 'jane.smith@example.com', tags: ['Novo', 'Inativo'] },
    { name: 'Jane Smith', email: 'jane.smith@example.com', tags: ['Novo', 'Inativo'] },
    { name: 'Jane Smith', email: 'jane.smith@example.com', tags: ['Novo', 'Inativo'] },
];
