chrome.runtime.sendMessage({
    type: "url",
    text: location.href
},
    function (response) {
        if (response) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(response);
                alert(
                    chrome.i18n.getMessage("app_display_text",response)
                );
            }
            else {
                alert(chrome.i18n.getMessage("app_display_text_cant_use_clipboard"))
            }
        }
    }
);