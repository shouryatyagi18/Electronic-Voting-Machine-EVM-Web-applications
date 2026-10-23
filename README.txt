Future Electronic Voting Machine — Separate Login Page Demo

Files:
- login.html: separate voter login form
- login.js: login form validation; stores only demo session fields
- index.html: voting interface; checks session and links back to login if needed
- script.js: voting UI and demo vote tally logic
- style.css: shared styles

How to run:
1. Keep all five files in the same folder.
2. Extract the ZIP first; do not try to run the HTML file from inside the ZIP preview.
3. Open the extracted folder and double-click login.html. Keep all files together in that folder.
4. Complete the demo form and select "Continue to voting demo".
5. The browser navigates to index.html. Use "Back to login" to end the demo session.

Important:
This is a front-end educational demo only, not an official voting service. The login does not verify Aadhaar, voter ID, or government records. Do not enter full Aadhaar numbers, OTPs, or real personal details. Votes are stored locally in the browser and are not secure or official.

Troubleshooting:
- If opening login.html directly does not navigate correctly in your browser, open the extracted folder in VS Code and use the Live Server extension.
- Use a date of birth and age that match. Aadhaar last 4 digits and mobile number are optional.


RESULT PANEL PASSWORD
Default demo password: admin123
To change it, open script.js and edit RESULT_PANEL_PASSWORD. This is only front-end demo protection; anyone with access to the source code can discover the password. Do not use it for real or sensitive election results.
