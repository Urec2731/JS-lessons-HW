jQuery( document ).ready(function( $ ) {
    $("#list").click(function (event){
        if(event.target.tagName === "LI") {
            $(event.target).toggleClass("selected");
        }
    });
    $("#list input").click(function(event) {
        event.stopPropagation();
    });
    $("#list button").click(function(event) {
        event.stopPropagation();
        event.target.parentNode.remove();
    });
    $("#deleteSelected").click(function(event) {
        $("#list .selected").remove();
    });
});