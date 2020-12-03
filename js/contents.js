chrome.runtime.sendMessage({
    type: "url",
    text: location.href
},
    function (response) {
        if (response) {
            // alert(response);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(response);
            }
        }
    }
);