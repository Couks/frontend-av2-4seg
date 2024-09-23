# Sistema de Autenticação de Usuários

## Enunciado do Aplicativo

O objetivo deste aplicativo é criar um sistema básico de autenticação de usuários com foco em segurança. O aplicativo deve permitir que um usuário crie uma conta e faça login, garantindo que suas credenciais sejam validadas e armazenadas de maneira segura. Além disso, o sistema deve implementar mecanismos de segurança para evitar ataques de injeção de SQL e aplicar autenticação de dois fatores via SMS. A senha dos usuários deve ser criptografada para maior proteção.

## Link de Deploy

- [Deploy do App na Vercel](https://seu-link-aqui.vercel.app)

## Requisitos Funcionais

- [ ] **Formulário de Cadastro e Login**

  - [ ] Criar um formulário com os campos username e password.
  - [ ] Aplicar uma validação de senha utilizando expressões regulares (regex), assegurando que a senha atenda aos critérios de segurança, como comprimento mínimo e presença de caracteres especiais permitidos.

- [ ] **Simulação de Banco de Dados**

  - [ ] Simular o banco de dados em variáveis que armazenem os dados de usuários (username e password).
  - [ ] Implementar uma consulta SQL para retornar o usuário com base nas informações fornecidas:
    ```sql
    SELECT * FROM USER WHERE username="$username" AND pass="$password"
    ```
  - [ ] Exibir o resultado da consulta na tela.

- [ ] **Proteção contra Injeção de SQL**

  - [ ] Verificar se o campo de senha é vulnerável a injeção de SQL, por exemplo, testando a string `OR 1=1`.
  - [ ] Aplicar medidas de segurança para garantir que caracteres inseguros, como aspas simples e duplas, não sejam aceitos no campo de senha.

- [ ] **Armazenamento de Usuário e Senha**

  - [ ] Criar um banco de dados (ou equivalente) para armazenar o username e a password.
  - [ ] Criptografar a senha utilizando o algoritmo SHA256 antes de armazená-la.

- [ ] **Autenticação de Dois Fatores (2FA)**

  - [ ] Implementar um sistema de autenticação de dois fatores (2FA) via SMS, que deve ser acionado após a verificação inicial do username e password.

- [ ] **Validação de Senha Criptografada**
  - [ ] No login, criptografar a senha inserida pelo usuário utilizando SHA256.
  - [ ] Comparar a senha criptografada inserida com a senha criptografada armazenada no banco de dados para validar o acesso.

## Requisitos Não Funcionais

- [ ] **Segurança**: A aplicação deve implementar medidas de segurança para evitar ataques de injeção de SQL e garantir que as senhas sejam criptografadas.
- [ ] **Desempenho**: O aplicativo deve ser capaz de realizar as consultas e verificações de segurança de maneira eficiente.
- [ ] **Usabilidade**: O formulário deve ser intuitivo e fornecer feedback claro ao usuário caso uma senha não atenda aos critérios de segurança ou contenha caracteres proibidos.

## Funcionalidades Adicionais

- [ ] Criar autenticação com senha armazenada com SHA256.
- [ ] Criar um captcha de seis dígitos caso o usuário erre a senha.
- [ ] Usar segundo fator de autenticação com verificação por email ou SMS.
- [ ] Verificar o IP do usuário e compará-lo com o IP cadastrado em banco de dados.
- [ ] Criar log de todas as ações.
