
# Desafio Dev - By Coders

Minha versão do desafio disponibilizado pela equipe do by coders, sendo a tarefa dos mesmo criar uma interface web que consome uma API para a visualização/manipulação/registro de arquivos CNAB


## Links

 - [Live Demo](https://desafio.gojlevicius.com/dashboard)
 - [Arquivo CNAB](https://raw.githubusercontent.com/gojnimer/desafio-dev/main/CNAB.txt)
 - [Repositório original](https://github.com/ByCodersTec/desafio-dev)
 - [Swagger API](https://desafio-dev-backend.herokuapp.com/api)
 


## Stack utilizada

**Front-end:** React.js (Typescript)

**Back-end:** Nest.js (Typescript)


# Back-end



## Funcionalidades

- CRUD de registro de CNAB completo (com transaction fallback).
- Auto-migration de tabelas.
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DB_HOST` Host do banco de dados.  
`DB_PORT` Port do banco de dados.  
`DB_USERNAME` Usuário usado para acessar o seu banco de dados.  
`DB_PASSWORD` Senha usada para acessar o seu banco de dados.  
`DB_NAME` Nome do banco qual será feita a conexão  

## Inicializando o projeto localmente

### Instalação

#### Instale as dependencias do projeto.
```bash
  npm install
```

#### Após a instalação, crie uma migration e sincronize ela com o seu banco de dados
```bash
  npm run migration:generate
  npm run db:sync
```

#### Após a sincronizar com o banco inicialize o projeto
```bash
  npm run start:dev
```

A documentação da api ficara disponível no URL http://localhost:4000/api, você também pode acessar a documentação atráves do URL de [demonstração](https://desafio-dev-backend.herokuapp.com/api).

Após testar o endpoint seguir para as instruções de inicialização do front-end.

PS: Não se esqueça de configurar criar o `.env` antes de seguir esses passos.
## Rodando os testes

Para rodar os testes unitários rode o seguinte comando.

```bash
  npm test -- --coverage --watchAll
```

Para rodar os testes end to end rode o seguinte comando.

```bash
  npm test:e2e
```


# Front-end

#### Inicializar o front-end somente após subir o backend.

## Funcionalidades

- Fluxo completo de manipulação/registro de um ou mais arquivos (simultâneos)
- Responsivo (Web, Mobile)

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`REACT_APP_MAIN_API` URL base da API, exemplo: `REACT_APP_MAIN_API=http://localhost:4000`



## Inicializando o projeto localmente

### Instalação

#### Instale as dependencias do projeto.
```bash
  npm install
```

#### Após a instalação, inicialize o projeto
```bash
  npm start
```

Acesse o projeto a partir do URL http://localhost:3000, você também pode testar o projeto a partir do site de [demonstração](https://desafio.gojlevicius.com/dashboard).

PS: Não se esqueça de configurar criar o `.env` antes de seguir esses passos.


## Rodando os testes

Para rodar os testes unitários, rode o seguinte comando

```bash
  npm test
```


## Autores

- [@gojnimer](https://github.com/gojnimer)

