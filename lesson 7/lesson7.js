Number.prototype.sum = function ( number ) {
    return this + Number(number);
};

var one = 1;

console.log( one.sum(1) );
console.log( one.sum(" 3.04 ") );
console.log( one.sum("w") );

$.prototype.hasAttr = function ( name ) {
    return this.attr(name) !== undefined;
};

var s = $('script').last();

console.log( s.hasAttr('src') );
console.log( s.hasAttr('test') );

s.attr("test", '');

console.log( s.hasAttr('test') );