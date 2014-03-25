App.IndexController = Ember.ArrayController.extend({
  searchText: '',
  columnWeight: function() {
    if(this.get('columns') === 6) {
      return 'column-12';
    } else  if(this.get('columns') === 3) {
      return 'column-25';
    } else {
      return 'column-50';
    }
  }.property('columns'),
  displayModel: function() {
    return App.Util.transformMovieArray(this.get('model'), this.get('columns'));
  }.property('model', 'columns'),
  searchMovie: function() {
    var result = this.get('model').filter(function(movie){
      return movie.title.search(new RegExp(this.get('searchText'),'i')) >= 0;
    }.bind(this));
    this.set('displayModel', App.Util.transformMovieArray(result));
  }.observes('searchText')
});