# Snitch Extension

## About
This browser extension aims to enhance user privacy and safety while browsing the internet. Initially, the project was scoped to allow users to refuse cookies, block specific websites, and offer guidance on enhancing internet privacy. However, due to time constraints and other factors, these features were not completed.

Instead, the extension now uses the Web of Trust (WOT) API to assess and display the safety scores of websites. It provides users with an overall safety score and a child safety score, helping users make informed decisions about the websites they visit.

## Features
- **Safety Score Evaluation**: Leverages the Web of Trust API to evaluate and display the trustworthiness and child safety score of websites.

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/privacy-extension.git

2. Navigate to the project directory:
    ```bash
    cd privacy-extension

3. Install the dependencies:
    ```bash
    npm install

4. Build the project:
    ```bash
    npm run build

### Running
To run the extension locally:

1. Open Google Chrome.
2. Navigate to `chrome://extensions/`.
3. Enable "Developer Mode" at the top right.
4. Click "Load unpacked" and select the `build` folder in your project directory.
5. The extension should now be active in your browser.

