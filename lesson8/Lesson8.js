(function(){
    var Friend = Backbone.Model.extend({});

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

    var FriendListView = Backbone.View.extend({
        initialize: function () {
            var names = this.collection.pluck("name");
            var template = _.template($('#item_template').html());
            var compiled = names.map(function (name) {
                return template({value: name});
            }).join('');
            this.$el.html(compiled);
            this.template = template;
            names = template = compiled = null;
        },
        events: {
            "click": function (event) {
                $(event.target).toggleClass("selected");
            },
            "click [data-class='deleteItem']": function (event) {
                var target = $(event.target);
                var i = this.$el.find("[data-class='deleteItem']").index(target);
                this.collection.remove(this.collection.models[i]);
                target.closest('[data-class="item"]').remove();
                console.log(this.collection.pluck("name"));
            },
            "click input": function (event) {
                event.stopPropagation()
            },
            "blur input": function(event){
                var target = $(event.target);
                var i = this.$el.find("input").index(target);
                this.collection.models[i].set({name: target.val()});
                console.log(this.collection.pluck("name"));
            }
        },
        deleteSelected: function (event) {
            var container = this;
            container.$el.find("[data-class='item'].selected").map(function (ind, el) {
                var i = container.$el.find("[data-class='item']").index(el);
                container.collection.remove(container.collection.models[i]);
                el.remove();
            });
            console.log(this.collection.pluck("name"));
        },
        addNew: function (event) {
            this.$el.append( this.template({value: ''}) );
            this.collection.add( new Friend({name: ""}) );
            console.log(this.collection.pluck("name"));
        }
    });
    var myFriendsView = new FriendListView({
        el: $("#list"),
        collection: myFriends
    });

    $("[data-id='deleteSelected']").click(function () {
        myFriendsView.deleteSelected()
    });
    $("[data-id='addItem']").click(function () {
        myFriendsView.addNew()
    });
})();