# Smart-Notes-A-Chrome-Extension

A local-first, context-aware Chrome extension for intelligent note capture.

# Overview

Smart Notes That Remember is a Chrome extension that lets you save highlighted text from any webpage along with its context, source, and intent — so you can actually remember where and why you saved something.

Unlike traditional note tools, this extension is local-first, fast, privacy-friendly, and works completely without a backend or server.

# Key Features

 Right-click save
Save any selected text directly from a webpage.

 Context-aware notes
Automatically stores:

Page title

URL

Surrounding context

Timestamp

[x]Auto-tagging
Generates lightweight semantic tags from the saved content.

[x]Intent capture
Add “Why did I save this?” to each note for better recall.

[x]Delete specific notes
Clean, one-click delete with proper state updates.

[x]Instant feedback
Popup opens automatically with a Saved ✓ confirmation.

[x]No backend required
Uses chrome.storage.local — works offline and keeps data private.


Architecture (High Level)
```
css
Web Page
  └─ content.js
       └─ captures selected text + context
            ↓
background.js (MV3 service worker)
  └─ handles context menu
  └─ stores notes locally
  └─ opens popup on save
            ↓
popup.html + popup.js
  └─ displays notes
  └─ attaches intent
  └─ deletes notes
```

-Manifest Version: MV3
-Storage: chrome.storage.local
-No server, no database, no auth

Project Structure
```
Smart-Notes-Extension/
│
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
│
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```
# How to Install (Local Development)

Clone this repository

git clone https://github.com/your-username/smart-notes-extension.git


Open Chrome and go to:

chrome://extensions


Enable Developer mode

Click Load unpacked

Select the project folder

 How to Use

Open any normal website (e.g. Wikipedia, blogs, docs)

Select text

-Right-click → Save to Smart Notes
-Popup opens automatically
-Optionally add why you saved it
-Manage or delete notes from the popup
 Privacy & Data
-All notes are stored locally in your browser
-No tracking
-No external servers
-No network calls
-Works offline

 Why No Backend?

-This project follows a local-first design philosophy:
-Faster UX
-Better privacy
-Zero infrastructure cost
-Easier maintenance

The architecture is intentionally designed so cloud sync or a backend can be added later, but is not required for core functionality.

🧑‍💻 Author

Built by Tony
Focused on building practical, thoughtful tools with clean architecture.
