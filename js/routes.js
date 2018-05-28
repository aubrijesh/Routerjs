(function($, hb) {
	initilization = function() {
		var pushState = history.pushState;

		/* 
			Added By: Brijesh Kumar
			Date: 17/05/2017
			Description: For creating route-containers for each route 
			where route template will be rendered
		*/
		Array.prototype.diff = function(a) {
		    return this.filter(function(i) {return a.indexOf(i) < 0;});
		};
		getRouteSlideByIndex = function(index) {
			return document.getElementsByClassName('route-slider')[index];
		};
		renderRouteData = function(el, templateId, data) {
			var source   = $(templateId).html();
			var template = hb.compile(source);
			var html  = template(data);
			$(el).html(html);
		};
		$.fn.removeClassExceptThese = function(classList) {
			var $elem = $(this);
			if($elem.length > 0) {
				$elem.each(function(index, currentElem) {
					var existingClassList = $(currentElem).attr("class").split(' ');
					var classListToRemove = existingClassList.diff(classList);
					$(currentElem)
						.removeClass(classListToRemove.join(" "))
						.addClass(classList.join(" "));
				});
			}
			return $elem;
		};
		createElements = function() {
			var routeListHtml = "";
			var routeList = document.getElementsByClassName('routes-list')[0];
			for(var i=0;i<Router.routes.length; i++) {
				var divparent = document.createElement('div');
				var divcontainer = document.createElement('div');
				divcontainer.className = "route-slider-container";
				divparent.className = 'route-slider';
				divparent.appendChild(divcontainer);
				routeList.appendChild(divparent);
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

		render = function(templateElement, el, data) {

			var moveToSlider = getRouteSlideByIndex(Router.routeTo.index);
			var currentSlider = getRouteSlideByIndex(Router.currentRoute.index);
			var moveToSliderContainer = moveToSlider.getElementsByClassName('route-slider-container');
			
			Router.activeAnimaion = Router.activeAnimaion || Router.animations.push;
			
			if(Router.currentOperation === "pop") {
				$(currentSlider)
					.addClass(Router.activeAnimaion);

				$(moveToSlider)
					.addClass("prev-slider")
					.siblings(".prev-slider")
					.removeClass("prev-slider");  // to make visible before slider start of prev page
			}
			else {
				$(moveToSlider).addClass(Router.activeAnimaion);

			}

			if(Router.beforeLoadAnimation) {
				Router.showLoader();
			}

			if(Router.currentRoute.autoRender) {
				if(!Router.currentRoute.renderAlways || !moveToSliderContainer.innerHTML) {
					if(!moveToSliderContainer.innerHTML) {
						renderRouteData($(moveToSliderContainer), templateElement, data);
					}
				}
			}
			else {
				Router.currentRoute.render($(moveToSliderContainer), $(templateElement), data);
			}
			
			if(Router.beforeLoadAnimation) {
				Router.hideLoader();
			}

			setTimeout(function() {
				var $moveToSliderPrev = $(moveToSlider).prev();
				var $moveToSliderNext = $(moveToSlider).next();

				if(Router.currentOperation === "pop") {
					
					$(currentSlider)
						.addClass("animating");

					$(currentSlider)
						.removeClass("current-slider")
						.addClass("slide");

					$(currentSlider).one(whichTransitionEvent(),
						function(event) {
							afterAnimationEnd($(currentSlider));					
					});
				} else {
			
					$moveToSliderPrev
						.addClass("prev-animation");

					$(moveToSlider)
						.addClass("animating");

					$(moveToSlider)
						.removeClass("next-slider")
						.addClass("slide");

					$(moveToSlider).one(whichTransitionEvent(),
						function(event) {
						afterAnimationEnd($(moveToSlider));
					});
				}

				function afterAnimationEnd($actingElement) {
					$actingElement.removeClass("animating");

					$moveToSliderNext
						.removeClassExceptThese(["route-slider","next-slider"])
						.nextAll()
						.removeClassExceptThese(["route-slider"]);
					
					$moveToSliderPrev
						.removeClassExceptThese(["route-slider","prev-slider"])
						.prevAll()
						.removeClassExceptThese(["route-slider"]);

					$(moveToSlider)
						.removeClassExceptThese(["route-slider","current-slider"]);
				}
			},0);
		},
		updateTemplate = function() {
			var currentSliderContainer = getRouteSlideByIndex(Router.currentRoute.index).getElementsByClassName('route-slider-container');
			renderRouteData($(currentSliderContainer),Router.currentRoute.template,Router.currentRoute.data);
		}
	};

	/*  
		added By: Brijesh Kumar
		Date: 17/05/2017
		Description: for getting route object using routeName
	*/

	getRouteObject = function(routeName) {
		var obj = '';
		for(var i=0; i<Router.routes.length; i++) {
			if(Router.routes[i].name === routeName) {
				obj = Router.routes[i];
			}
		}
		return obj;
	};

	bindEvents = function(eventObject, bindToObject) {
		for(key in eventObject) {
			var keySplit = key.split(",");
			var target = keySplit[1].trim();
			var event = keySplit[0].trim();
			var fun = eventObject[key];
			var bindFun = "";
			if(typeof fun === 'string') {
				fun = eventObject[i].methods[fun];
			}
			bindFun = fun.bind(bindToObject);
			$('body').on(event,target,bindFun);
		}
	};
	
	bindMethods = function(methodObject, bindToObject) {
		for(key in methodObject) {
			methodObject[key] = methodObject[key].bind(bindToObject);
		}
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
			var self = this;
			this.routes = configuration.routes.map(function(obj, index) {
				obj['index'] = index ; 
				obj["update"] = self.update;
				obj.data["parent_data"] = configuration.data || {};
				obj["parent"] = self;
				if(obj["autoRender"] === undefined) {
					obj["autoRender"] = true;
				}
				return obj 
			});
			
			/* bind events */
			this.events = configuration.events || {};
			this.methods = configuration.methods || {};
			this.data = configuration.data || {};

			if(this.currentRoute === '') {
				this.currentRoute = configuration.routes[0];
				this.routeTo = configuration.routes[0];
			}
			console.log("after route initilization", this);
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

			/*bind methods of router */

			if(configuration.methods) {
				bindMethods(configuration.methods, this);
			}

			/* bind events of router*/
			
			if(configuration.events) {
				bindEvents(configuration.events, this);
			}

			/* bind methods of routes*/
			for(var i=0;i<this.routes.length; i++) {
				var cRoute = this.routes[i];
				if(cRoute.methods) {
					bindMethods(cRoute.methods, cRoute);
				}
			}
			this.go(this.routeTo.index);
			for(var i=0;i<this.routes.length; i++) {
				if(this.routes[i].events) {
					bindEvents(this.routes[i].events, this.routes[i]);
				}
				if(this.routes[i].beforeRender) {
					this.routes[i].beforeRender.bind(this.routes[i]);
				}
				if(this.routes[i].afterRender) {
					this.routes[i].afterRender.bind(this.routes[i]);
				}

			}
		},
		go: function(routeToIndex) {
			var currentRouteIndex = $(".route-slider.current-slider").index();
			if((routeToIndex != currentRouteIndex) && (routeToIndex < this.routes.length) && (routeToIndex > -1) ) {
				this.routeTo = this.routes[routeToIndex];
			    if (currentRouteIndex < routeToIndex) {
					this.activeAnimaion = this.animations.push;
					this.currentOperation = "push";
			    }
			    else if(currentRouteIndex > routeToIndex) {
					this.activeAnimaion = this.animations.pop;
					this.currentOperation = "pop";
			    }
				if(this.routeTo.beforeRender) {
					this.routeTo.beforeRender();
				}
				render(this.routeTo.template,$("#route-content"),this.routeTo.data);
				if(this.routeTo.afterRender) {
					this.routeTo.afterRender();
				}
				this.currentRoute = this.routeTo;
			}
			else if (routeToIndex == currentRouteIndex) {
				console.log("you are in same route");
			}
			else {
				console.log("invalid router router to index");
			}
			
		},
		push: function() {
			var currentRouteIndex = $(".route-slider.current-slider").index();
			var routeToIndex = $(".route-slider.next-slider").index();
			this.go(routeToIndex);
		},
		pop: function() {
			if(this.currentRoute.index > 0) {
				var routeToIndex = this.currentRoute.index - 1;
				this.go(routeToIndex);
			}
			else {
				console.log("can't pop, no more routes to pop")
			}
		},
		update: function() {
			updateTemplate();
		}
	}
}(jQuery, Handlebars));