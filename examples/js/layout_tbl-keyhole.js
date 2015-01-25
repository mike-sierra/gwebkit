var rowCount = document.querySelectorAll('tr').length - 1;

window.onhashchange = function(e) {
    var u = e.newURL.replace(/^.+#[a-z]+/, '');
    var r = false;
    if (!u) r = true;
    if (u.match(/#$/)) r = true;
    if (r) {
        document.querySelector('title').innerHTML = "Mobilized Tables";
        return(false);
    }
    document.querySelector('title').innerHTML = "Results: " + u + " of " + rowCount;
}
