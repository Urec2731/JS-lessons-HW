define(["backbone"],
    function (Backbone) {
        return Backbone.Model.extend({
            initialize: function () {
                this.on('change', function (model) {
                    model.save(model.attributes, {wait: true});
                }, this);
            },
            defaults: {
                name: ""
            }
        });
    }
);