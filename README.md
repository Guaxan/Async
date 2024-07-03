# Gerenciamento de Pessoas

Este projeto é uma aplicação web para gerenciar um cadastro de pessoas, permitindo adicionar, atualizar, deletar e listar registros. A aplicação faz uso de 'HTML', 'CSS', e 'JavaScript' para a interface de usuário e se comunica com uma API REST para operações de CRUD.

## Funcionalidades

- **Listar Pessoas:** Carrega e exibe uma lista de pessoas cadastradas.
- **Adicionar Pessoa:** Formulário para adicionar uma nova pessoa.
- **Validar ID:** Verifica se um ID é válido antes de permitir a atualização.
- **Atualizar Pessoa:** Formulário para atualizar os dados de uma pessoa existente.
- **Deletar Pessoa:** Permite deletar uma pessoa específica.
- **Deletar Todas as Pessoas:** Permite deletar todas as pessoas cadastradas.

## Estrutura do Projeto

### HTML

O arquivo 'index.html' define a estrutura básica da página web, incluindo:
- Formulário para adicionar uma nova pessoa.
- Formulário para validar um ID existente antes de atualização.
- Formulário para atualizar os detalhes de uma pessoa.
- Tabela para listar todas as pessoas cadastradas.
- Botão para deletar todas as pessoas.

### JavaScript

O arquivo 'pessoas.js' contém a lógica para:
- Listar todas as pessoas cadastradas, ordenadas por ID.
- Adicionar uma nova pessoa.
- Validar o ID de uma pessoa antes de permitir a atualização.
- Atualizar os dados de uma pessoa existente.
- Deletar uma pessoa específica.
- Deletar todas as pessoas cadastradas.

### CSS

O arquivo 'style.css' contém os estilos para:
- Formatação da tabela de pessoas.
- Estilo dos formulários de cadastro e atualização.
- Estilo do botão de deletar todas as pessoas.

## Como Executar

1. Clone o repositório para sua máquina local:
  ```sh
  git clone https://github.com/seu-usuario/nome-do-repositorio.git
  ```
Navegue até o diretório do projeto:
  ```sh
  cd nome-do-repositorio
  ```
  
- Abra o arquivo index.html em um navegador web.

### API

A aplicação se comunica com uma API REST para realizar operações de CRUD:
- Listar Pessoas: GET /Pessoas/rest/Pessoas/Pessoas
- Adicionar/Atualizar Pessoa: POST /Pessoas/rest/Pessoas/CreateOrUpdatePessoa
- Deletar Pessoa: DELETE /Pessoas/rest/Pessoas/DeletePessoaById?PessoaId={id}
- Validar ID: GET /Pessoas/rest/Pessoas/GetPessoaById?PessoaId={id}
