App = Ember.Application.create();

App.Router.map(function() {
  this.resource('movie', {path: "/movie/:movie_id"}, function() {
    this.resource('cinemas', function() {
      this.resource('timings', {path: '/:cinema_id/timings'});
    });
  });
  this.route('trailer', {path: '/movie/:movie_id/trailer'});
});