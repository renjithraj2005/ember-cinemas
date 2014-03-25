App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return Movies;
  },
  actions: {
    goBack: function() {
      history.back();
    }
  }
});