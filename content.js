console.log("Smart Notes content script injected");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_SELECTION") {
    const selection = window.getSelection();
    const text = selection.toString();

    let context = "";
    if (selection.rangeCount > 0) {
      const node = selection.getRangeAt(0).startContainer.parentElement;
      context = node ? node.innerText : "";
    }

    sendResponse({
      text,
      context,
      url: window.location.href,
      title: document.title
    });
  }
});