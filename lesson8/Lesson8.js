jQuery(function( $ ) {
    var friendList = ["Колян" ,"Петрович" ,"Марина" ,"Макс" ,"Игорь"],
        list = $("[data-id='list']"),
        itemTemplate = list.find('[data-class="item"].hidden');

    function addItem() {
        return itemTemplate.clone(true).appendTo(list).removeClass('hidden');
    };

    friendList.map(function(element){
       addItem().find('input').val(element);
    });

    list.click(function (event){
        var target = $(event.target);
        if (target.is('[data-class="deleteItem"]')) {
            target.closest('[data-class="item"]').remove();
            return;
        }
        if (target.is('[data-class="item"]')) {
            target.toggleClass("selected");
        }
    });

    $("[data-id='deleteSelected']").click(function() {
        $('[data-class="item"].selected').remove();
    });

    $("[data-id='addItem']").click(addItem);
});