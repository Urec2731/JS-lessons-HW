define( ["jquery","underscore","backbone",'app/FriendsCollection','FriendsListView'],
    function($, _, Backbone, FriendsCollection, FriendsListView ) {
        var myFriends = new FriendsCollection([]),
            myFriendsView = new FriendsListView( {
                el: $("#list"),
                collection: myFriends
            });
        require(['app/responseFromServerImitation'],
            function(response) {
                myFriends.set(response);
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