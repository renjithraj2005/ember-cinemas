App.TimingsRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('cinemas')[params.cinema_id];
  }
});