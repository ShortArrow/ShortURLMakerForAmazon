const dialog = document.createElement("dialog");
document.body.appendChild(dialog);
const header = document.createElement("div");
header.className = "modal-header";
header.innerText = "URL shortener for Amazon";
dialog.appendChild(header);
const contents = document.createElement("div");
contents.className = "modal-contents";
contents.innerText = "Copied!";
dialog.appendChild(contents);
const footer = document.createElement("div");
footer.className = "modal-footer";
dialog.appendChild(footer);
const closeBtn = document.createElement("button");
closeBtn.innerText = "x";
closeBtn.onclick = close;
dialog.appendChild(closeBtn);
const overlay = document.createElement("div");
document.body.appendChild(overlay)

overlay.style = `
display: none;  
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
z-index: 99999999999999999998;
`;

dialog.style = `
position: relative;
font-size: 16px;
z-index: 99999999999999999999;
border-radius: 6px;
padding: 30px;
border: solid 0.5px gray;
font-weight: bold;
text-align: center;
`

header.style = `
font-size: 16px;
padding-bottom: 20px;
`

contents.style = `
font-size: 24px;
padding-bottom: 20px;
`

closeBtn.style = `
position: absolute;
font-size: 16px;
top: 3px;
right: 3px;
background-color: white;
color: red;
font-weight: bold;
padding: 5px 10px;
border: none;
`

function open(url) {
  footer.innerText = url;
  dialog.showModal();
  dialog.focus();
  overlay.style.display = "block";
}

function close() {
  dialog.close();
  overlay.style.display = "none";
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "dialog") {
      open(request.text);
      sendResponse("dialog opened");
      return true;
    }
    if (request.type == "close") 
    {
      setTimeout(() => {
        close();
      }, 3000);
      sendResponse("dialog closed");
      return true;
    }
  }
);
