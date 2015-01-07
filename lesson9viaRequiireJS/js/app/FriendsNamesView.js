define(["../lib/jquery", "../lib/underscore", "../lib/backbone"],
    function($, _, Backbone) {
        return Backbone.View.extend({
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
        })
    }
);