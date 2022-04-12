const BUTTON_PREFIX = "https://read.marvel.com";
const SHARE_LINK_PREFIX = "https://share.marvel.com/sharing/legacy/"

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
    var newUrl = SHARE_LINK_PREFIX + digitalId;

    var iframe = document.createElement('iframe');
    iframe.setAttribute("src", newUrl);
    iframe.setAttribute("width", "160px");
    iframe.setAttribute("height", "80px");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("frameBorder", "0");

    button.replaceWith(iframe);
}
