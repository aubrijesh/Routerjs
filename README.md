
# Routerjs
router for jquery
Initially I am starting this project for providing routes in frontend like other framework(Angularjs,, Reactjs, Vue.js) but with a difference.
The user will be able to use it with JQuery and other JQuery plugins. It will provide simple, minimal and elegent solution for creating single page app using most loved library that is JQuery.
Beside routing,It will provide smooth transitions of pages. For most hybrid app development we need some smooth transition between pages. So no need to use other css library for transitions.
Corrently we have four transitions. In future we will add more animation for routes.
Fom templating, I am using handlerbar. So for now dependency is JQuery and Handlerbar.js.
  
### Check Live Example: http://blog.jquery-router.softagreement.com/

## How to Use:

Simply Include:
routes.css, routes.js with dependancies(JQuery, Hanlderbar) to your html
``` html
<link rel="stylesheet" type="text/css" href="css/routes.css">

<script type="text/javascript" src="js/jquery-min.js"></script>
<script type="text/javascript" src="js/handlebars-v4.0.10.js"></script>
<script type="text/javascript" src="js/routes.js"></script>
```

## Router Initilization:

Router initilization is simple, simply define your routes in an array with each object having route name and template id.
template will be rendered when given route matches.
Simple Example:

``` javascript
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
  ```
  
It is having four routes each route object having two key name and template. this template will be rendered when route matches with route object name.
You need to create your html template corresponding these routes. Like first route refers template #template-first so we need to define html template in our html code as like below.

``` html
<template id="template-first">
</template>
```
### Route data function:
Simply put data in {}.

On load of html page your first route template will be render.

## Route Navigation:

  Route navigation is super easy. Routes.js provides two functions for moving forward and backward.
  
  ### Router.push();
  push function loads next routes to context and renders template associate with it.
  
  ### Router.pop()
  pop current route and loads previous route to context and renders template associate with it.

  You can navigate using push and pop method by calling them in button click or on click of header navigation icons.
  
  Example:
  ``` javascript
  $('body').on('click','.next', function() {
	Router.push();
  });
  ```
  Animations that you can try:
  
  ```
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
```

