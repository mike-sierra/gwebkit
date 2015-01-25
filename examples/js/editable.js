var app = new Function();

app.data = {
    "absence" : "absense",
    "accomplish" : "acomplish",
    "apparent" : "apparant",
    "believe" : "beleive",
    "calendar" : "calender",
    "changeable" : "changable",
    "definite" : "definate",
    "humorous" : "humerous",
    "independent" : "independant",
    "magically" : "magicly",
    "maintenance" : "maintenence",
    "pleasant" : "pleasent",
    "potatoes" : "potatos",
    "privilege" : "privelege",
    "recommend" : "reccomend",
    "tomorrow" : "tommorow"
};

window.onload = function() {
    app.db = window.localStorage;
    app.li = document.querySelectorAll('ul > li');
    for (var i = 0, l = app.li.length; i < l; i++) {
        if (app.db.getItem(app.li[i].id)) {
            app.li[i].classList.add('correct');
            app.li[i].textContent = app.li[i].id;
        }
        app.li[i].addEventListener('blur', app.validate);
    }
};

app.validate = function(e) {
    if (this.textContent.toLowerCase() == this.id.toLowerCase()) {
        this.classList.add('correct')
        this.classList.remove('incorrect');
        app.db.setItem(this.id, 'true');
        if (document.querySelector('li:not(.correct)')) return(false);
        alert('Well done!');
        app.db.clear();
        window.location.reload();
    } else {
        this.classList.remove('correct')
        this.classList.add('incorrect');
    }
}

