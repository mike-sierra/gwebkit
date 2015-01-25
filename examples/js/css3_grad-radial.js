window.onload = function() {
    var el = document.querySelector('#main');
    el.addEventListener('mousedown', function(event){

        var colors = [ 'beige', 'crimson', 'darkcyan', 'turquoise',
                        'darkgoldenrod', 'darkorange', 'fuchsia',
                        'greenyellow', 'lightblue', 'lightcoral',
                        'lightgreen', 'mediumorchid', 'pink', 'plum',
                        'skyblue', 'springgreen', 'tan', 'tomato',
                        'violet', 'yellow', 'teal'];

        var x = event.offsetX;
        var y = event.offsetY;

        var loc = document.querySelector('#localStyles');
        var style = '#main:active {' + 'background: -webkit-gradient(radial, ';
            style += (x + ' ');
            style += (y + ' ');
        style += ',5,';
            style += ((x + 10) + ' ');
            style += ((y + 10) + ' ');
        style += ', 48, ';
            style += 'from(' + colors[r(5)] + '),';
            style += 'color-stop(20%, ' + colors[r(5)] + '),';
            style += 'color-stop(40%, ' + colors[r(5)] + '),';
            style += 'color-stop(60%, ' + colors[r(5)] + '),';
            style += 'color-stop(80%, ' + colors[r(5)] + '),';
            style += 'to(#ffffff) );'
            style += '}'
        loc.innerHTML = style;
    });
}

function r(i) {
    return Math.floor( (Math.random() * i ) );
}
