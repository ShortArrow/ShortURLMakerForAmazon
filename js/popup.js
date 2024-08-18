// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

const origins = [
  "https://www.amazon.co.jp/",
]

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function permissionCheck() {
  let response = await chrome.permissions.contains({
    permissions: ["clipboardWrite"]
  });
  return response ? true : false;
}

async function mainClickHandler() {
  let tab = await getCurrentTab();
  if (!tab) { console.error("No active tab found."); return; }
  let url = tab.url;
  if (!url) { console.error("No URL found."); return; }
  console.info("tab get ", url);
  let permissionCheckResponse = await permissionCheck();
  if (!permissionCheckResponse) { console.error("No permission"); return; }
  let response = await chrome.runtime.sendMessage({ type: "url", text: url });
  if (response) {
    let dialogResponse = await chrome.tabs.sendMessage(tab.id, { type: "dialog", text: response });
    if (dialogResponse) {
      console.log(dialogResponse);
    }
    await delay(100);
    await navigator.clipboard.writeText(response);
    await delay(3000);
    window.close();
    let closeResponse = await chrome.tabs.sendMessage(tab.id, { type: "close" });
    if (closeResponse) {
      console.log(closeResponse);
    }
  }
};


let ItemId = "CopyShortURL";
let ShortURL = document.getElementById(ItemId);
ShortURL.innerText = chrome.i18n.getMessage("app_config__button_text_copy");

console.debug("Start main process");
mainClickHandler();