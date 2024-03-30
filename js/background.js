chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostPrefix: chrome.i18n.getMessage("app_config__localize_url"),
          },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }]);
  });
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.type) {
      case "url":
        urlParser(request.text, sendResponse);
        break;
      default:
        console.log("Error: Unkown request.");
        console.log(request);
    }
  },
);

function urlParser(url, callback) {
  let questionCutted = url.split("?");
  let slicedURL = questionCutted[0].split("/");
  let ASIN = "";
  let targetGP = slicedURL.indexOf("gp");
  let targetDP = slicedURL.indexOf("dp");
  let targetPD = slicedURL.indexOf("product");
  let doaminname = slicedURL[2];
  if (targetDP != -1) {
    ASIN = slicedURL[targetDP + 1];
  } else {
    if (targetGP != -1) {
      if (targetGP + 1 == targetPD) {
        ASIN = slicedURL[targetPD + 1];
      } else {
      }
    } else {
    }
  }
  if (ASIN == "") {
    callback(questionCutted[0]);
    alert(chrome.i18n.getMessage("app_display_text_cant_shortning"));
  } else {
    let ShortURL = castAsinToUrl(ASIN, doaminname);
    callback(castAsinToUrl(ASIN, doaminname));
  }
}

function castDomainToUrl(domain) {
  return "https://" + domain;
}

function castAsinToUrl(asin, domain) {
  return castDomainToUrl(domain) + "/dp/" + asin;
}
