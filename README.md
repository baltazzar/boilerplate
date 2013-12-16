Boilerplate
===========

Ponto de partida front-end para aplicações web.

### Bibliotecas Inclusas

- jQuery
- Backbone
- Underscore
- Marionette
- Handlebars
- Bootstrap
- Require

### Configuração dos Arquivos

#### index.html

Onde tiver escrito "NOME DA APP" altere para o nome real da sua aplicação.

#### config.js

Alterar a variável "BASE_URL" para a url do backend a ser utilizado.

#### app/templates/menu.tpl

Onde tiver escrito "SIGLA DA APP" altere para a sigla real da sua aplicação.

#### app/templates/_header.tpl

Onde tiver escrito "SIGLA DA APP" e "NOME DA APP" altere para a sigla real e o nome real da sua aplicação.

#### package.json

Onde tiver escrito "SIGLA DA APP" altere para a sigla real da sua aplicação.

#### .ftppass

Onde estiver escrito "FTP SERVER USERNAME" e "FTP SERVER PASSWORD" altere para o usuário e senha do servidor ftp que deseja utilizar para deploy.


### Instalação das Dependências

**Importante! Para baixar as dependências do Boilerplate é necessário ter o [Node.js](http://www.nodejs.org) instalado.**


#### Dependências do Boilerplate

No cmd/powershell execute o comando:

```
npm install
```

Esse comando baixará todas as dependências necessárias para o uso apropriado do Boilerplate.

#### Dependências da App

No arquivo package.json, em `volo.dependencies`, adicione as demais bibliotecas necessárias ao seu projeto. Para saber mais sobre como adicionar bibliotecas neste arquivo favor consultar a documentação no [Repositorio do Volo no Github](https://github.com/volojs/volo/blob/master/commands/add/doc.md). No cmd/powershell execute o comando:

```
volo install -f
```

Esse comando baixará todas as dependências expecificadas no arquivo `package.json` e as colocará na pasta `app/js/libs`