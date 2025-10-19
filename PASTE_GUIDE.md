# HTML Fragment Paste Guide

This guide shows you exactly where to paste your exported HTML for each screen in the Valuation Agent Platform.

## Fragment Mapping Table

| Screen | Paste into file |
|--------|------------------|
| Dashboard | `/public/fragments/dashboard.html` |
| Runs List | `/public/fragments/runs-list.html` |
| Run Detail | `/public/fragments/run-detail.html` |
| Intake | `/public/fragments/intake.html` |
| Curves | `/public/fragments/curves.html` |
| Instruments | `/public/fragments/instruments.html` |
| XVA | `/public/fragments/xva.html` |
| Governance | `/public/fragments/governance.html` |
| Audit Log | `/public/fragments/audit-log.html` |
| Settings | `/public/fragments/settings.html` |

## How to Use

1. **Export your HTML** from UXPilot or your design tool
2. **Navigate to the corresponding screen** in the application
3. **Copy the fragment path** using the "Copy path" button on each page
4. **Open the file** in your editor (e.g., VS Code)
5. **Paste your raw HTML** into the file
6. **Save the file** - changes will appear immediately in the browser

## Fragment File Structure

```
frontend/
├── public/
│   └── fragments/
│       ├── dashboard.html
│       ├── runs-list.html
│       ├── run-detail.html
│       ├── intake.html
│       ├── curves.html
│       ├── instruments.html
│       ├── xva.html
│       ├── governance.html
│       ├── audit-log.html
│       └── settings.html
```

## Checking Fragment Status

Run the following command to check the status of all fragment files:

```bash
pnpm check:fragments
```

This will show you:
- Which fragments exist
- File sizes
- Warnings for empty fragments (< 5 bytes)

## HTML Hydration Attributes

You can add special attributes to your HTML to make it interactive with the Next.js application:

### Navigation Links
```html
<a data-route="/runs">View Runs</a>
<a data-route="/settings">Settings</a>
```
- **`data-route`**: Converts regular links to client-side Next.js navigation
- **Visual**: Links get underlined and cursor pointer styling

### Copy to Clipboard
```html
<button data-copy="Hello World">Copy Text</button>
<span data-copy="user@example.com">Copy Email</span>
```
- **`data-copy`**: Copies the attribute value to clipboard when clicked
- **Visual**: Buttons get blue styling, shows "Copied!" feedback
- **Fallback**: Shows "Copy failed" if clipboard access is denied

### Open Sheet Panel
```html
<button data-open="sheet">Open Chat</button>
<div data-open="sheet">Get Help</div>
```
- **`data-open="sheet"`**: Opens the right dock chat panel
- **Visual**: Elements get violet styling and cursor pointer
- **Event**: Dispatches custom event to AppShell

## Notes

- **Raw HTML**: Paste your HTML exactly as exported - no need to convert classes or modify the markup
- **Live Reload**: Changes to fragment files are immediately visible in the browser
- **File Size**: Empty fragments should be < 5 bytes (just comments)
- **Backup**: Consider backing up your fragment files before making changes
- **Hydration**: Special attributes are automatically processed after HTML injection
