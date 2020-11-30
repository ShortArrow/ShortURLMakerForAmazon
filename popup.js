// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let ids = ['ShowShortURL', 'GotoShortURL', 'CopyShortURL'];
ids.forEach(ItemId => {
  let ShortURL = document.getElementById(ItemId);
  ShortURL.innerHTML = ItemId;
  ShortURL.onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.executeScript(
        tabs[0].id,
        { file : ItemId +`.js`});
    });
  };
});



{/* <input type="hidden" id="ASIN" name="ASIN" value="B07WGJQMNN"></input> */ }