// var db = window.localStorage;
var src = new EventSource('sse.php');

src.addEventListener('item', function(event) {
    var id = event.lastEventId;
    var content = event.data;
    //    if (db.getItem(id)) return(false);
    //    db.setItem(id, content);
    // do something else with content
    //    alert(id + " " + content)
	}, false);


src.addEventListener('message', function(event) {
    var content = event.data;
    //    alert(content);
}, false)
