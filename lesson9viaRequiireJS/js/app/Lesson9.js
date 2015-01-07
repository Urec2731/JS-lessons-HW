(function() {

    var myFriends,
        myFriendsView;
    var Controller = {};
    _.extend(Controller, Backbone.Events);
    var userId = 'id01';
    var baseUrl = 'http://localhost:8888/base/';
    function getFriendsFromServer (data, status) {
        console.log(status);
        myFriends = new FriendList(data);
        myFriendsView = new FriendNamesView({
            el: $("#list"),
            collection: myFriends,
            template: $('#list [data-class="item"]').detach()
        });
        Controller.collection = myFriends;
        Controller.listenTo(Controller.collection, 'add', Controller.addToServer);
        Controller.listenTo(Controller.collection, 'remove', Controller.removeFromServer);
        Controller.listenTo(Controller.collection, 'change', Controller.changeONServer);
    };

    $.ajax({
        url: baseUrl + userId  + '/friends',
        success:  getFriendsFromServer
    });

    $("[data-id='deleteSelected']").click(function () {
        $("#list .selected").map(function (i, target) {
            var cid = $(target).attr('data-cid');
            myFriends.remove( myFriends.get(cid) );
        })
    });
    $("[data-id='addItem']").click(function () {
        myFriends.add(new Friend);
    });

    Controller.setModelID = function (data, status, jqXHR) {
                                                                console.log('responsedata=' + data);
                                                                console.log(status);
                                                                console.log(jqXHR);
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        if (typeof data === 'string') {
            return
        }
        myFriends.findWhere({cid: data.cid}).set({id: data.id}, {silent: true});
        console.dir(myFriends.get(data.id));
    };
    Controller.addToServer = function (model) {
        model.attributes.cid = model.cid;
        var data = JSON.stringify( model );
        data = encodeURIComponent(data);
                                                                   console.log(data);
        $.ajax({
            url: baseUrl + userId  + '/friends',
            type: "POST",
            data: data,
            beforeSend: function( jqXHR, settings ) {
                                                                    console.log('request');
                                                                        console.dir(jqXHR);
            }
        }).done(Controller.setModelID);
    };
    Controller.changeResponseHandler = function (data, status, jqXHR) {
                                                                console.log('responsedata=' + data);
                                                                console.log(status);
                                                                console.log(jqXHR);};
    Controller.changeONServer = function (model) {
                                                                   console.log(model.id);
        var data = JSON.stringify( model );
        data = encodeURIComponent(data);
                                                                   console.log(data);
        $.ajax({
            url: baseUrl + userId  + '/friends/' + model.id,
            type: "PUT",
            data: data,
            beforeSend: function( jqXHR, settings ) {
                                                                    console.log('request');
                                                                        console.dir(jqXHR);
            }
        }).done(Controller.changeResponseHandler);
    };
    Controller.removeResponseHandler = function (data, status, jqXHR) {
                                                                console.log('responsedata=' + data);
                                                                console.log(status);
                                                                console.log(jqXHR);
    };
    Controller.removeFromServer = function (model) {
                                                            console.log(model.id);
        $.ajax({
            url: baseUrl + userId  + '/friends/' + model.id,
            type: "DELETE",
            beforeSend: function( jqXHR, settings ) {
                                                                    console.log('request');
                                                                    console.dir(jqXHR);
            }
        }).done(Controller.removeResponseHandler);};

})();
