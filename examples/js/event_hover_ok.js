window.onload = function() {
    document.querySelector('body').addEventListener('click', function(event){
        document.querySelector('#panel').className = 'collapsed';
    });
}

function share() {
    document.querySelector('#panel').className = 'expanded';
    event.stopPropagation();
}

function debug(str) {
    document.querySelector('#dbg').innerHTML = 'You chose the <b>' + str.toUpperCase() + '</b> option.';
}
