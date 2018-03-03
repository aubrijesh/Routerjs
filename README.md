
# Routerjs
router for jquery
Initially I am starting this project for providing routes in frontend like other framework(Angularjs,, Reactjs, Vue.js) but with a difference.
The user will be able to use it with JQuery and other JQuery plugins. It will provide simple, minimal and elegent solution for creating single page app using most loved library that is JQuery.
Beside routing,It will provide smooth transitions of pages. For most hybrid app development we need some smooth transition between pages. So no need to use other css library for transitions.
Corrently we have four transitions. In future we will add more animation for routes.
Fom templating, I am using handlerbar. So for now dependency is JQuery and Handlerbar.js.

#### Routerjs in action
![alt text](https://github.com/aubrijesh/Routerjs/blob/master/image/demos/rjleftright.gif "Animation left right")
![alt text](https://github.com/aubrijesh/Routerjs/blob/master/image/demos/rjupdown.gif "Animation up down")

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
		beforeRender: function() {
			console.log("in before render");
			this.methods.getDataFromServer.bind(this)();
		},
		afterRender: function() {
			console.log("in After render");
			console.log(this);
		},
		renderAlways: false,
		methods: {
			firstFunction: function() {
				console.log("first function found");
			},
			getDataFromServer: function() {
				console.log("in get data from server");
				var self = this;
				$.ajax({
					url: "http://localhost:8080/js/user_json.json",
					method: "GET",
					success: function(data) {
						console.log("in get json success", data);
						self.data.user_list = JSON.parse(data);
						self.update();
					},
					error: function(error) {
						console.log("in ajax error");
					}
				})
			}
		},
		events: {
			'click, .btn-update': function(el) {
				this.data.user_list[1].first_name = "changed first name";
				this.methods.firstFunction.bind(this)(); // you can call function using this, this will refer to current router object
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
		renderAlways: false,
		autoRender: false,
		data: {
			name: 'second template',
			address: 'second template address'
		},
		render: function($el, templateElement, data) {
			console.log($el, templateElement, data);
			var source   = $(templateElement).html();
			var template = Handlebars.compile(source);
			var html  = template(data);
			$el.html(html);
		}
	};


	var routes = [ cmpFirst, cmpSecond];
	Router.init({
		routes: routes,
		animations: newAnimations[0],
		beforeLoadAnimation: false,
		data: {
			hello_parent: "Hello from parent"
		},
		methods: {
			testing: function() {
				console.log("testing in parent");
			}
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
	'click, .next': function() {
		Router.push();
	},
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

## Route Object options

### name : string
name of route

### template : string
template id for that route

### renderAlways: Boolean
Default : true
if you set renderalways to false then first time data will be render for that perticular route not each time you visit that route.
If you want to render only first in route you can set this to false

### autoRender: Boolean
Default: true
It gives to facility to manually use render function. if you set false then you can use render function to manually render as you want. If autoRender is true (Default is true ) then you don't need to worry about render you just need to put data in data object of route and it will render automatically.

### data : Object
data to render in route template

### beforeRender: function
function will be called just before data render in template
you can use before render function to fetch data from server and update route data.
example:

```
const cmpFirst = {
	name: 'first',
	template: '#template-first',
	data: {
		page_name: "First page",
		user_list: json
	},
	beforeRender: function() {
		console.log("in before render");
		this.methods.getDataFromServer.bind(this)();
	},
	methods: {
		getDataFromServer: function() {
			console.log("in get data from server");
			var self = this;
			$.ajax({
				url: "http://localhost:8080/js/user_json.json",
				method: "GET",
				success: function(data) {
					console.log("in get json success", data);
					self.data.user_list = JSON.parse(data);
					self.update();
				},
				error: function(error) {
					console.log("in ajax error");
				}
			})
		}
	},
	events: {
		}
};

```
Here I am fetching data from server and updating data in route object. You need to bind reference of route object to pass route context in when calling this.methods.getDataFromServer. 
Also after data is fetched you need to explicitly assign it to route object and call update function of route which will re-render handlerbar template. 
Because your this.methods.getDataFromServe making ajax call that is asyncronous so render will not wait for that and you need to call update function explicitly in ajax success to update data in template.

### render : function
Params: ($el, templateElement, data)

case 1: it will done automatically if you have set autoRender to false, default value of autoRender is true that means it will render automatically.

case 2: if you have explicitly set autoRender to false then you can handle render function in your route object. That give a bit more flexibility. You can use it if you want to use render function by yourself.
this function have three parameters

$el: container element in route template in which you need to populate your html from template

templateElement: html template element, you can use this to $el with data

data: data of your route object

### afterRender: Function
function called after template render

### methods: Object

object containing methods used in your route
Ex:
```
methods: {
	testing: function() {
		console.log("testing function");
	}
}
```

### events: Object
List of event used in route. you can define your event like button click and can perform operation on that.
Ex:
```
events: {
	'click, .btn-update': function(el) {
		this.data.user_list[1].first_name = "changed first name";
		this.methods.firstFunction.bind(this)(); // you can call function using this, this will refer to current router object
		this.update(); // need to call update as handlerbar template will update automatically
	}
}
```
