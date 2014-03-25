App.TimingsSelectionView = Ember.View.extend({
  click: function(e) {
    if($(e.target).is("button")) {
      this.$('button').removeClass('active');
      $(e.target).addClass('active');
    }
  }
});