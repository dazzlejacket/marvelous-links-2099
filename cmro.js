const BUTTON_PREFIX = "https://read.marvel.com";
const BIFROST_PREFIX = "https://bifrost.marvel.com/v1/catalog/digital-comics/metadata/";
const SMART_LINK_PREFIX = "https://marvel.smart.link/fiir7ec77?type=issue&drn=drn:src:marvel:unison::prod:38861ac6-40bd-49a0-8698-e92fddfb2b35&sourceId=";

var button = getButtonElement();
var digitalId = getDigitalId(button.href);
updateButton(digitalId);

function getButtonElement() {
    var links = document.body.querySelectorAll("a");

    for (var i = 0; i < links.length; i++) {
        var url = links[i].href;

        if (url.startsWith(BUTTON_PREFIX)) {
            return links[i];
        }
    }
}

function getDigitalId(url) {
    var digitalIdPos  = url.lastIndexOf("/");
    return url.slice(digitalIdPos + 1, url.length);
}

function updateButton(digitalId) {
    var dataUrl = BIFROST_PREFIX + digitalId;

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if(this.readyState === 4) {
            var json = JSON.parse(this.responseText);
            var issueId = json.data.results[0].issue_meta.catalog_id;
            var newUrl = SMART_LINK_PREFIX + issueId;
            button.setAttribute("href", newUrl);
        }
    });
    xhr.open("GET", dataUrl);
    xhr.send();
}
