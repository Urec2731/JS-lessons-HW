requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});
require( ["jquery", "underscore", "backbone", 'app/FriendsCollection', 'app/FriendsNamesView'],
    function($, _, Backbone, Friends, FriendsView) {
        var myFriends = new Friends({});
        var userId = 'id01';
        var ajaxbaseUrl = 'http://localhost:8888/base/';
        var modelUrl = ajaxbaseUrl + userId  + '/friends';
        myFriends.getFriendsFromServer(modelUrl);
        var Controller = {};
        _.extend(Controller, Backbone.Events);
        Controller.collection = myFriends;
        Controller.listenTo(Controller.collection, 'add', Controller.addToServer);
        Controller.listenTo(Controller.collection, 'remove', Controller.removeFromServer);
        Controller.listenTo(Controller.collection, 'change', Controller.changeONServer);
        var myFriendsView = new FriendsView({
            el: $("#list"),
            collection: myFriends,
            template: $('#list [data-class="item"]').detach()
        });
/*        function getFriendsFromServer (data, status) {
                                                                             console.log(status);
            myFriends = new Friends(data);
            myFriendsView = new FriendsView({
                el: $("#list"),
                collection: myFriends,
                template: $('#list [data-class="item"]').detach()
            });

        };
        */
    }
);