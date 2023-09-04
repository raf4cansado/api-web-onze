# api-web-onze

Requisitos Prévios:

Node.js instalado na sua máquina.
Instruções para Configurar o Projeto:

Baixe o arquivo do projeto.

Abra o Visual Studio Code (ou sua IDE de preferência).

Extraia o conteúdo do arquivo baixado e você encontrará duas pastas: "FRONT" e "BACK".

Abra o terminal no Visual Studio Code e siga as etapas abaixo para configurar cada parte do projeto separadamente:


==============================================================================

Configurando o Frontend:

No terminal, certifique-se de que o diretório atual esteja definido como a pasta "FRONT" do projeto. Caso contrário, navegue até a pasta digitando cd FRONT e pressione Enter.

Execute o seguinte comando para instalar as dependências do frontend:

npm install


Após instalação concluida execute o comando:  npm start

==============================================================================

Configurando o Backend:

Abra um novo terminal no Visual Studio Code.

Certifique-se de que o diretório atual esteja definido como a pasta "BACK" do projeto. Caso contrário, navegue até a pasta digitando cd BACK e pressione Enter.

Execute o seguinte comando para instalar as dependências do backend:

npm install

Após instalação concluida execute o comando:  npm run dev


==============================================================================================

# Documentação do Projeto com React.js, Material-UI (MUI) e JWT

## Introdução

Este documento descreve um projeto de aplicação web que utiliza as tecnologias React.js, Material-UI (MUI) e JSON Web Tokens (JWT) para criar operações CRUD (Create, Read, Update e Delete) em uma aplicação de gerenciamento de recursos. A aplicação permite aos usuários autenticados realizar operações básicas em recursos, usando tokens JWT para autenticação e autorização.

## Requisitos do Sistema

Antes de começar a desenvolver ou executar a aplicação, certifique-se de que o sistema atenda aos seguintes requisitos:

- Node.js instalado (versão recomendada: 14.x ou superior)
- npm (Node Package Manager) instalado (geralmente incluído com o Node.js)
- Conexão à internet para baixar dependências
- Editor de código (recomendado: Visual Studio Code)


## Funcionalidades

A aplicação inclui as seguintes funcionalidades de CRUD:

1. **Listagem de Recursos:** Os usuários podem visualizar uma lista de recursos existentes.

2. **Criação de Recursos:** Os usuários podem criar novos recursos com informações relevantes.

3. **Edição de Recursos:** Os usuários podem atualizar informações de recursos existentes.

4. **Exclusão de Recursos:** Os usuários podem excluir recursos existentes.

5. **Autenticação e Autorização:** O sistema utiliza tokens JWT para autenticação e autorização de usuários. Os usuários devem estar autenticados para acessar as funcionalidades de CRUD.

## Estrutura do Projeto

A estrutura do projeto segue as melhores práticas para projetos React.js com Material-UI:

- `src/`:
  - `components/`: Componentes reutilizáveis da aplicação.
  - `pages/`: Páginas da aplicação (por exemplo, página de listagem, página de edição).
  - `utils/`: Utilitários, funções auxiliares e Módulos para interagir com a API, incluindo a autenticação JWT.
  - `App.js`: Componente raiz da aplicação.
  - `index.js`: Arquivo de inicialização da aplicação.

## Implementação da Autenticação JWT

A autenticação JWT é implementada na camada de serviços (`services/authService.js`). Ela inclui as seguintes etapas:

1. **Registro de Usuário:** Os usuários podem se registrar na aplicação, fornecendo um nome de usuário e uma senha.

2. **Login de Usuário:** Os usuários podem fazer login na aplicação usando suas credenciais registradas. Um token JWT é gerado e armazenado no armazenamento local após o login bem-sucedido.

3. **Proteção de Rotas:** As rotas que requerem autenticação são protegidas. Isso significa que o usuário deve estar autenticado e possuir um token JWT válido para acessar essas rotas.

4. **Desconexão:** Os usuários podem se desconectar, o que invalida o token JWT armazenado.

## Exemplo de Uso da API

A aplicação é projetada para se comunicar com uma API externa. Você deve implementar a API de acordo com as necessidades da aplicação. A API deve seguir um contrato de endpoints para suportar as operações CRUD. A aplicação faz requisições HTTP para os seguintes endpoints:

- `GET /api/recursos`: Obter a lista de recursos.
- `POST /api/recursos`: Criar um novo recurso.
- `PUT /api/recursos/:id`: Atualizar um recurso existente.
- `DELETE /api/recursos/:id`: Excluir um recurso existente.


## Recursos Adicionais

- [Documentação do React.js](https://reactjs.org/docs/getting-started.html)
- [Documentação do Material-UI](https://mui.com/)
- [Documentação do JWT](https://jwt.io/introduction/)
- [GitHub - Exemplo de Implementação JWT em Node.js](https://github.com/auth0/node-jsonwebtoken)

Lembre-se de atualizar este documento conforme você desenvolve e melhora o projeto.




