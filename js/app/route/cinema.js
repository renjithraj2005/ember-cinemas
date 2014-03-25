App.CinemasRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('movie').cinemas;
  }
});