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

    var myFriends = new FriendList([
        new Friend({name: "Колян"}),
        new Friend({name: "Петрович"}),
        new Friend({name: "Марина"}),
        new Friend({name: "Макс"}),
        new Friend({name: "Игорь"})
    ]);

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

    var myFriendsView = new FriendNamesView({
        el: $("#list"),
        collection: myFriends,
        template: $('#list [data-class="item"]').detach()
    });

    $("[data-id='deleteSelected']").click(function () {
        myFriendsView.$('.selected').map(function (i, target) {
            var cid = $(target).attr('data-cid');
            myFriends.remove( myFriends.get(cid) );
        })
    });
    $("[data-id='addItem']").click(function () {
        myFriends.add(new Friend);
    });

})();