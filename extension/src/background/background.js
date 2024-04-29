// Use the chrome.runtime.onInstalled event to handle installation logic
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
    // Perform initial setup if necessary
});

// Use the chrome.runtime.onMessage event to handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchSafetyData') {
        const wotApiUrl = 'https://scorecard.api.mywot.com/v3/targets';
        const targets = request.target;
        const fullUrl = `${wotApiUrl}?t=${targets}`;

        console.log(`Sending request to: ${fullUrl}`);

        // Use the browser Fetch API to make an API request ***Remove later***
        fetch(fullUrl, {
            headers: {
                'x-user-id': '8986619',
                'x-api-key': '814448b67590c365aee1302e68b7fbf52588b1eb',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Received data:", data);
                sendResponse({ success: true, data });
            })
            .catch(error => {
                console.error('Error fetching safety data', error);
                sendResponse({ success: false, error: error.message || 'Unknown error' });
            });

        return true;
    }
});
