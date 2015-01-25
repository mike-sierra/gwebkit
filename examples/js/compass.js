window.onload = function(){
    var app = {};
    app.inputs = document.querySelectorAll('input');
    app['alpha'] = document.querySelector('#p_alpha')
    app['beta'] = document.querySelector('#p_beta')
    app['gamma'] = document.querySelector('#p_gamma')
    for (var i = 0, l = app.inputs.length; i < l; i++) {
        app.inputs[i].addEventListener('change', function(e) {
            e.target.nextSibling.innerHTML = e.target.value;
            app.id = e.target.id;
            if (app.id == 'alpha') {
                app[app.id].style.WebkitTransform = 'rotateZ(' + e.target.value+ 'deg)';
            } else if (app.id == 'beta') {
                app[app.id].style.WebkitTransform = 'rotateX(' + e.target.value+ 'deg)';
            }
            if (app.id == 'gamma') {
                app[app.id].style.WebkitTransform = 'rotateY(' + e.target.value+ 'deg)';
            }
        });
    }
};
