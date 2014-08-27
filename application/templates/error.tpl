<div class="text-center" style="margin-top:50px;">
	<span class="glyphicon glyphicon-exclamation-sign text-danger" style="font-size:100px; text-shadow:3px 3px 6px #777"></span>
	<h3 class="text-muted">
	{{#if responseJSON}}
		{{responseJSON.errorMessage}}
	{{else}}
		Ocorreu um erro na requisição. Favor tentar novamente!
	{{/if}}
	</h3>
	<a href="#/" class="btn btn-warning">Página Inicial</a>
</div>