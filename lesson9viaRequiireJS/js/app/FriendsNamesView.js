define(["jquery", "underscore", "backbone", 'app/FriendView'],
    function($, _, Backbone, FriendView) {
        return Backbone.View.extend({
            initialize: function () {
                var view = this;
                view.viewsList = {};
                view.collection.map( function(model) {
                    view.addItem(model);
                } );
                view.listenTo(view.collection, 'add', view.addItem);
                view.listenTo(view.collection, 'destroy remove', view.removeItem);
            },
            addItem: function (model) {
                var item = new FriendView({
                    model: model
                });
                this.$el.append(item.$el);
                this.viewsList[model.cid] = item;
            },
            removeItem: function (model) {
                this.viewsList[model.cid] = null;
            }
        })
    }
);