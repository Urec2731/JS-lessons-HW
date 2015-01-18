requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});
require( [
        "jquery",
        "underscore",
        "backbone",
        'app/FriendsCollection',
        'app/responseFromServerImitation',
        'app/FriendView'
    ],
    function($, _, Backbone, FriendList, myFriendsFromServer, FriendsListView ) {
        var myFriends = new FriendList(myFriendsFromServer),
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
    }
);