define(["../lib/jquery", "../lib/underscore", "../lib/backbone", './FriendModel'],
    function($, _, Backbone, Friend) {
       var Friends = Backbone.Collection.extend({
           model: Friend
       }) ;
        $.ajax({
            url: modelurl,
            success:  function (data, status) {
                                             console.log(status);
                    collection = new Friends(data);
                }
            });

    }
);
