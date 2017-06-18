(function($, hb) {
	initilization = function() {
		var pushState = history.pushState;

		/* 
			Added By: Brijesh Kumar
			Date: 17/05/2017
			Description: For creating route-containers for each route 
			where route template will be rendered
		*/
		createElements = function() {
			var routerLen = Router.routes.length;
			for(let i=0;i<Router.routes.length; i++) {
				var newElmement = document.createElement('div');
				var $routes = document.getElementById('routes');
				newElmement.classList = ['route-slider'];
				newElmement.setAttribute('data-route-index',i);
				newElmement.style.zIndex = (routerLen - i);
				$routes.appendChild(newElmement);
			}
		}
		createElements();

		/* 
			Added By: Brijesh Kumar
			Date: 17/05/2017
			Descriptio: For rendering template using hanlderbar templating system
		*/

		render = function(templateId, el, data) {
			var source   = $(templateId).html();
			var template = hb.compile(source);
			var html  = template(data);
			var allSlider = document.getElementsByClassName('route-slider slide');
			var slider = document.getElementsByClassName('route-slider')[Router.currentRoute.index];
			if(!Router.activeAnimaion) {
				Router.activeAnimaion = Router.animations.push;
			}
			slider.innerHTML = "";
			slider.classList.add(Router.activeAnimaion.name);

			/* without timeout animation will not be bind */
			setTimeout(function() {
				slider.innerHTML = html;
				slider.classList.add("slide");
				if(allSlider.length > 0) {
					for(let i=0;i<allSlider.length;i++) {
						if(Number(allSlider[i].getAttribute('data-route-index')) !== Router.currentRoute.index) {
							allSlider[i].classList = ["route-slider"];
						}
					}
				}
			},300)
		}

		/* 
			Added By: Brijesh Kumar
			Date: 17/05/2017
			Description: on history change callback , onHistoryChange will called when hash value changes
			arguments: arguments (hash arguments, isReload)
		*/

		onHistoryChange = function(arguments, isReload) {
			console.log(arguments);
			if(isReload) {
				var currentUrl = arguments.replace("#",'');
			}
			else {
				var currentUrl = arguments[2].replace("#",'');
			}
			var currentRoute = Router.routes.filter(function(route, index){
				return route.name === currentUrl;
			})[0];
			
			$('body')
				.find('.route-link')
				.removeClass('active')
				.siblings('.route-link[data-route='+currentUrl + ']')
				.addClass('active');
			render(currentRoute.template,$("#route-content"),[]);
		};
		
	    history.pushState = function(state) {
	        if (typeof history.onpushstate == "function") {
	            history.onpushstate({state: state});
	        }
	        pushState.apply(history, arguments, onHistoryChange(arguments,false));
	    };

	    /* on reload of page regain content of current active route */
	    if(window.location.hash) {
	    	onHistoryChange(window.location.hash,true);
	    	Router.currentRoute = getRouteObject(window.location.hash.replace("#",''));
	    }
	};

	/*  
		added By: Brijesh Kumar
		Date: 17/05/2017
		Description: for getting route object using routeName
	*/

	getRouteObject = function(routeName) {
		var obj = '';
		for(let i=0; i<Router.routes.length; i++) {
			if(Router.routes[i].name === routeName) {
				obj = Router.routes[i];
			}
		}
		return obj;
	};

	window.Router =  {
		routes: [],
		currentRoute: '',
		activeAnimaion: '',
		animations: {
			push: {
				name: 'slide-from-left'
			},
			pop: {
				name: 'slide-from-right'
			}
		},
		init: function(routes, animations=null) {
			this.routes = routes.map(function(obj, index) { obj['index'] = index ; return obj });
			if(this.currentRoute === '') {
				this.currentRoute = routes[0];
			}

			if(animations) {
				this.animations = animations;
			}
			initilization();
			this.go('',this.currentRoute.index);
		},
		go: function(routeName, routeIndex = null) {
			var routeObject = '';
			if(routeIndex === null) {
				routeObject = getRouteObject(routeName);
			}
			else {
				routeObject = this.routes[routeIndex];
			}
			if(routeObject !== '') {
				history.pushState(null,null,"#"+routeObject.name);
				this.currentRoute = routeObject;
			}
		},
		push: function() {
			if(this.currentRoute.index < (this.routes.length - 1)) {
				this.currentRoute = this.routes[this.currentRoute.index + 1];
				this.activeAnimaion = this.animations.push;
				this.go('', this.currentRoute.index);
			}
			else {
				console.log("can't push, no next route");
			}
		},
		pop: function() {
			if(this.currentRoute.index > 0) {
				this.activeAnimaion = this.animations.pop;
				this.currentRoute = this.routes[this.currentRoute.index - 1];
				this.go('', this.currentRoute.index);
			}
			else {
				console.log("can't pop, no more routes to pop")
			}
		}
	}
}(jQuery, Handlebars));