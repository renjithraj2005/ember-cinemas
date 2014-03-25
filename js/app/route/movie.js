App.MovieRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('application')[arguments[0].movie_id - 1];
  }
});