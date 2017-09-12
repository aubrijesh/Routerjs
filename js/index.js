$(document).ready(function() {
	var newAnimations = [
		{
			push: 'slide-to-left',
			pop: 'slide-to-right'
		},
		{
			push: 'slide-to-top',
			pop: 'slide-to-bottom'
		},
		{
			push: 'top-to-bottom',
			pop: 'bottom-to-top'
		},
		{
			push: 'right-to-left',
			pop: 'left-to-right'
		}
	];

	var routes = [
		{
			name: 'first',
			template: '#template-first',
			render: function() {
				var data = {
					name: 'first template',
					address: 'first template address'
				};
				console.log("p1111111111");
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
				console.log("p22222222222");
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
				console.log("p333333333");
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
				console.log("p444444444");
				return new Promise((resolve, reject) => {
				  setTimeout(function(){
				    resolve(data);
				  }, 2000);
				});
			}
		}
	];
	Router.init({
		routes: routes,
		animations: newAnimations[3],
		beforeLoadAnimation: false,
		showLoader: function() {
			$('.loader').css('display','block');
		},
		hideLoader: function() {
			$('.loader').css('display','none');
		} 
	});
	$('body').on('click','.next', function() {
		Router.push();
	});
	$('body').on('click','.prev', function() {
		Router.pop();
	})
});