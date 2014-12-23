(function() {
    $.ajaxSetup( {
        url: 'http://localhost:8888/getFriendList'
    } );
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
            this.listenTo(this.collection, 'change:name', this.refreshName);
            this.listenTo(this.collection, 'remove', this.removeItem);
            this.listenTo(this.collection, 'add', this.addItem);
            this.listenTo(this.collection, 'reset', this.resetList);
            view = null;
        },
        events: {
            "click": function (event) {
                $(event.target).toggleClass("selected");
            },
            "click [data-class='deleteItem']": function (event) {
                var target = $(event.target);
                var cid = target.closest('[data-class="item"]').attr('data-cid');
                this.collection.remove( this.collection.get(cid) );
                target = cid = null;
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
                target = cid = model = null;
            }
        },
        refreshName: function (model, value) {
            var selector = '[data-cid=' + model.cid + ']';
            this.$(selector).find('[data-class="nameInput"]').val(value);
            console.log(this.collection.pluck("name"));
        },
        removeItem: function (model) {
            var selector = '[data-cid=' + model.cid + ']';
            this.$(selector).remove();
            console.log(this.collection.pluck("name"));
        },
        addItem: function (model) {
            var compiled = this.options.template.clone()
                .attr('data-cid', model.cid)
                .find('[data-class="nameInput"]')
                .val(model.get('name'))
                .end();
            this.$el.append(compiled);
            compiled = null;
            console.log(this.collection.pluck("name"));
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
    var userid = 'id01';
    function getFriendsFromServer (data) {
        myFriends = new FriendList(data.friends);
        myFriendsView = new FriendNamesView({
            el: $("#list"),
            collection: myFriends,
            template: $('#list [data-class="item"]').detach()
        });
        Controller.collection = myFriends;
        Controller.listenTo(Controller.collection, 'add remove change:name', Controller.synchronizeModel);
    };

    $.ajax({
            data: {
                userid: userid
            },
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

    function setModelID (data) {
        console.log('responsedata=' + data)
        myFriends.findWhere({cid: data.cid}).set({id: data.id}, {silent: true});
    };
    Controller.synchronizeModel = function (model, collection) {
        model.attributes.cid = model.cid;
        var data = JSON.stringify( model );
        data = encodeURIComponent(data);
        var length = (collection.length)? '&length=' + collection.length : '';
        console.log(length);
        $.ajax({
            type: "POST",
            data: userid + '=' + data + length,
            success: setModelID
        });
    }

})();
