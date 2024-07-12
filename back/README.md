<h1 align="center"> Case Ignição Digital - back end</h1>

<p align="center">
  <img src="https://igd-wp-uploads-pluginaws.s3.amazonaws.com/wp-content/uploads/2016/06/16233501/cropped-logo_ignicao_digital2.png" width="200">
</p>

## :memo: Descrição

Projeto desenvolvido como parte do case da ignição digital. Este repositório contém o back end do sistema de gerenciamento de clientes, uma API que permite criar, editar, listar e excluir clientes, além de associar tags aos clientes registrados.

## :books: Funcionalidades

- **Cadastro de Clientes**: Endpoint para inserir novos clientes no banco de dados, registrando nome e email.
- **Cadastro de Tags**: Método para adicionar tags que podem ser associadas aos clientes.
- **Edição de Clientes**: Permite atualizar as informações de um cliente existente.
- **Consulta de Clientes**: Retorna uma lista de todos os clientes cadastrados, incluindo suas informações e tags associadas.
- **Consulta de Clientes com Paginação e ordenação por nome**: Paginação de clientes retornando de 5 em 5 como default e ordenação por nome.
- **Pesquisa por nome**: Pesquisa determinado usuário por caracteres.
- **Exclusão de Clientes**: Remove um cliente do banco de dados.
- **Testes Automatizados**: Implementação de testes abrangentes utilizando Jest.
- **Migrations**: Utilização de migrations para gerenciar a estrutura do banco de dados.

## 🔗 Link para acessar a documentação

- [Postman](https://documenter.getpostman.com/view/17589027/2sA3XWby7Q)

## :wrench: Tecnologias utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com)
- [Knex](https://knexjs.org/)
- [Jest](https://jestjs.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [MySQL](https://www.mysql.com/)

## :rocket: Rodando o projeto

Para rodar o projeto é necessário dar o seguinte comando para iniciar o projeto:

- Antes de começar, você irá precisar instalar o [Git](https://git-scm.com/), [NodeJS](https://nodejs.org/pt-br/download/) + [Visual Studio Code](https://code.visualstudio.com/).

```# Versões mínimas ou superiores.
$ node -v
v12.19.0

$ npm -v
6.14.5
```

- Para configurar, no GitBash digite os seguinte códigos:

```
#Entrar no diretório
$ cd ./case-ignicao-digital/back

#Abrir projeto no VsCode ou com seu prompt de comando de preferência
code .

#Com o terminal aberto rodar o comando
$ npm install (para instalar as dependências necessárias)

#Lembre-se de substituir as informações do banco de dados com as informações de seu banco e/ou criar um arquivo .env com essas variáveis sensíveis.
No arquivo **BaseDatabse.ts**, dentro da pasta data.
Crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias, com as configurações do banco de dados.
Necessário criar um banco local e um schema para rodar as migrations.

#ENVS necessárias
DB_HOST   // localhost
DB_USER   // usuário do banco ex. root
DB_PASSWORD  // password criado
DB_NAME   // schema
PORT  // normlamente 3306

#Rode o comando migration para a acriação da tabela em seu database
$ npm run migrations

#Agora só rodar o projeto com o comando
$ npm run dev ou npm run start

#Para rodar os testes é necessário rodar o comando
$ npm run test

```

## :soon: Implementação futura

- Criação de autenticação e autorização para usuários
- Migrations para dados mockados

## 💡Sugestões

**Endpoint de Estatísticas**: Desenvolver um endpoint dedicado para fornecer estatísticas sobre os clientes e suas tags. Isso pode incluir métricas como contagem total de clientes, tags mais populares, média de clientes por tag, entre outros. Essas estatísticas podem ser úteis para análises internas e tomada de decisões estratégicas.

**Endpoint de Importação/Exportação**: Implementar endpoints para importar dados de clientes e tags a partir de arquivos CSV, JSON ou outros formatos populares. Além disso, oferecer a funcionalidade de exportação de dados para permitir que os usuários extraiam facilmente informações para análise externa ou backup.

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

## :dart: Status do projeto

🟢 Finalizado
