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
				var $routes = document.getElementsByClassName('routes-list')[0];
				newElmement.classList = ['route-slider'];
				// newElmement.setAttribute('data-route-index',i);
				// newElmement.style.zIndex = (routerLen - i);
				$routes.appendChild(newElmement);
			}
		};
		createElements();
		whichTransitionEvent = function(){
		  var t,
		      el = document.createElement("fakeelement");

		  var transitions = {
		    "transition"      : "transitionend",
		    "OTransition"     : "oTransitionEnd",
		    "MozTransition"   : "transitionend",
		    "WebkitTransition": "webkitTransitionEnd"
		  }

		  for (t in transitions){
		    if (el.style[t] !== undefined){
		      return transitions[t];
		    }
		  }
		};

		/* 
			Added By: Brijesh Kumar
			Date: 17/05/2017
			Descriptio: For rendering template using hanlderbar templating system
		*/

		render = function(templateId, el, data) {
			var allSlider = document.getElementsByClassName('route-slider slide');
			var moveToSlider = document.getElementsByClassName('route-slider')[Router.routeTo.index];
			var currentSlider = document.getElementsByClassName('route-slider')[Router.currentRoute.index];
			
			var previousRouteIndex = -1;
			var nextRouteIndex = -1;
			
			if(Router.routeTo.index > 0)
			{
				previousRouteIndex = (Router.routeTo.index - 1)
			}

			if(Router.routeTo.index < (Router.routes.length - 1))  {
				nextRouteIndex = (Router.routeTo.index + 1)
			}


			if(!Router.activeAnimaion) {
				Router.activeAnimaion = Router.animations.push;
			}
			moveToSlider.innerHTML = "";


			if(Router.currentOperation === "pop") {
				$(currentSlider).addClass(Router.activeAnimaion);
			}
			else {
				$(moveToSlider).addClass(Router.activeAnimaion);
			}

			
			if(Router.beforeLoadAnimation) {
				Router.showLoader();
			}
			/* without timeout animation will not be bind */

			var source   = $(templateId).html();
			var template = hb.compile(source);
			var html  = template(data);
			moveToSlider.innerHTML = html;

			if(Router.beforeLoadAnimation) {
				Router.hideLoader();
			}

			setTimeout(function() {
				if(Router.currentOperation === "pop") {
					$(currentSlider)
						.removeClass("current-slider")
						.addClass("slide");

					$(currentSlider).one(whichTransitionEvent(),
						function(event) {
					    if(nextRouteIndex > -1) {
							$(moveToSlider)
								.next()
								.attr("class", "route-slider next-slider")
								.nextAll()
								.attr('class','route-slider');
						}
						if(previousRouteIndex > -1)
						{
							$(moveToSlider)
								.prev()
								.attr("class", "route-slider prev-slider")
								.prevAll()
								.attr('class','route-slider');
						}
						$(moveToSlider)
							.attr("class", "route-slider current-slider");
					});
				} else {
					$(moveToSlider)
							.prev()
							.addClass("prev-animation");
							
					$(moveToSlider)
						.removeClass("next-slider")
						.addClass("slide");

					$(moveToSlider).one(whichTransitionEvent(),
						function(event) {
						if(nextRouteIndex > -1) {
							$(moveToSlider)
								.next()
								.attr("class", "route-slider next-slider")
								.nextAll()
								.attr('class','route-slider');
						}
						if(previousRouteIndex > -1)
						{
							$(moveToSlider)
								.removeClass("prev-slider")
								.prev()
								.attr("class", "route-slider prev-slider")
								.prevAll()
								.attr('class','route-slider');
						}

						$(moveToSlider)
							.attr("class", "route-slider current-slider");
					});
				}

			},200);
		}

		/* 
			Added By: Brijesh Kumar
			Date: 17/05/2017
			Description: on history change callback , onHistoryChange will called when hash value changes
			arguments: arguments (hash arguments, isReload)
		*/

		// onHistoryChange = function(arguments, isReload) {
		// 	console.log(arguments);
		// 	if(isReload) {
		// 		var currentUrl = arguments.replace("#",'');
		// 	}
		// 	else {
		// 		var currentUrl = arguments[2].replace("#",'');
		// 	}
		// 	var currentRoute = Router.routes.filter(function(route, index){
		// 		return route.name === currentUrl;
		// 	})[0];
			
		// 	$('body')
		// 		.find('.route-link')
		// 		.removeClass('active')
		// 		.siblings('.route-link[data-route='+currentUrl + ']')
		// 		.addClass('active');
		// 	render(currentRoute.template,$("#route-content"),[]);
		// };
		
	 //    history.pushState = function(state) {
	 //        if (typeof history.onpushstate == "function") {
	 //            history.onpushstate({state: state});
	 //        }
	 //        pushState.apply(history, arguments, onHistoryChange(arguments,false));
	 //    };

	 //    /* on reload of page regain content of current active route */
	 //    if(window.location.hash) {
	 //    	onHistoryChange(window.location.hash,true);
	 //    	Router.currentRoute = getRouteObject(window.location.hash.replace("#",''));
	 //    }
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
		routeTo: '',
		currentOperation: '',
		activeAnimaion: '',
		beforeLoadAnimation: true,
		animations: {
			push: 'slide-from-left',
			pop: 'slide-from-right'
		},
		showLoader: function() {
			/* for giving functionality to user for showing his loader,
			he can do any stuff for showing loader */
		},
		hideLoader: function() {
			/* for giving functionality to user for hiding his loader,
			he can do any stuff for hiding loader */
		},
		init: function(configuration) {
			this.routes = configuration.routes.map(function(obj, index) { obj['index'] = index ; return obj });
			if(this.currentRoute === '') {
				this.currentRoute = configuration.routes[0];
				this.routeTo = configuration.routes[0];
			}
			if(configuration.animations) {
				this.animations = configuration.animations;
			}
			if(configuration.showLoader) {
				this.showLoader = configuration.showLoader;
			}
			if(configuration.hideLoader) {
				this.hideLoader = configuration.hideLoader;
			}
			initilization();
			this.go('',this.currentRoute.index, this.routeTo.index);
		},
		go: function(routeName, currentRouteIndex, routeToIndex) {
			var routeObject = '';
			var templateData = this.routeTo.data();
			if(this.currentOperation == "") {
				this.currentOperation = "push";
			}
			if(routeToIndex === null) {
				routeObject = getRouteObject(routeName);
			}
			else {
				routeObject = this.routes[routeToIndex];
			}

			render(this.routeTo.template,$("#route-content"),templateData);
			this.currentRoute = this.routeTo;
			// if(routeObject !== '') {
			// 	history.pushState(null,null,"#"+routeObject.name);
			// }
		},
		push: function() {
			var currentRouteIndex = $(".route-slider.current-slider").index();
			var routeToIndex = $(".route-slider.next-slider").index();

			this.currentRoute = this.routes[currentRouteIndex];
			this.routeTo = this.routes[routeToIndex];

			if(this.currentRoute.index < (this.routes.length - 1)) {
				this.routeTo = this.routes[this.currentRoute.index + 1];
				this.activeAnimaion = this.animations.push;
				this.currentOperation = "push";
				this.go('', this.currentRoute.index, this.routeTo.index);
			}
			else {
				console.log("can't push, no next route");
			}
		},
		pop: function() {
			if(this.currentRoute.index > 0) {
				this.activeAnimaion = this.animations.pop;
				this.routeTo = this.routes[this.currentRoute.index - 1];
				this.currentOperation = "pop";
				this.go('',this.currentRoute.index, this.routeTo.index);
			}
			else {
				console.log("can't pop, no more routes to pop")
			}
		}
	}
}(jQuery, Handlebars));