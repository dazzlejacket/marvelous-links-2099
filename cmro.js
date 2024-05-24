const BUTTON_PREFIX = "https://read.marvel.com";
const SHARE_LINK_PREFIX = "https://share.marvel.com/sharing/legacy/"
const DEEPLINK_PREFIX = "marvelunlimited://issue/"

const button = getButtonElement();
const digitalId = getDigitalId(button.href);
updateButton(digitalId);

function getButtonElement() {
    const links = document.body.querySelectorAll("a");

    for (let i = 0; i < links.length; i++) {
        const url = links[i].href;

        if (url.startsWith(BUTTON_PREFIX)) {
            return links[i];
        }
    }
}

function getDigitalId(url) {
    const digitalIdPos  = url.lastIndexOf("/");
    return url.slice(digitalIdPos + 1, url.length);
}

async function updateButton(digitalId) {
    const response = await fetch(SHARE_LINK_PREFIX + digitalId);
    const text = await response.text();

    const regex = /drn=(.*)&amp/gm
    const match = regex.exec(text);

    const data = match[1];

    const newUrl = DEEPLINK_PREFIX + data;
    button.setAttribute("href", newUrl);
}
