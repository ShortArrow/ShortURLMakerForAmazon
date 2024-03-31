// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

let ItemId = "CopyShortURL";
let ShortURL = document.getElementById(ItemId);
ShortURL.innerText = chrome.i18n.getMessage("app_config__button_text_copy");
ShortURL.onclick = () => {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    (tabs) => {
      chrome.runtime.sendMessage(
        {
          type: "url",
          text: tabs[0].url,
        }, function (response) {
          if (response) {
            chrome.tabs.sendMessage(
              tabs[0].id,
              {
                type: "dialog",
                text: response,
              }, function (response) {
                if (response) {
                  console.log(response);
                }
              }
            );
            setTimeout(async function () {
              await navigator.clipboard.writeText(response);
              window.close();
            }, 3000);
            chrome.tabs.sendMessage(
              tabs[0].id,
              {
                type: "close",
              }, function (response) {
                if (response) {
                  console.log(response);
                }
              }
            );
          }
        },
      );
    },
  );
};
