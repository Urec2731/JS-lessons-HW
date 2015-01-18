define(["jquery", "underscore", "backbone"],
    function($, _, Backbone ) {
        return Backbone.Collection.extend({
           model: require(['app/FriendModel'])
        });
    }
);
