$(document).ready(function() {
	const newAnimations = [
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

	const cmpFirst = {
		name: 'first',
		template: '#template-first',
		data: {
			page_name: "First page",
			user_list: json
		},
		renderAlways: false,
		methods: {
			firstFunction: function() {
				console.log("first function found");
			},
			newFunction: function() {
				console.log("new function executed");
			}
		},
		events: {
			'click, .btn-update': function(el) {
				this.data.user_list[5].first_name ="changed first name";
				this.methods.firstFunction(); // you can call function using this, this will refer to current router object
				this.update(); // need to call update as handlerbar template will update automatically
			},
			'click, .row': function(el) {
				Router.push();
			},
		}
	};

	const cmpSecond = {
		name: 'second',
		template: '#template-second',
		data: {
			name: 'second template',
			address: 'second template address'
		},
		renderAlways: false,
	};

	const cmpThird = {
		name: 'third',
		template: "#template-third",
		data: {
			name: 'third template',
			address: 'third template address'
		},
		renderAlways: false,
	};

	const cmpFourth = {
		name: 'fourth',
		template: "#template-fourth",
		data:  {
			name: 'fourth template',
			address: 'fourth template address'
		},
		renderAlways: false,
	};

	var routes = [ cmpFirst, cmpSecond, cmpThird, cmpFourth];
	Router.init({
		routes: routes,
		animations: newAnimations[3],
		beforeLoadAnimation: false,
		methods: {
			
		},
		events: {
			'click, .next': function() {
				Router.push();
			},
			'click, .prev': function() {
				Router.pop();
			}
		},
		showLoader: function() {
			$('.loader').css('display','block');
		},
		hideLoader: function() {
			$('.loader').css('display','none');
		} 
	});
});