# ✈️ AeroCode GUI - Protótipo de Gestão de Produção

[cite_start]Este é um protótipo de front-end de uma Aplicação de Página Única (SPA) [cite: 324] [cite_start]desenvolvida em React [cite: 374-375] [cite_start]para a Atividade de Avaliação 2[cite: 248]. [cite_start]O objetivo é substituir a interface de linha de comando (CLI) anterior por uma interface gráfica de usuário (GUI) [cite: 314-316] [cite_start]mais intuitiva, facilitando o gerenciamento da produção de aeronaves[cite: 307].

[cite_start]O projeto funciona como um protótipo navegável, utilizando dados "mocados" (mock data) e gerenciamento de estado via React Context, sem um back-end[cite: 388].

## ✨ Funcionalidades Implementadas

* **Autenticação**: Sistema de login real com estado global (React Context).
* **Rotas Protegidas**: O usuário não pode acessar o sistema (`/app/*`) sem estar logado.
* **Controle de Permissão**: O menu lateral é dinâmico e exibe/oculta a página de "Funcionários" com base no nível de permissão (Administrador, Engenheiro, Operador).
* **Dashboard**: Tela inicial com estatísticas resumidas (total de aeronaves, em produção, etc.).
* **CRUD de Aeronaves**:
    * Listar aeronaves em uma tabela (`antd Table`).
    * Adicionar uma nova aeronave (com formulário e salvamento no Contexto).
* **CRUD de Funcionários** (Acesso de Admin):
    * Listar funcionários em uma tabela.
    * Adicionar novo funcionário (via modal `antd`).
* **Página de Detalhes da Aeronave (Hub de Gestão)**:
    * Navegação por Abas (`antd Tabs`) para Detalhes, Peças, Etapas, Testes e Relatório.
    * **Aba Peças**: Adicionar peças e atualizar o status de peças existentes (via modal).
    * [cite_start]**Aba Etapas**: Adicionar etapas, editar responsáveis e **avançar o status** (com a lógica de sequência [cite: 172] que impede avançar fora de ordem).
    * [cite_start]**Aba Testes**: Registrar novos testes (Aprovado/Reprovado) [cite: 181-182].
    * [cite_start]**Aba Relatório**: Gerar um relatório final em texto (simulado em um modal) com base nos dados da aeronave [cite: 183-184].
* **Gerenciamento de Estado Global**: O `DataContext` permite que todas as adições e edições (novas peças, funcionários, status de etapas) persistam durante a sessão do usuário.

## 🚀 Tecnologias Utilizadas

* **React**
* **Vite** (Build Tool)
* **TypeScript**
* **React Router v6** (Para navegação da SPA)
* **Ant Design (`antd`)** (Biblioteca de componentes de UI)
* **React Context** (Para gerenciamento de estado de Autenticação e Dados)

## ⚙️ Como Instalar e Executar

### Pré-requisitos

* Node.js (v18 ou superior)
* NPM ou Yarn

### Instalação

1.  Clone este repositório:
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    ```
2.  Entre na pasta do projeto:
    ```bash
    cd aero-gui
    ```
3.  Instale as dependências (incluindo `antd`, `react-router-dom`, etc.):
    ```bash
    npm install
    ```

### Execução

1.  Para iniciar o servidor de desenvolvimento (com Hot Reload):
    ```bash
    npm run dev
    ```
2.  Abra o seu navegador e acesse [http://localhost:5173](http://localhost:5173) (ou a porta indicada no terminal).

## 🔑 Credenciais de Teste

O sistema utiliza dados mocados para simular o login. Você pode usar as seguintes credenciais:

| Usuário | Senha | Nível | Acesso |
| :--- | :--- | :--- | :--- |
| `admin` | `admin` | Administrador | Vê tudo, pode adicionar funcionários. |
| `eng` | (qualquer) | Engenheiro | Vê tudo, exceto gerenciamento de funcionários. |
| `op` | (qualquer) | Operador | Vê tudo, exceto gerenciamento de funcionários. |
