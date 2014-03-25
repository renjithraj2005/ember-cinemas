App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('application');
  },
  activate: function() {
    this.controllerFor('application').set('isHidden', true);
    
    var controller = this.controllerFor('index');
    enquire.register(" screen and (min-width : 320px) and (max-width : 568px)", function() {
      //For Phone
      controller.set('columns',2);
    }.bind(this)).register("screen and (min-width : 568px) and (max-width : 1024px)", function() { 
      //For Tablet
      controller.set('columns',3);
    }).register(" screen and (min-width : 1025px)", function() {
      //For Desktop
      controller.set('columns',6);
    });
  },
  deactivate: function() {
    this.controllerFor('application').set('isHidden', false);
  }
});