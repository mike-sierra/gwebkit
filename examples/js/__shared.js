self.addEventListener("connect", function (e) {  
    var port = e.ports[0];  
    port.start();  
    port.addEventListener("message", function (event) {
            port.postMessage("Hello " + event.data );
        }, false);
    port.postMessage('reply');
}, false);  
