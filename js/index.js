$(document).ready(function() {
	var routes = [
		{
			name: 'first',
			template: '#template-first',
			render: function() {
				var data = {
					name: 'first template',
					address: 'first template address'
				};
				return new Promise((resolve, reject) => {
				  setTimeout(function(){
				    resolve(data);
				  }, 0);
				});
			}
		},
		{
			name: 'second',
			template: '#template-second',
			render: function() {
				var data = {
					name: 'second template',
					address: 'second template address'
				}
				return new Promise((resolve, reject) => {
				  setTimeout(function(){
				    resolve(data);
				  }, 0);
				});
			}
		},
		{
			name: 'third',
			template: "#template-third",
			render: function() {
				var data = {
					name: 'third template',
					address: 'third template address'
				}
				return new Promise((resolve, reject) => {
				  setTimeout(function() {
				    resolve(data);
				  }, 0);
				});
			}
		},
		{
			name: 'fourth',
			template: "#template-fourth",
			render: function() {
				var data = {
					name: 'fourth template',
					address: 'fourth template address'
				}
				return new Promise((resolve, reject) => {
				  setTimeout(function(){
				    resolve(data);
				  }, 0);
				});
			}
		}
	];
	Router.init({
		routes: routes,
		animations: {
			push: {
				name: 'slide-from-left'
			},
			pop: {
				name: 'slide-from-right'
			}
		},
		beforeLoadAnimation: true
	});
	$('body').on('click','.next', function() {
		Router.push();
	});
	$('body').on('click','.prev', function() {
		Router.pop();
	})
});