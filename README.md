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
