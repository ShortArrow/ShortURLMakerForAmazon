let url = location.href;
let fake = url.split("/");
let targetIndex = fake.indexOf("dp") + 1;
alert("https://www.amazon.co.jp/dp/" + fake[targetIndex]);

