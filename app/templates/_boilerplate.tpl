<div class="well well-sm" {{!-- style="height: 400px;overflow: auto;" --}}>
	<strong class="text-muted">app/templates/_boilerplate.tpl</strong>
	<h3 class="text-center text-info">Bibliotecas Inclusas</h3>
	<ul>
		<li>jQuery</li>
		<li>Backbone</li>
		<li>Underscore</li>
		<li>Marionette</li>
		<li>Handlebars</li>
		<li>Bootstrap</li>
		<li>Require</li>
	</ul>

	<h3 class="text-center text-info">Configuração dos Arquivos</h3>

	<h4 class="text-danger">index.html</h4>
	<p>
		Onde tiver escrito "NOME DA APP" altere para o nome real da sua aplicação.
	</p>

	<h4 class="text-danger">config.js</h4>
	<p>
		Alterar a variável BASE_URL para a url do backend a ser utilizado.
	</p>

	<h4 class="text-danger">app/templates/menu.tpl</h4>
	<p>
		Onde tiver escrito "SIGLA DA APP" altere para a sigla real da sua aplicação.
	</p>

	<h4 class="text-danger">app/templates/_header.tpl</h4>
	<p>
		Onde tiver escrito "SIGLA DA APP" e "NOME DA APP" altere para a sigla real e o nome real da sua aplicação.
	</p>

	<h4 class="text-danger">package.json</h4>
	<p>
		Onde tiver escrito "NOME DA APP" altere para o nome real da sua aplicação.
	</p>

	<h3 class="text-center text-info">Instalação das Dependências</h3>
	<div class="alert alert-warning">
		<strong>Importante!</strong> Para baixar as dependências do Boilerplate é necessário ter o <a href="http://www.nodejs.org" target="_blank">Node.js</a> instalado.
	</div>

	<h4 class="text-danger">Dependências do Boilerplate</h4>
	<p>
		No cmd/powershell execute o comando: <code>npm install</code>. Esse comando baixará todas as dependências necessárias para o uso apropriado do Boilerplate.
	</p>

	<h4 class="text-danger">Dependências da App</h4>
	<p>
		No arquivo package.json, em volo.dependencies, adicione as demais bibliotecas necessárias ao seu projeto. Para saber mais sobre como adicionar bibliotecas neste arquivo favor consultar a documentação no <a href="https://github.com/volojs/volo/blob/master/commands/add/doc.md" target="_blank">repositório do Volo no Github</a>. No cmd/powershell execute o comando: <code>volo install -f</code>. Esse comando baixará todas as dependências expecificadas no arquivo package.json e as colocará na pasta <strong>app/js/libs</strong>.
	</p>
</div>