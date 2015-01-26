define( ["jquery","underscore","backbone",'app/FriendsCollection','app/FriendsListView', 'app/mockServer'],
    function($, _, Backbone, FriendsCollection, FriendsListView ) {
        var myFriends = new FriendsCollection,
            myFriendsView = new FriendsListView( {
                el: $("#list"),
                collection: myFriends
            });
        myFriends.fetch();
        $("#deleteSelected").click(function () {
            _.values( myFriendsView.viewsList )
                .filter(function(view) {
                    return view !== null && view.$el.hasClass('selected');
                })
                .map(function(view){
                    view.model.destroy({wait: true})
                });
        });
        $("#addItem").click(function () {
            myFriends.add({});
        });
    }
);