Boilerplate
===========

> Ponto de partida front-end para aplicações web.


**Importante!** Para o uso do Boilerplate é necessário ter o [Node.js](http://www.nodejs.org) instalado.


### Pré-Instalação

Caso ainda não tenha o [Volo](http://www.volojs.org) instalado, no cmd/powershell execute o comando:

```
npm install -g volo
```

Esse comando instalará o [Volo](http://www.volojs.org), que será o responsável pelo gerenciamento das dependências da sua aplicação


### Instalação

Estando dentro da pasta da aplicação, no cmd/powershell execute o comando:

```
volo install -f baltazzar/boilerplate .
```

**Não esquecer do ponto no final**

Esse comando instalará o Boilerplate juntamente com as bibliotecas necessárias para o seu uso.


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

Onde estiver escrito "NOME DA APP" altere para o nome real da sua aplicação.

#### app/templates/menu.tpl

Onde estiver escrito "SIGLA DA APP" altere para a sigla real da sua aplicação.

#### app/templates/_header.tpl

Onde estiver escrito "SIGLA DA APP" e "NOME DA APP" altere para a sigla real e o nome real da sua aplicação.

#### package.json

Onde estiver escrito "SIGLA_DA_APP" altere para a sigla real da sua aplicação.

#### .ftppass

Onde estiver escrito "FTP SERVER USERNAME" e "FTP SERVER PASSWORD" altere para o usuário e senha do servidor ftp que deseja utilizar para deploy.


### Instalação das Dependências

#### Dependências do Boilerplate

Estando dentro da pasta da aplicação, no cmd/powershell execute o comando:

```
npm install
```

Esse comando instalará o [Grunt](http://gruntjs.com/) e seus plugins. O Grunt será responsável por auxiliá-lo no processo de desenvolvimento da aplicação.


### Compilação dos Templates

Estando dentro da pasta da aplicação, no cmd/powershell execute o comando:

```
grunt compile
```

Esse comando compilará os templates iniciais necessários para o uso do Boilerplate.


### Informações Adicionais

Para adicionar bibliotecas à sua aplicação, altere o objeto `volo.dependencies` no arquivo `package.json`. Para saber mais sobre como adicionar bibliotecas neste arquivo favor consultar a documentação no [Repositorio do Volo no Github](https://github.com/volojs/volo/blob/master/commands/add/doc.md).

Após adicionar as bibliotecas, estando dentro da pasta da aplicação, no cmd/powershell execute o comando:

```
volo install -f
```

Esse comando baixará todas as dependências expecificadas no arquivo `package.json` e as colocará na pasta `app/js/libs`.

Repita essa rotina sempre que precisar adicionar/remover bibliotecas da aplicação.