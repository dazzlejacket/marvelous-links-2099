const BIFROST_PREFIX = "https://bifrost.marvel.com/v1/catalog/digital-comics/metadata/";
const SMART_LINK_PREFIX = "https://marvel.smart.link/fiir7ec77?type=issue&drn=drn:src:marvel:unison::prod:38861ac6-40bd-49a0-8698-e92fddfb2b35&sourceId=";

var loc = window.location.toString();

var digitalIdPos  = loc.lastIndexOf("/");
var digitalId = loc.slice(digitalIdPos + 1, loc.length);

var dataUrl = BIFROST_PREFIX + digitalId;

var xhr = new XMLHttpRequest();
xhr.addEventListener("readystatechange", function () {
    if(this.readyState === 4) {
        var json = JSON.parse(this.responseText);
        var issueId = json.data.results[0].issue_meta.catalog_id;
        var newUrl = SMART_LINK_PREFIX + issueId;

        var span = document.createElement("span");
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
