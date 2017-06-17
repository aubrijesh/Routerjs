(function($, hb) {
	initilization = function() {
		var pushState = history.pushState;

		/* route link click event */
		$('body').on('click', '.route-link', function() {
			var active_route = $(this).attr('data-route');
			Router.go(active_route);
		});

		/* for rendering of matched route template */
		render = function(templateId, el, data) {
			var source   = $(templateId).html();
			var template = hb.compile(source);
			var html  = template(data);
			var slider = document.getElementsByClassName('slider')[0];
			if(slider.classList.length > 1) {
				slider.innerHTML = "";
				slider.classList = ['slider'];
				setTimeout(function(){ 
					slider.innerHTML = html;
					if (slider.classList)
					  slider.classList.add("route-slider","slide-left");
					else
					  slider.className += ' ' + "route-slider slide-left";
				}, 100);
			}
			else {
				slider.innerHTML = html;
				if (slider.classList)
				  slider.classList.add("slide-left");
				else
				  slider.className += ' ' + "slide-left";
			}
			
		}

		/* 
			on history change callback 
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
	    	Router.currentRoute = getRouteObject(window.location.hash.replace("#",''))
	    }
	};
	getRouteObject = function(routeName) {
		var obj = '';
		for(let i=0;i<Router.routes.length; i++) {
			if(Router.routes[i].name === routeName) {
				obj = Router.routes[i];
			}
		}
		return obj;
	};
	window.Router =  {
		routes: [],
		currentRoute: '',
		animation: '',
		init: function(routes, routeAnimation='slide-left') {
			this.routes = routes.map(function(obj, index) { obj['index'] = index ; return obj });
			this.currentRoute = routes[0],
			this.animation = routeAnimation;
			initilization();
			this.go('',0);
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
				this.go('', this.currentRoute.index);
			}
			else {
				console.log("can't push, no next route");
			}
		},
		pop: function() {
			if(this.currentRoute.index > 0) {
				this.go('', this.currentRoute.index - 1);
			}
			else {
				console.log("can't pop, no more routes to pop")
			}
		}
	}
}(jQuery, Handlebars));