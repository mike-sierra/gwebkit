var app = new Function();

app.dbg = false;

window.onload = function() {

    app.cred = document.querySelector('#cred');

    // open form:
    document.querySelector('#openform').addEventListener('mousedown', app.getInfo);
    // dismiss form:
    document.querySelector('#dismiss').addEventListener('mousedown', app.dismiss);

    // form validation:
    app.inputs = document.querySelectorAll('input:not([type="submit"])');
    for (var i = 0, l = app.inputs.length ; i < l ; i++ ) {
        app.inputs[i].addEventListener('blur', app.checkEdit);
    }

    // storage
    app.db_loc = window.localStorage;
    app.db_ses = window.sessionStorage;

    if (!!app.db_loc) {
        // no login info yet...
        if ( !app.db_loc.getItem('login') || !app.db_loc.getItem('password') ) app.getInfo();
    }
    else {
        alert("This application needs to run on a recent WebKit-based browser.");
    }

};

app.hint = function(str) {
    document.querySelector('body').className = str;
};

app.checkEdit = function(ev) {
    ev.currentTarget.className = 'validate';
}

app.getInfo = function(ev) {
    app.cred.className = 'show';
    app.inputs[0].value = app.db_loc.getItem('login');
    app.inputs[1].value = app.db_loc.getItem('password');
    app.inputs[2].value = app.db_ses.getItem('credit');
}

app.dismiss = function(ev) {
    app.db_loc.setItem('login', app.inputs[0].value);
    app.db_loc.setItem('password', app.inputs[1].value);
    app.db_ses.setItem('credit', app.inputs[2].value);
    ev.currentTarget.parentNode.className = 'hide';
}

