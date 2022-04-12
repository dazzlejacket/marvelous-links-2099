const SHARE_LINK_PREFIX = "https://share.marvel.com/sharing/legacy/"

process();

window.addEventListener('hashchange', process);

function process() {
    console.log("CHANGING PAGE");
    teardown();
    setup();
}

function teardown() {
    var element = document.querySelector("#marvelous-link");
    if (element !== null) {
        element.parentNode.removeChild(element);
    }
}

function setup() {
    var loc = window.location.toString();

    var digitalIdPos  = loc.lastIndexOf("/");
    var digitalId = loc.slice(digitalIdPos + 1, loc.length);
    
    var dataUrl = SHARE_LINK_PREFIX + digitalId;
    
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if(this.readyState === 4) {
            const regex = /href="(.*?.smart.*?)"/g
            var match = regex.exec(this.responseText);
            var newUrl = match[1];
    
            var span = document.createElement("span");
            span.id="marvelous-link"
            span.style="float:left; overflow: visible; top: 0px; text-indent: 20%;";
            var anchor = document.createElement("a");
            anchor.setAttribute("href", newUrl);
            anchor.innerText = "Open in app";
            anchor.style = "color:white";
            span.appendChild(anchor);
    
            var header = document.body.querySelector("span.allPages");
            header.after(span);
        }
    });
    xhr.open("GET", dataUrl);
    xhr.send();
}
