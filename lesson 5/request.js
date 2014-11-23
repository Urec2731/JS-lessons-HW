
var response = {}, //Объект ответа
mainArray = [];    //Массив хранения списка ссылок

var mainList = document.getElementById('mainList');   //Элемент списка в HTML странице
var noResults = document.getElementById('nothingFound');


(function () {
    sendWikiRequest(document.getElementById('searchInput').value, callback);
    addEventListeners();
})();

function addEventListeners() {         //Привязывает обработчики событий
    document.getElementById('searchButton').addEventListener('click', function () {
        sendWikiRequest(document.getElementById('searchInput').value, callback)
        });
    document.getElementById('searchInput').addEventListener('search', function () {
        sendWikiRequest(document.getElementById('searchInput').value, callback)
        });
    document.getElementById('mixButton').addEventListener('click', mixItems);
    document.getElementById('reverseSortButton').addEventListener('click', reverseSortItems);
    document.getElementById('delItemButton').addEventListener('click', deleteItem);
    document.getElementById('moveUpButton').addEventListener('click', moveUpItem);
    document.getElementById('moveDownButton').addEventListener('click', moveDownItem);
}
function sendWikiRequest (search, callback) {   //посылает запрос на сервер
    var scr1 = document.createElement('script');
    scr1.src = 'http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + search +'&srnamespace=0&srwhat=text&srinfo=suggestion&srprop=snippet&indexpageids=&iwurl=&redirects=&requestid=1&callback=' + callback.name;
    scr1.async = true;
    document.body.appendChild(scr1);
    document.body.removeChild(scr1);
}
function callback(data) {   //обработка ответа сервера
    response = data;
    mainArray = response.query.search;
    refreshMainList();
}
function refreshMainList () {   //выводит список из массива на страницу
    (!mainArray.length)? noResults.style.display = 'block':noResults.style.display = 'none';
        var as = mainList.getElementsByTagName('a'),
        a;
    for (var i = 0; i < mainArray.length; i++) {
        a = as[i]|| makeNewItem();
        a.href = 'http://en.wikipedia.org/wiki/' + mainArray[i].title;
        a.innerHTML = '<span class="itemTitle">' + mainArray[i].title + '</span><br/>' + mainArray[i].snippet;
    }
    while (as[i]) {
        mainList.removeChild(mainList.lastChild)
    }
    as = a = i = null;
}
function makeNewItem () { //создает новый пункт HTML списка
    var li = document.createElement('li');
    mainList.appendChild(li);
    var a = document.createElement('a');
    li.appendChild(a);
    return a;
}
//функции работы с массивом
function mixItems () {
    mainArray.sort(function(){return (Math.random() - Math.random())*100});
    refreshMainList();
}
function reverseSortItems () {
    mainArray.reverse();
    refreshMainList();
}
function moveUpItem (){
    mainArray.unshift(mainArray.splice(Number(document.getElementById('itemN').value), 1)[0]);
    refreshMainList();
}
function moveDownItem (){
    mainArray.push(mainArray.splice(Number(document.getElementById('itemN').value), 1)[0]);
    refreshMainList();
}
function deleteItem (){
    mainArray.splice(Number(document.getElementById('itemN').value), 1);
    refreshMainList();
}
