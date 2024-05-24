const SHARE_LINK_PREFIX = "https://share.marvel.com/sharing/legacy/"
const DEEPLINK_PREFIX = "marvelunlimited://issue/"
const INSERT_POINT = "span.allPages"

function updatePage() {
    teardown();
    insertLink();
}

function teardown() {
    const element = document.querySelector("#marvelous-link");
    if (element !== null) {
        element.parentNode.removeChild(element);
    }
}

function insertLink() {
    const loc = window.location.toString();

    const digitalIdPos  = loc.lastIndexOf("/");
    const digitalId = loc.slice(digitalIdPos + 1, loc.length);

    const dataUrl = SHARE_LINK_PREFIX + digitalId;

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if(this.readyState == 4) {
            const regex = /drn=(.*)&amp/gm
            const match = regex.exec(this.responseText);
            const data = match[1];
            const newUrl = DEEPLINK_PREFIX + data;

            const span = document.createElement("span");
            span.id="marvelous-link"
            span.style="float:left; overflow: visible; top: 0px; text-indent: 20%;";
            const anchor = document.createElement("a");
            anchor.setAttribute("href", newUrl);
            anchor.innerText = "Open in app";
            anchor.style = "color:white";
            span.appendChild(anchor);

            const header = document.body.querySelector(INSERT_POINT);
            header.after(span);
        }
    });
    xhr.open("GET", dataUrl);
    xhr.send();
}

const observer = new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE && node.querySelector(INSERT_POINT)) {
                    updatePage();
                    observer.disconnect();
                    return;
                }
            }
        }
    }
});

observer.observe(document.body, {childList: true, subtree: true});
