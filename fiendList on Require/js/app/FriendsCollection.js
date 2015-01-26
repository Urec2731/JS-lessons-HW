define(["backbone", 'app/FriendModel'],
    function(Backbone, FriendModel ) {
        return Backbone.Collection.extend({
            initialize: function () {
                this.on('add', function(model) {
                    if (!model.id) {
                        model.save(model.attributes, {wait: true});
                    };
                }, this);
            },
            model: FriendModel,
            url: '/api/friends'
        });
    }
);
