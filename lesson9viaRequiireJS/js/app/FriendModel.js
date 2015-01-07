define(["../lib/jquery", "../lib/underscore", "../lib/backbone"],
    function($, _, Backbone) {
        var model = Backbone.Model.extend({
                defaults: {
                    name: "",
                    age: 0
                }
        });
        return new model();
    }
);