# Routerjs
router for jquery
Initially I am starting this project for providing routes in frontend like other framework(Angularjs,, Reactjs, Vue.js) but with a difference.
The user will be able to use it with JQuery and other JQuery plugins. It will provide simple, minimal and elegent solution for creating single page app using most loved library that is JQuery.
Beside routing,It will provide smooth transitions of pages. For most hybrid app development we need some smooth transition between pages. So no need to use other css library for transitions.
Corrently only Slide from left and slide from right animation is supported. In future we will add more animation for routes.
From templating I am using handlerbar. So for now dependency is JQuery and Handler.js.

# How to Use:

Simply Include:
routes.css, routes.js to your html
<link rel="stylesheet" type="text/css" href="css/routes.css">
<script type="text/javascript" src="js/routes.js"></script>

routes.css uses route-slider class name with position fixed and using z-index pages will be stacked and only current page will be on page. So you need to add this tiny css for providing base styling for your html.

# Router Initilization:

Router initilization is simple, simply define your routes in an array with each object having route name and template id.
template will be rendered when given route matches.
Simple Example:

``` javascript
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
  }); ```
  
It is having four routes each route object having two key name and template. this template will be rendered when route matches with route object name.
You need to create your html template corresponding these routes. Like first route refers template #template-first so we need to define html template in our html code as like below.

```
<template id="template-first">
</template>
```

On load of html page your route template will be render.

# Route Navigation:

  Route navigation is super easy. Routes.js provides two functions for moving forward and backward.
  
  # Router.push();
  push function loads next routes to context and renders template associate with it.
  
  # Router.pop()
  pop current route and loads previous route to context and renders template associate with it.

  You can navigate using push and pop method by calling them in button click or on click of header navigation icons.
  
  Example:
  ``` javascript
  $('body').on('click','.next', function() {
	Router.push();
  });
  ```
  
# Passing data to render function
In progress, we will come back soon. Stay tuned.
