$(document).ready(function() {
	var routes = [
		{
			name: 'first',
			template: '#template-first',
		},
		{
			name: 'second',
			template: '#template-second',
		},
		{
			name: 'third',
			template: "#template-third"
		},
		{
			name: 'fourth',
			template: "#template-fourth"
		}
	];
	Router.init(routes);
	$('body').on('click','.next', function() {
		Router.push();
	});
	$('body').on('click','.prev', function() {
		Router.pop();
	})
});