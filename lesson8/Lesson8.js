jQuery(function( $ ) {
    function ActiveList (ops) {
        var list = ops.modelArray,
            container = ops.listElement,
            itemTemplate = ops.itemTemplate;

        function addOne() {
            return itemTemplate.clone(true).appendTo(container).removeClass('hidden');
        };
        function createListHTML () {
            container.empty();
            list.map(function(element){
                addOne().find('input').val(element);
            });
        };

        this.add = function ( i, el ) {
            list[i] = el;
        };
        this.remove = function (el) {
            for (var i = 0; i < list.length; i++){
                if (list[i] === el) {
                    list.splice(i, 1);
                    createListHTML();
                    return;
                };
            };
        };
        this.removeSome = function (els) {
            els.map(function(e, el) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i] === el) {
                        list.splice(i, 1);
                        return;
                    };
                };
            });
            createListHTML();
        };
        this.addEmptyItem = addOne;
        this.refreshList = createListHTML;
        createListHTML();
    };


    var friendList = $('[data-id="list"]')
        .click(function (event){
            var target = $(event.target);
            if (target.is('[data-class="deleteItem"]')) {
                friends.remove( target.closest('[data-class="item"]').find('input').val() );
                return;
            }
            if (target.is('[data-class="item"]')) {
                target.toggleClass("selected");
            }
        });
    friendList.on('focusout', function() {
            var target = $(event.target);
            if ( target.is('input') ) {
                var i = friendList.find('input').index(target);
                friends.add(i, target.val());
            }
        });

    $("[data-id='deleteSelected']").click(function() {
        var v = $('[data-class="item"].selected').find('input').map(function(i, el) {
            return this.value;
        });
            friends.removeSome( v );

    });

    var friends = new ActiveList({
        modelArray: ["Колян" ,"Петрович" ,"Марина" ,"Макс" ,"Игорь"],
        listElement:friendList,
        itemTemplate:$('[data-id="list"] [data-class="item"].hidden')
    });

    $("[data-id='addItem']").click(friends.addEmptyItem);


});