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
			data: function() {
				return {
					name: 'first template',
					address: 'first template address'
				};
			}
		},
		{
			name: 'second',
			template: '#template-second',
			data: function() {
				return {
					name: 'second template',
					address: 'second template address'
				};
			}
		},
		{
			name: 'third',
			template: "#template-third",
			data: function() {
				return {
					name: 'third template',
					address: 'third template address'
				};
			}
		},
		{
			name: 'fourth',
			template: "#template-fourth",
			data: function() {
				return {
					name: 'fourth template',
					address: 'fourth template address'
				};
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