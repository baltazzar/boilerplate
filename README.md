# Boilerplate 2
> Ponto de partida front-end para desenvolvimento de aplicações web.

### Pré-Instalação

Para usar o Boilerplate é necessário ter o [Node.js](http://www.nodejs.org) e o [Volo.js](http://www.volojs.org) instalados. Instale o [Node.js](http://www.nodejs.org) seguindo as instruções contidas no site.

Após instalar o [Node.js](http://www.nodejs.org) rode o seguinte comando no cmd/powershell para instalar o [Volo.js](http://www.volojs.org):

```
npm install -g volo
```

### Instalação

No cmd/powershell execute o comando abaixo, substituindo `NOME_DA_APP` pelo nome da sua aplicação:

```
volo create NOME_DA_APP baltazzar/boilerplate
```

Esse comando instalará o Boilerplate juntamente com as bibliotecas necessárias para o seu uso.

### Estrutura de Arquivos

```
├── application
|	├── collections
|	├── controllers
|	├── models
|	├── templates
|	├── views
|	├── application.js
|	└── initializer.js
├── base
|	├── baseController.js
|	├── dispatcher.js
|	├── main.js
|	└── router.js
├── css
|	├── boilerplate.css
|	└── main.css
├── fonts
├── libs
├── config.js
├── Gruntfile.js
├── index.html
└── package.json
```