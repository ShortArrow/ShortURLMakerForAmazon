chrome.runtime.onInstalled.addListener(function () {
  chrome.action.disable();
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url) {
    chrome.action.enable(tabId);
    console.debug("chrome.action.enable");
  }else{
    chrome.action.disable(tabId);
    console.debug("chrome.action.disable");
  }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.type) {
      case "url":
        urlParser(request.text, sendResponse);
        break;
      default:
        console.error("Unkown request:",request);
    }
  },
);

function urlParser(url, callback) {
  if (url == undefined) {
    console.log("Error: url is undefined.");
    return;
  }
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
    callback(castAsinToUrl(ASIN, doaminname));
  }
}

function castDomainToUrl(domain) {
  return "https://" + domain;
}

function castAsinToUrl(asin, domain) {
  return castDomainToUrl(domain) + "/dp/" + asin;
}
