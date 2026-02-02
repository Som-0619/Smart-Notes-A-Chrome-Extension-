console.log("Background service worker loaded");

// ---------- TAG EXTRACTION ----------
function extractTags(text) {
  return [...new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ")
      .filter(word => word.length > 4)
      .slice(0, 5)
  )];
}

// ---------- CREATE CONTEXT MENU ----------
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-note",
    title: "Save to Smart Notes",
    contexts: ["selection"]
  });
});

// ---------- SAVE NOTE ----------
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "save-note") return;

  chrome.tabs.sendMessage(tab.id, { type: "GET_SELECTION" }, (response) => {
    if (chrome.runtime.lastError || !response || !response.text) return;

    const note = {
      id: crypto.randomUUID(),
      content: response.text,
      context: response.context.slice(0, 600),
      url: response.url,
      title: response.title,
      timestamp: new Date().toISOString(),
      tags: extractTags(response.context + " " + response.text),
      user_intent: ""
    };

    chrome.storage.local.get({ notes: [] }, (data) => {
      chrome.storage.local.set(
        { notes: [note, ...data.notes] },
        () => chrome.action.openPopup()
      );
    });
  });
});