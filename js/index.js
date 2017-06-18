$(document).ready(function() {
	var routes = [
		{
			name: 'first',
			template: '#template-first',
			beforeLoadAnimation: true,
			render: function() {
				var data = {
					name: 'first template',
					address: 'first template address'
				};
				return new Promise((resolve, reject) => {
				  setTimeout(function(){
				    resolve(data);
				  }, 2000);
				});
			}
		},
		{
			name: 'second',
			template: '#template-second',
			beforeLoadAnimation: true,
			render: function() {
				var data = {
					name: 'second template',
					address: 'second template address'
				}
				return new Promise((resolve, reject) => {
				  setTimeout(function(){
				    resolve(data);
				  }, 2000);
				});
			}
		},
		{
			name: 'third',
			template: "#template-third",
			beforeLoadAnimation: true,
			render: function() {
				var data = {
					name: 'third template',
					address: 'third template address'
				}
				return new Promise((resolve, reject) => {
				  setTimeout(function() {
				    resolve(data);
				  }, 2000);
				});
			}
		},
		{
			name: 'fourth',
			template: "#template-fourth",
			beforeLoadAnimation: true,
			render: function() {
				var data = {
					name: 'fourth template',
					address: 'fourth template address'
				}
				return new Promise((resolve, reject) => {
				  setTimeout(function(){
				    resolve(data);
				  }, 2000);
				});
			}
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