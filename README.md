# Projeto Full Stack: Sistema de Gerenciamento de Clientes

## :memo: Descrição

Este repositório contém um projeto full stack desenvolvido como um case. O projeto consiste em um sistema de gerenciamento de clientes com funcionalidades de cadastro, edição, exclusão e visualização de clientes e suas tags. A aplicação é dividida em duas partes principais: front-end e back-end.

## :file_folder: Estrutura do Repositório

- [Front-end](./front/README.md)
- [Back-end](./back/README.md)

## :books: Funcionalidades

### Front-end

- **Página Inicial**: Informações sobre a plataforma.
- **Página Sobre**: Informações sobre a empresa.
- **Página de Clientes**: Integração com a API para operações de cadastro, edição, exclusão e visualização de clientes e suas tags. Inclui paginação, ordenação por nome e pesquisa. Site completamente responsivo.

### Back-end

- **Cadastro de Clientes**: Endpoint para inserir novos clientes no banco de dados, registrando nome e email.
- **Cadastro de Tags**: Método para adicionar tags que podem ser associadas aos clientes.
- **Edição de Clientes**: Permite atualizar as informações de um cliente existente.
- **Consulta de Clientes**: Retorna uma lista de todos os clientes cadastrados, incluindo suas informações e tags associadas.
- **Consulta de Clientes com Paginação e Ordenação por Nome**: Paginação de clientes retornando de 5 em 5 como default e ordenação por nome.
- **Pesquisa por Nome**: Pesquisa determinado usuário por caracteres.
- **Exclusão de Clientes**: Remove um cliente do banco de dados.
- **Testes Automatizados**: Implementação de testes abrangentes utilizando Jest.
- **Migrations**: Utilização de migrations para gerenciar a estrutura do banco de dados.

## :wrench: Tecnologias Utilizadas

### Front-end

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://pt-br.reactjs.org/)
- [Axios](https://axios-http.com/)
- [Tailwind](https://tailwindcss.com/)
- [React Router Dom](https://v5.reactrouter.com/web/guides/quick-start)
- [React Query](https://tanstack.com/query/latest)
- [React Select](https://react-select.com/home)
- [React Toastify](https://www.npmjs.com/package/react-toastify)
- [Lucide React](https://lucide.dev/)

### Back-end

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com)
- [Knex](https://knexjs.org/)
- [Jest](https://jestjs.io/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [MySQL](https://www.mysql.com/)

## :rocket: Rodando o Projeto

### Front-end

Para rodar o projeto front-end, siga os passos abaixo:

1. Clone o repositório e navegue até o diretório `front`.
2. Instale as dependências com `npm install`.
3. Inicie o projeto com `npm run dev`.

### Back-end

Para rodar o projeto back-end, siga os passos abaixo:

1. Clone o repositório e navegue até o diretório `back`.
2. Instale as dependências com `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Rode as migrations com `npm run migrations`.
5. Inicie o projeto com `npm run dev`.
6. Para rodar os testes, utilize o comando `npm run test`.

## :soon: Implementação Futura

### Front-end

- Criação de página de login e cadastro de usuário.
- Criar rotas autenticadas.
- Permissões.

### Back-end

- Criação de autenticação e autorização para usuários.
- Migrations para dados mockados.

## 💡 Sugestões

### Front-end

- **Testes Unitários e de Integração**: Desenvolver testes automatizados para garantir a estabilidade e o funcionamento correto das funcionalidades implementadas, utilizando ferramentas como Jest e React Testing Library.

### Back-end

- **Endpoint de Estatísticas**: Desenvolver um endpoint dedicado para fornecer estatísticas sobre os clientes e suas tags. 
- **Endpoint de Importação/Exportação**: Implementar endpoints para importar e exportar dados de clientes e tags.

## :handshake: Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="http://github.com/murilohim">
        <img src="https://avatars.githubusercontent.com/u/84817937?s=400&u=889026ba86ed2fc84b6a1719fa7fbed7b6289128&v=4" width="100px;" alt="Foto de Murilo Terenciani no GitHub"/><br>
        <sub>
          <b>Murilohim</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## :dart: Status do Projeto

🟢 Finalizado

### Vídeo

Link: [Demonstração do Projeto](https://www.loom.com/share/fb26724d7e9e434db7f4151428e0891d?sid=491879fc-83cb-4f7c-a905-8f066193a853)
