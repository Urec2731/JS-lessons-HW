(function() {
    var Friend = Backbone.Model.extend({
        defaults: {
            name: "",
            age: 0
        }
    });
    var FriendList = Backbone.Collection.extend({
        model: Friend
    });
    var FriendNamesView = Backbone.View.extend({
        initialize: function () {
            var view = this;
            view.collection.map(function (model) {
                view.addItem(model);
            });
            view.listenTo(view.collection, 'change:name', view.refreshName);
            view.listenTo(view.collection, 'remove', view.removeItem);
            view.listenTo(view.collection, 'add', view.addItem);
            view.listenTo(view.collection, 'reset', view.resetList);
        },
        events: {
            "click": function (event) {
                $(event.target).toggleClass("selected");
            },
            "click [data-class='deleteItem']": function (event) {
                var target = $(event.target);
                var cid = target.closest('[data-class="item"]').attr('data-cid');
                this.collection.remove( this.collection.get(cid) );
            },
            "click input": function (event) {
                event.stopPropagation()
            },
            "blur input": function (event) {
                var target = $(event.target);
                var cid = target.closest('[data-class="item"]').attr('data-cid');
                var model = this.collection.get(cid);
                if (model.get('name') !== target.val()) {
                    model.set( {name: target.val()} );
                }
            }
        },
        refreshName: function (model, value) {
            var selector = '[data-cid=' + model.cid + ']';
            this.$(selector).find('[data-class="nameInput"]').val(value);
            console.log(this.collection.map(function(m) {return m.cid}));
        },
        removeItem: function (model) {
            var selector = '[data-cid=' + model.cid + ']';
            this.$(selector).remove();
            console.log(this.collection.map(function(m) {return m.cid}));
        },
        addItem: function (model) {
            var compiled = this.options.template.clone()
                .attr('data-cid', model.cid)
                .find('[data-class="nameInput"]')
                .val(model.get('name'))
                .end();
            this.$el.append(compiled);
            console.log(this.collection.map(function(c) {return c.cid}));
            console.dir(model);
        },
        resetList: function () {
            this.$el.empty();
            this.initialize();
        }
    });
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
