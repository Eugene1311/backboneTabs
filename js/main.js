$(function() {
	var App = {
		Models: {},
		Views: {},
		Collections: {}
	};
	App.Models.Tab = Backbone.Model.extend({});
	App.Collections.Tabs = Backbone.Collection.extend({
		model: App.Models.Tab
	});
	App.Views.TabsView = Backbone.View.extend({
		el: 'div#out',
		template: '#tabsTemplate',
		initialize: function() {
			this.render();
		},
		render: function() {
			var data = this.collection.toJSON();
			var tpl = _.template( $(this.template).html(), {tabs: data} );
			this.$el.html( tpl );
			return this;
		},
		events: {
			'click li' : 'makeActive',
			'mouseover li' : 'onhoverActive',
			'mouseleave li': 'removeActive'
		},
		makeActive: function(e) {
			$('.nav li').each(function() {
				$(this).removeClass('active');
			});
			var target = e.target;
			var id = $(target).text().toLowerCase();
			$(target).parent().addClass('active');
			this.$el.find('div').removeClass('active');
			this.$el.find('div#' + id + '').addClass('active');
		},
		onhoverActive: function(e) {
			var target = e.target;
			if(target.tagName === 'A') {
				var id = $(target).text().toLowerCase();
				this.$el.find('div').removeClass('active');
				$('div#' + id + '').addClass('active');
			}
		},
		removeActive: function() {
			var id = $('li.active').find('a').attr('href').slice(1);
			this.$el.find('div').removeClass('active');
			$('div#' + id + '').addClass('active');
		}
	});
	App.Router = Backbone.Router.extend({
		routes: {
			'' : 'index',
			'*tab' : 'default'
		},
		index: function() {
			$('.nav li').first().addClass('active');
			var id = $('.nav li a').first().text().toLowerCase();
			$('#' + id + '').addClass('active');
		},
		default: function(tab) {
			var hashtag = "#" + tab;
			var tab = tab.charAt(0).toUpperCase() + tab.slice(1);
			$('#out div').removeClass('active');
			
			$(hashtag).addClass('active');
			$('.nav li').removeClass('active');
			$('.nav li a').filter(function() {
								return $(this).text() === tab;
							})
							.parent()
							.addClass('active');
		}
	});
	
	var tabs = new App.Collections.Tabs([
	      {caption: "Home", id: "home", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis vehicula turpis."},
	      {caption: "Profile", id: "profile", content: "Quisque tellus metus, iaculis non erat id, luctus fringilla sem. Quisque lectus neque, dignissim at semper at, lacinia vel lacus."},
	      {caption: "Messages", id: "messages", content: "Aenean commodo justo sed laoreet efficitur. Aenean eleifend malesuada condimentum."},
	      {caption: "New", id: "new", content: "Dolorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis vehicula turpis."}
	    ]);
	var tabsView = new App.Views.TabsView({collection: tabs});
	var router = new App.Router();
	Backbone.history.start();
});