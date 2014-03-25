App.Util = Ember.Object.extend({
  transformMovieArray: function( arr, col ) {
    var result = [], temp = [];
      arr.forEach( function ( elem, i ) {
        if ( i > 0 && i % col === 0 ) {
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