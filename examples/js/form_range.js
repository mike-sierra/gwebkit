window.onload = function() {
    var el = document.querySelectorAll('input');
    for (var i = 0, l = el.length ; i < l ; i++ ) {
        el[i].addEventListener('change', displayRangeValue);
        if (el[i].id == 'rating') el[i].addEventListener('change', displayRating);
    }
}

function displayRangeValue(event) {
    var input = event.currentTarget;
    var span = input.nextSibling;

    var texts = [
        'Terrible',
        'Poor',
        'Fair',
        'Good',
        'Excellent',
        'Outstanding',
    ];

    if (! span) return false;
    if (span.tagName != 'SPAN') return false;


    if (input.id == 'text') {
        span.innerHTML = texts[input.value];
    }
    else {
        span.innerHTML = input.value;
    }
}

function displayRating(event) {
    var input = event.currentTarget;
    var value = input.value;
    input.className = 'star' + value;
}
