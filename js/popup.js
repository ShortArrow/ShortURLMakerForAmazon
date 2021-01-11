// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
let ItemId = `CopyShortURL`
let ShortURL = document.getElementById(ItemId);
ShortURL.innerText = chrome.i18n.getMessage("app_config__button_text_copy");
ShortURL.onclick = () => {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    (tabs) => {
      chrome.tabs.executeScript(
        tabs[0].id,
        { file: `js/contents.js` }
      );
    }
  );
};

var _gaq = _gaq || [];
_gaq.push(['_setAccount', '258429216']);
_gaq.push(['_trackPageview']);

(function () {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function trackButton(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', trackButtonClick);
}

{/* <input type="hidden" id="ASIN" name="ASIN" value="B07WGJQMNN"></input> */ }