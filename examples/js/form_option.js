var app = new Function();

app.Animal = [ 'Mammal', 'Bird', 'Reptile', 'Amphibian', 'Fish',
    'Invertebrate' ];

app.Vegetable = [ 'Embryophyta', 'Viridiplantae', 'Archaeplastida' ];

app.Mineral = [ 'Igneous', 'Sedimentary', 'Metamorphic' ];

app.narrowOptions = function() {
    var str = '';
    var items = app[this.value];
    for (var i = 0, l = items.length; i < l ; i++ ) {
        str += '<option>' + items[i] + '</option>';
    }
    app.secondary.innerHTML = str;
};

window.onload = function() {
    app.primary = document.getElementById('primary');
    app.secondary = document.getElementById('secondary');
    app.primary.addEventListener('change', app.narrowOptions, false);
};

