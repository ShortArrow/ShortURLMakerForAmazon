chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'www.amazon.co.jp' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.type) {
            case "url":
                hello(request.text, sendResponse);
                break;
            default:
                console.log("Error: Unkown request.")
                console.log(request);
        }
    }
);

function hello(url, callback) {
    let questionCheck = url.split("?");
    let fake = questionCheck[0].split("/");
    let ASIN = "";
    let targetGP = fake.indexOf("gp");
    let targetDP = fake.indexOf("dp");
    let targetPD = fake.indexOf("product");
    if (targetDP != -1) {
        ASIN = fake[targetDP + 1];
    }
    else {
        if (targetGP != -1) {
            if (targetGP + 1 == targetPD) {
                ASIN = fake[targetPD + 1];
            } else {
            }
        }
        else {
        }
    }
    if (ASIN == "") {
        callback(url);
        alert('このページのURLは短縮出来ないようです。');
    }
    else {
        let ShortURL = "https://www.amazon.co.jp/dp/" + ASIN;
        callback("https://www.amazon.co.jp/dp/" + ASIN);
        // alert('「'+ShortURL+'」をクリップボードにコピーしました。');
    }
}