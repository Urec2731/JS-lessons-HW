define(["jquery", "underscore", "backbone"],
    function($, _, Backbone ) {
        var template = $('#list [data-item]').detach();
        return Backbone.View.extend({
            initialize: function () {
                var view = this;
                view.setElement( template.clone() );
                view.$name = view.$( '[data-nameInput]' );
                view.$name.val( view.model.get('name') );
                view.$delete = view.$( '[data-deleteItem]' );
                view.listenTo(view.model, 'change:name', view.refreshName);
                view.listenTo(view.model, 'destroy remove', view.removeItem);
                view.$el.click(function(){
                    view.$el.toggleClass("selected");
                });
                view.$name.click(function(event) {
                    event.stopPropagation();
                });
                view.$name.blur( function () {
                    if (view.model.get('name') !== view.$name.val()) {
                        view.model.set('name', view.$name.val() );
                    }
                });
                view.$delete.click(function(){
                    view.model.destroy();
                });
            },
            refreshName: function () {
                this.$name.val( this.model.get('name') );
            },
            removeItem: function () {
                this.remove();
            }
        });
    }
);
