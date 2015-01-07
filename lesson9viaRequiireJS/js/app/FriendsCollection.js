define(["../lib/jquery", "../lib/underscore", "../lib/backbone", './FriendModel'],
    function($, _, Backbone, Friend) {
       var Friends = Backbone.Collection.extend({
           model: Friend,
           getFriendsFromServer: function (url){
               var collection = this;
               $.ajax({
                   url: url,
                   success:  function (data, status) {
                       console.log(status);
                       collection.add(data);
                   }
               });
           }
       }) ;
        return new Friends();
    }
);
