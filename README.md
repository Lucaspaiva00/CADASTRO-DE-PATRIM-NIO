# 📦 Sistema Web – Cadastro de Patrimônio

Projeto desenvolvido para **Avaliação Prática – Aula Teste (SENAI)**  
Cargo: **Instrutor de Formação Profissional III – Tecnologia da Informação**

---

## 🎯 Objetivo do Projeto

Este projeto tem como objetivo demonstrar, de forma prática e didática, o desenvolvimento de um **Sistema Web de Cadastro de Patrimônio**, permitindo:

- Cadastro, edição, visualização e exclusão de **Setores**
- Cadastro, edição, visualização e exclusão de **Patrimônios**
- Relacionamento entre **Patrimônio x Setor**
- Exportação de dados para **Excel**
- Separação clara entre **Back-end e Front-end**
- Uso do padrão **API REST**

O sistema simula um cenário real de empresas e instituições que precisam controlar seus bens patrimoniais de forma organizada e eficiente.

---

## 🧠 Conceito Central: Arquitetura API REST

O projeto foi desenvolvido utilizando **API REST**, que é um dos padrões mais utilizados atualmente no mercado.

### O que isso significa?

- O **Back-end** é responsável por:
  - Regras de negócio
  - Acesso ao banco de dados
  - Disponibilização de dados via HTTP (JSON)

- O **Front-end** é responsável por:
  - Interface com o usuário
  - Consumo da API via requisições HTTP
  - Experiência e usabilidade

➡️ Não há renderização de telas no servidor.

---

## 🌐 Métodos HTTP Utilizados

| Método | Finalidade |
|------|-----------|
| GET | Listar e consultar dados |
| POST | Criar novos registros |
| PUT | Atualizar registros existentes |
| DELETE | Remover registros |

---

## 🛠️ Tecnologias Utilizadas

### Back-end
- **Node.js** – ambiente de execução JavaScript
- **Express.js** – criação da API REST
- **Prisma ORM** – acesso e manipulação do banco de dados
- **MySQL** – banco de dados relacional
- **ExcelJS** – geração de arquivos Excel

### Front-end
- **HTML5** – estrutura das páginas
- **CSS3** – estilização (padrão visual SENAI: vermelho e branco)
- **Bootstrap 5** – responsividade e componentes visuais
- **JavaScript (ES Modules)** – consumo da API

---

## 🗂️ Estrutura de Pastas – Back-end

```bash
api/
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ src/
│  ├─ controllers/
│  │  ├─ setor.controller.js
│  │  └─ patrimonio.controller.js
│  ├─ routes/
│  │  ├─ setor.routes.js
│  │  └─ patrimonio.routes.js
│  ├─ app.js
│  └─ server.js
``` 
## Responsabilidade das Camadas

routes/ → definição das rotas e métodos HTTP

controllers/ → regras de negócio

prisma/ → modelagem e persistência dos dados

server.js → inicialização da API

## 🗄️ Banco de Dados

O banco de dados utilizado é MySQL, de modelo relacional, acessado por meio do Prisma ORM.

Entidades do Sistema
Setor

id

nome

createdAt

Patrimônio

id

nome

NI (único)

status (ENUM)

setorId (chave estrangeira)

createdAt

Enum de Status do Patrimônio

ATIVO

MANUTENCAO

BAIXADO

O uso de ENUM garante padronização, controle e integridade dos dados.

## ▶️ Como Executar o Projeto (Passo a Passo)

Esta seção descreve como configurar e executar o projeto localmente, conforme solicitado pela banca avaliadora.

## 🔧 Pré-requisitos

Antes de iniciar, é necessário ter instalado:

Node.js (versão LTS recomendada)

MySQL

Git

Visual Studio Code (opcional)

Extensão Live Server (para executar o front-end)

## 1️⃣ Clonar o Repositório
git clone https://github.com/Lucaspaiva00/CADASTRO-DE-PATRIM-NIO.git
## 2️⃣ Acessar a Pasta da API
cd api

## 3️⃣ Instalar as Dependências
npm install

## 4️⃣ Configurar o Arquivo .env

Crie um arquivo .env dentro da pasta api/ com o seguinte conteúdo:

DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"

## 5️⃣ Criar as Tabelas no Banco de Dados
npx prisma migrate dev

## 6️⃣ Iniciar o Servidor Back-end
node src/server.js


A API estará disponível em:

http://localhost:3333/api

## 🌐 Executando o Front-end

O front-end é estático e deve ser executado localmente.

Abra a pasta web/ no VS Code

Execute o arquivo index.html utilizando Live Server

Páginas Disponíveis

web/index.html

web/setores.html

web/patrimonios.html

## ✅ Teste Rápido do Sistema

Cadastre um Setor

Cadastre um Patrimônio vinculado ao setor

Utilize a opção Exportar Excel para gerar o relatório

## 🧯 Possíveis Problemas

Erro de conexão com banco: verificar se o MySQL está ativo e a DATABASE_URL correta

Porta 3333 em uso: alterar a porta no server.js

Erro ao rodar migrations: verificar permissões do usuário do banco

## 📚 Objetivo Educacional

Este projeto foi desenvolvido com foco educacional, permitindo a compreensão prática de:

Sistemas Web

Arquitetura API REST

Separação de responsabilidades

Banco de dados relacional

Boas práticas de desenvolvimento utilizadas no mercado

## ✅ Considerações Finais

O sistema atende integralmente aos requisitos da avaliação prática do SENAI, demonstrando domínio técnico, organização do código, clareza didática e aplicação prática de conceitos modernos de desenvolvimento web.
