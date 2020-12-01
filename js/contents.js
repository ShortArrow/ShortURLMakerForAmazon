chrome.storage.sync.set({ color: item }, function () {
    console.log('color is ' + item);
});

let url = location.href;
let fake = url.split("/");
let targetIndex = fake.indexOf("dp") + 1;
if (targetIndex == 0) {
    alert('このページのURLは短縮出来ないようです。');
}
else {
    let ShortURL = "https://www.amazon.co.jp/dp/" + fake[targetIndex];
    if (navigator.clipboard) {
        navigator.clipboard.writeText(ShortURL);
    }
    alert("「" + ShortURL + "」をクリップボードにコピーしました。");
}
