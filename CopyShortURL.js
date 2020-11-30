let fake = location.href.split("/");
let targetIndex = fake.indexOf("dp") + 1;
let ShortURL="https://www.amazon.co.jp/dp/" + fake[targetIndex];
// alert("「"+ShortURL+"」をクリップボードにコピーしました。");

if(navigator.clipboard){
    navigator.clipboard.writeText(ShortURL);
}