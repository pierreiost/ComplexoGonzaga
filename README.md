# Complexo Gonzaga

# 🏠 Landing Page Simples com Temperatura

Um projeto básico de landing page desenvolvido com React Native, apresentando uma barra de navegação no topo e a integração com uma API externa para exibir a temperatura local.

Este projeto foi desenvolvido como parte de um trabalho acadêmico, focando na estrutura básica de um aplicativo mobile e no consumo de serviços externos (APIs).

---

## ✨ Funcionalidades

* **Layout de Landing Page:** Estrutura visual básica para uma página inicial.
* **Barra de Navegação (Navbar):** Menu simples no topo da tela com links simulados.
* **Responsividade Básica:** A navbar se adapta à largura da tela usando Flexbox.
* **Exibição de Temperatura:** Busca a temperatura atual de uma API externa (MeteoBlue) e a exibe no canto inferior direito da tela.
* **Indicador de Loading e Erro:** Exibe o status da busca pela temperatura.

## 📦 Tecnologias Utilizadas

* **React Native:** Framework para desenvolvimento de aplicativos mobile.
* **Flexbox:** Para layout responsivo.
* **Fetch API (ou Axios):** Para requisições HTTP.

---

## 🚀 Configuração e Execução

Siga os passos abaixo para configurar e rodar o projeto na sua máquina:

1.  Clone este repositório (ou crie os arquivos com o código fornecido).
    ```bash
    # Se for um repositório Git
    git clone <url_do_seu_repositorio>
    cd <nome_do_seu_repositorio>
    ```
2.  Instale as dependências do projeto.
    ```bash
    npm install
    # ou
    yarn install
    ```
    *(Nota: Se usou `axios`, certifique-se de que ele foi instalado: `npm install axios` ou `yarn add axios`)*
3.  Execute o aplicativo no emulador ou dispositivo conectado.
    ```bash
    npm start
    # ou
    yarn start
    ```
    Siga as instruções no terminal para abrir no Android (`a`) ou iOS (`i`).

---

## 🔑 Configuração da API

Este projeto utiliza a API da MeteoBlue para obter a temperatura. Você precisará inserir sua chave de API no código.

1.  Abra o arquivo `index.tsx` (ou o arquivo do componente principal da sua landing page).
2.  Encontre a linha que define a chave da API:
    ```typescript
    const METEOBLUE_API_KEY = 'SUA_CHAVE_AQUI'; // <-- Substitua PELA SUA CHAVE REAL
    ```
3.  Substitua pela sua chave de API da MeteoBlue.
4.  **Importante:** Se estiver usando uma URL ou formato de resposta da API diferente do exemplo fornecido, ajuste a constante `METEOBLUE_API_URL` e a lógica dentro da função `WorkspaceTemperature` para parsear os dados corretamente, de acordo com a [documentação da API da MeteoBlue](https://docs.meteoblue.com/) (link ilustrativo - use o link correto da sua documentação/pacote).

---

## 🤝 Contribuição

Este é um projeto simples para fins acadêmicos, mas sinta-se à vontade para usá-lo como base para seus próprios estudos e melhorias.

---

Desenvolvido por Pierre Iost e Arthur Sabino para Complexo Esportivo Gonzaga