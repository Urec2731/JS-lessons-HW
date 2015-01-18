requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});
require( ["jquery", "underscore", "backbone"],
    function($, _, Backbone ) {
        var FriendsCollection = require(['app/FriendsCollection']);
        var responseFromServerImitation = require(['app/responseFromServerImitation']);
        var friendTemplate = $('#list [data-item]').detach();  //fixme добавить в инит вьюхи
        var FriendView = require(['app/FriendView']);
        var myFriends = new FriendList(myFriendsFromServer);
        myFriendsView = new FriendsListView( {
            el: $("#list"),
            collection: myFriends
        });

        $("#deleteSelected").click(function () {
            _.values( myFriendsView.viewsList )
                .filter(function(view) {
                    return view !== null && view.$el.hasClass('selected');
                })
                .map(function(view){
                    view.model.destroy()
                });
        });
        $("#addItem").click(function () {
            myFriends.add({});
        });
        template
    }
);