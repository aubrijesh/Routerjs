$(document).ready(function() {
	var routes = [
		{
			name: 'first',
			template: '#template-first',
		},
		{
			name: 'second',
			template: '#template-second',
		}
	];
	Router.init(routes);
});