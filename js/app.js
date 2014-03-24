App = Ember.Application.create();

App.Util = Ember.Object.extend({
  transformMovieArray: function( arr ) {
    var result = [], temp = [];
      arr.forEach( function ( elem, i ) {
        if ( i > 0 && i % 2 === 0 ) {
          result.push( temp );
          temp = [];
        }
      temp.push( elem );
    });
    if ( temp.length > 0 ) {
      result.push( temp );
    }
    return result;
  }
}).create();

//Movie Model
var Cinemas = [{
  name: 'PVR Cinemas',
  id: 0,
  timings: ['8:30 AM', '2 PM', '7 PM']
},{
  name: 'Cinemax',
  id: 1,
  timings: ['9:30 AM', '2 PM', '8 PM', '10:30 PM']
},{
  name: 'Q Cinemas',
  id: 2,
  timings: ['10:30 AM', '4 PM', '9 PM']
}];

var Movies = [{
  id:1,
  title: '388 Arletta Avenue',
  certification: 'TBA',
  poster: 'assets/images/1.jpg',
  description: 'A young couple find themselves in an unnerving situation with a mysterious stalker.',
  cinemas: Cinemas
},{
  id:2,
  title: '47 Ronin',
  certification: '15+',
  poster: 'assets/images/2.jpg',
  description: 'A band of samurai set out to avenge the death and dishonor of their master at the hands of a ruthless shogun.',
  cinemas: Cinemas
},{
  id:3,
  title: 'Blood Of Redemption',
  certification: '15+',
  poster: 'assets/images/3.jpg',
  description: 'Quinn Forte had it all: power, money, a brother who idolized him, and a woman who loved him.',
  cinemas: Cinemas
},{
  id:4,
  title: 'Dhoom 3',
  certification: 'PG13',
  poster: 'assets/images/4.jpg',
  description: 'To avenge his father\'s death, a circus entertainer trained in magic and acrobatics turns thief to take down a corrupt bank in Chicago.',
  cinemas: Cinemas
},{
  id:5,
  title: 'Frozen',
  certification: 'G',
  poster: 'assets/images/5.jpg',
  description: 'Fearless optimist Anna teams up with Kristoff in an epic journey, encountering Everest-like conditions, and a hilarious snowman named Olaf in a race to find Anna\'s sister Elsa, whose icy powers have trapped the kingdom in eternal winter.',
  cinemas: Cinemas
},{
  id:6,
  title: 'Hobbit',
  certification: 'PG13',
  poster: 'assets/images/6.jpg',
  description: 'The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug.',
  cinemas: Cinemas
}];

App.Router.map(function() {
  this.resource('movie', {path: "/:movie_id"}, function() {
    this.resource('cinemas', function() {
      this.route('timings', { path: ':cinema_id'});  
    });
  });
});

App.ExtTextField = Em.TextField.extend({
    keyUp: function(){
      this.sendAction('targetAction', this.get('value'));   
    }
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    console.info('ApplicationRoute');
    return Movies;
  },
  actions: {
    goBack: function() {
      history.back();
    }
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    console.info('IndexRoute');
    return this.modelFor('application');
  },
  setupController: function(controller, model) {
    controller.set('data', model);
    controller.set('model', App.Util.transformMovieArray(model));
  },
  activate: function() {
    this.controllerFor('application').set('isHidden', true);
  },
  deactivate: function() {
    this.controllerFor('application').set('isHidden', false);
  }
});


App.MovieRoute = Ember.Route.extend({
  model: function(params) {
    console.info('MovieRoute');
    return this.modelFor('application')[arguments[0].movie_id - 1];
  }
});

App.CinemasRoute = Ember.Route.extend({
  model: function(params) {
    console.info('CinemasRoute');
    return this.modelFor('movie').cinemas;
  }
});

App.CinemasTimingsRoute = Ember.Route.extend({
  model: function(params) {
    console.info('CinemasTimingsRoute');
    return this.modelFor('cinemas')[params.cinema_id].timings;
  }
});

App.IndexController = Ember.ArrayController.extend({
  searchText: '',
  //actions: {
  //  searchMovie: function(value) {console.info('search');
  //    var result = this.get('data').filter(function(movie){
  //      return movie.title.search(new RegExp(value,'i')) >= 0;
  //      //return movie.title.search(new RegExp(this.get('searchText'),'i')) >= 0;
  //    }.bind(this));
  //    this.set('model', App.Util.transformMovieArray(result));
  //  },
  //  testAction: function(value){
  //       alert(value);   
  //      }
  //},
    searchMovie: function() {
      var result = this.get('data').filter(function(movie){
        return movie.title.search(new RegExp(this.get('searchText'),'i')) >= 0;
      }.bind(this));
      this.set('model', App.Util.transformMovieArray(result));
    }.observes('searchText')
});