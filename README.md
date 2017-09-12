
### Currently in development. Please do not use it in production. It will take some time to make it production ready.We will let you know once production build is ready. You can use for testing purpose for now.
	
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

routes.css uses route-slider class name with position fixed and using z-index pages will be stacked and only current page will be on page. So you need to add this tiny css for providing base styling for your html.

## Router Initilization:

Router initilization is simple, simply define your routes in an array with each object having route name and template id.
template will be rendered when given route matches.
Simple Example:

``` javascript
$(document).ready(function() {
  var routes = [
		{
			name: 'first',
			template: '#template-first',
			render: function() {
				/* 
					return promise data  here that your will be able to get in template 
				*/
				return $.ajax({
					url: 'http://abc.com/users',
					method: 'get',
					data: {id: 1}
				});
			}
		},
		{
			name: 'second',
			template: '#template-second',
			render: function() {
				return $.ajax({
					url: 'http://abc.com/users',
					method: 'get',
					data: {id: 1}
				});
			}
		},
		{
			name: 'third',
			template: "#template-third",
			render: function() {
				return $.ajax({
					url: 'http://abc.com/users',
					method: 'get',
					data: {id: 1}
				});
			}
		},
		{
			name: 'fourth',
			template: "#template-fourth",
			render: function() {
				return $.ajax({
					url: 'http://abc.com/users',
					method: 'get',
					data: {id: 1}
				});
			}
		}
	];
	Router.init({
		routes: routes,
		animations: {
			push: 'slide-to-left',
			pop: 'slide-to-right'
		},
		beforeLoadAnimation: true
	});
	
  }); 
  ```
  
It is having four routes each route object having two key name and template. this template will be rendered when route matches with route object name.
You need to create your html template corresponding these routes. Like first route refers template #template-first so we need to define html template in our html code as like below.

``` html
<template id="template-first">
</template>
```
### Route render function:
In render function we need to return promise data to context that we can access in corresponding route template and using handlerbar template syntax we can render it.

If you want to send static data to template you need to promise syntax as render function only accept promise data. You can send static as like below.

``` javascript
var routerObj = {name: 'routerjs'}
return new Promise((resolve, reject) => {
    resolve(routerObj);
});
```

Now you will be able to access your routerObj in corresponding route template.


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
  Animations combination you can use are:
  
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
	} ```

