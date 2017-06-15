(function($, hb) {
	initilization = function() {
		var pushState = history.pushState;
		/* route link click event */
		$('body').on('click', '.route-link', function() {
			var active_route = $(this).attr('data-route');
			history.pushState(null,null,"#"+active_route);
		});
		/* for rendering of matched route template */
		render = function(templateId, el, data) {
			var source   = $(templateId).html();
			var template = hb.compile(source);
			var html  = template(data);
			el.html(html);
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
			render(currentRoute.template,$("#route-content"),[]);
			$('body')
				.find('.route-link')
				.removeClass('active')
				.siblings('.route-link[data-route='+currentUrl + ']')
				.addClass('active');
		};
	    history.pushState = function(state) {
	        if (typeof history.onpushstate == "function") {
	            history.onpushstate({state: state});
	        }
	        // ... whatever else you want to do
	        // maybe call onhashchange e.handler
	        pushState.apply(history, arguments, onHistoryChange(arguments,false));
	    };

	    /* on reload of page regain content of current active route */
	    if(window.location.hash) {
	    	onHistoryChange(window.location.hash,true);
	    }
	};
	window.Router =  {
		routes: [],
		init: function(routes) {
			this.routes = routes;
			initilization();
		}
	}
}(jQuery, Handlebars));