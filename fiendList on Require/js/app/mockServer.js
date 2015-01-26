define(["jquery", 'jquery.mockjax'],
    function ($) {
        var myFriends = [
            {id: 1, name: "Колян"},
            {id: 2, name: "Петрович"},
            {id: 3, name: "Марина"},
            {id: 4, name: "Макс"},
            {id: 5, name: "Игорь"}
        ];
        $.mockjax({
            url: '/api/friends',
            status: 200,
            type: 'GET',
            contentType: 'json',
            response: function () {
                this.responseText = JSON.stringify(myFriends);
            }
        });
        //$.mockjax({
        //    url: '/api/friends',
        //    status: 200,
        //    type: 'GET',
        //    contentType: 'json',
        //    response: function () {
        //        this.responseText = JSON.stringify(myFriends);
        //    }
        //});

    }
);