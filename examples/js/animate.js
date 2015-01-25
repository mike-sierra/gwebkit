var app = new Function();

app.sec = document.querySelector('section');
app.nav = document.querySelector('nav');


app.sec.addEventListener('click', function(e){
    app.nav.classList.remove('expanded');
});

app.nav.addEventListener('click', function(e){
    e.stopPropagation();
    app.nav.classList.toggle('expanded');
});
