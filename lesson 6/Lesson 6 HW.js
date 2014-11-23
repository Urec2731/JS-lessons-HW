jQuery( document ).ready(function( $ ) {
    $("#list").click(function (event){
        if(event.target.tagName === "BUTTON") {
            event.target.parentNode.remove();
        }
        if(event.target.tagName === "LI") {
            $(event.target).toggleClass("selected");
        }
    });
    $("#deleteSelected").click(function() {
        $('#list .selected').remove();
    });
});