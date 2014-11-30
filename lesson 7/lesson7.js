Number.prototype.sum = function ( number ) {
    return  ( isNaN( Number(number) ) )? NaN : this + Number(number);
};

var one = 1;

console.log( one.sum(1) );
console.log( one.sum(" 3.04 ") );
console.log( one.sum("w") );

$.prototype.hasAttr = function ( name ) {
    return !!this.attr(name);
};

var s = $('script').last();

console.log( s.hasAttr('src') );
console.log( s.hasAttr('async') );

s.attr("async", true);

console.log( s.attr('async') );
console.log( s.hasAttr('async') );

