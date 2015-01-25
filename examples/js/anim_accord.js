var app = new Function();

app.init = function() {
    document.querySelector('body').addEventListener('click', app.fallback);
    document.querySelector('body').addEventListener('touchstart', app.fallback);

    app.dl = document.querySelector('#accordion');
    app.dl.addEventListener('click', app.expand);
    app.dl.addEventListener('touchstart', app.expand);

    app.dt = document.querySelectorAll('#accordion > dt').toArray();
    app.dt.forEach( function(l) {
        l.className = 'collapsed';
        l.addEventListener('click', app.toggle);
        l.addEventListener('touchstart', app.toggle);
    });
};

app.expand = function(event) {
    event.preventDefault();
    if (this.className != 'expanded') event.stopPropagation();
    app.dt.forEach( function(l) { l.className = 'collapsed'; });
    this.className = 'expanded';
};

app.toggle = function(event) {
    event.preventDefault();
    event.stopPropagation();
    var c = this.className;
    app.dt.forEach( function(l) { l.className = 'collapsed'; });
    (c == 'collapsed')
        ? (this.className = 'expanded')
        : (this.className = 'collapsed');
};

app.fallback = function(event) {
    event.preventDefault();
    app.dl.className = 'collapsed';
};

NodeList.prototype.toArray = function() {
    for(var arr=new Array(),i=0,l=this.length;i<l;i++){arr.push(this[i])}
    return(arr);
};

window.onload = function() {
    app.init();
};

