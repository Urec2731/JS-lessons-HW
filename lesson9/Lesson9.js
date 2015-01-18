//(function() {
    var myFriendsFromServer = [
        {name:"Колян"},
        {name:"Петрович"},
        {name:"Марина"},
        {name:"Макс"},
        {name:"Игорь"}
    ];
    var Friend = Backbone.Model.extend({
        defaults: {
            name: ""
        }
    });
    var FriendList = Backbone.Collection.extend({
        model: Friend
    });
    var friendTemplate = $('#list [data-item]').detach();
    var FriendView = Backbone.View.extend({
        initialize: function () {
            var view = this;
            view.setElement( friendTemplate.clone() );
            view.$name = view.$( '[data-nameInput]' );
            view.$name.val( view.model.get('name') );
            view.$delete = view.$( '[data-deleteItem]' );
            view.listenTo(view.model, 'change:name', view.refreshName);
            view.listenTo(view.model, 'destroy remove', view.removeItem);
            view.$el.click(function(){
                view.$el.toggleClass("selected");
            });
            view.$name.click(function(event) {
                event.stopPropagation();
            });
            view.$name.blur( function () {
                    if (view.model.get('name') !== view.$name.val()) {
                        view.model.set('name', view.$name.val() );
                    }
            });
            view.$delete.click(function(){
                view.model.destroy();
            });

        },
        refreshName: function () {
            this.$name.val( this.model.get('name') );
        },
        removeItem: function () {
            this.remove();
        }
    });

    var FriendsListView = Backbone.View.extend({
        initialize: function () {
            var view = this;
            view.viewsList = {};
            view.collection.map( function(model) {
                view.addItem(model);
            } );     // fixme experimental
            view.listenTo(view.collection, 'add', view.addItem);
            view.listenTo(view.collection, 'destroy remove', view.removeItem);
        },
        addItem: function (model) {
            var item = new FriendView({
                model: model
            });
            this.$el.append(item.$el);
            this.viewsList[model.cid] = item;
        },
        removeItem: function (model) {
            this.viewsList[model.cid] = null;
        }
    });
    var myFriends = new FriendList(myFriendsFromServer);
        myFriendsView = new FriendsListView( {
            el: $("#list"),
            collection: myFriends
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
//})();
