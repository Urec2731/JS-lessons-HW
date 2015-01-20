define(["backbone", 'app/FriendModel'],
    function(Backbone, FriendModel ) {
        return Backbone.Collection.extend({
            model: FriendModel
        });
    }
);
