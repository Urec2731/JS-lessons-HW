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
            type: 'GET',
            url: '/api/friends',
            status: 200,
            contentType: 'json',
            response: function () {
                console.log(myFriends);
                this.responseText = JSON.stringify(myFriends);
            }
        });
        $.mockjax({
            type: 'POST',
            url: '/api/friends',
            contentType: 'json',
            response: function (request) {
                var data = JSON.parse(request.data);
                var id = 0;
                while (myFriends
                    .filter( function(item){
                        return id === item.id;
                    })
                    .length === 1) {
                    ++id;
                };
                data.id = id;
                myFriends.push(data);
                console.log(myFriends);
                this.status = 201;
                this.responseText = JSON.stringify(data);
            }
        });
        $.mockjax({
            type: 'PUT',
            url: /^\/api\/friends\/([\d]+)$/,
            status: 200,
            contentType: 'json',
            urlParams: ["ID"],
            response: function (request) {
                var data = JSON.parse(request.data);
                var id = request.urlParams.ID;
                var obj = myFriends.filter( function(item){
                        return + id === + item.id;
                    });
                if (obj.length === 0) {
                    this.status = 404;
                    return;
                }
                for ( var field in data ) {
                    obj[0][field] = data[field];
                }
                console.log(myFriends);
                this.responseText = JSON.stringify(data);
            }
        });
        $.mockjax({
            type: 'DELETE',
            url: /^\/api\/friends\/([\d]+)$/,
            contentType: 'json',
            urlParams: ["ID"],
            response: function (request) {
                var id = request.urlParams.ID;
                var obj = myFriends.filter( function(item){
                    return + id === + item.id;
                });
                if (obj.length === 0) {
                    this.status = 404;
                    return;
                }
                myFriends.splice( myFriends.indexOf(obj[0]), 1);
                console.log(myFriends);
                this.status = 204;
                this.responseText = JSON.stringify(obj[0]);
            }
        });
    }
);