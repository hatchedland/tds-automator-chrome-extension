# TDS Automator Extension

A Chrome extension that automatically saves and prefills form data for the Income Tax Portal (eportal.incometax.gov.in).

## Features

- **Auto-save**: Capture form data with one click
- **Auto-prefill**: Restore saved data instantly
- **Secure storage**: Data stored locally using Chrome's storage API
- **Portal-specific**: Designed for Income Tax Portal workflows

## File Structure

```
tds-automator-extension/
├── src/
│   ├── components/
│   │   └── App.js           # React component (alternative UI)
│   ├── content/
│   │   └── content.js       # Content script for form automation
│   └── popup/
│       ├── popup.html       # Extension popup interface
│       └── popup.js         # Popup functionality
├── icons/                   # Extension icons (16px, 48px, 128px)
├── manifest.json           # Extension configuration
├── package.json           # Project metadata
└── README.md              # Documentation
```

## How It Works

1. **Content Script**: Monitors form fields on Income Tax Portal pages
2. **Popup Interface**: Provides Save/Prefill buttons via browser extension popup
3. **Local Storage**: Uses Chrome's storage API to persist form data securely
4. **Message Passing**: Communication between popup and content script

## Target Form Fields

Currently configured for:
- `panAdhaarUserId` - PAN/Aadhaar User ID input field

## Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select the `tds-extension` directory
5. Extension icon will appear in toolbar

## Usage

1. Navigate to Income Tax Portal
2. Fill out form fields
3. Click extension icon → "Save Form"
4. On return visits, click "Prefill Form" to restore data

## Configuration

To add more form fields, edit `src/content/content.js`:

```javascript
const FORM_FIELDS = {
  ...
};
```

## Security

- Data stored locally in browser only
- No external server communication
- Restricted to Income Tax Portal domain
- Uses Chrome's secure storage API
