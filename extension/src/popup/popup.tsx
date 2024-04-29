import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import SafetyScoreCard from './SafetyScoreCard';

const Popup = () => {
    const [safetyData, setSafetyData] = useState({
        status: 'UNKNOWN',
        reputations: 0,
        confidence: 0,
    });
    const [childSafetyData, setChildSafetyData] = useState({
        reputations: 0,
        confidence: 0,
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const getCurrentTabUrl = async () => {
            let queryOptions = { active: true, currentWindow: true };
            let [tab] = await chrome.tabs.query(queryOptions);
            return tab.url; // Ensure tab.url is correctly retrieved
        };

        const fetchSafetyData = async () => {
            const url = await getCurrentTabUrl();
            if (!url) {
                console.error("URL is undefined.");
                setError("URL is undefined.");
                return;
            }
            const hostname = new URL(url).hostname;

            chrome.runtime.sendMessage({ action: 'fetchSafetyData', target: hostname }, (response) => {
                // Check if the response is not undefined and if the 'success' property exists
                if (response && response.success) {
                    // Ensure there's at least one item in the response array
                    if (Array.isArray(response.data) && response.data.length > 0) {
                        const safetyInfo = response.data[0];
                        setSafetyData(safetyInfo.safety || { status: 'UNKNOWN', reputations: 0, confidence: 0 });
                        if (typeof safetyInfo.childSafety === 'object' && safetyInfo.childSafety !== null) {
                            setChildSafetyData(safetyInfo.childSafety);
                        } else {
                            setChildSafetyData({ reputations: 0, confidence: 0 });
                        }
                    } else {
                        // If data is empty or not in the expected format
                        setError('Safety data is not available.');
                    }
                } else {
                    // If response does not indicate success or if response is undefined
                    setError(`Error fetching safety data: ${response?.error}`);
                }
            });



        };

        fetchSafetyData();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <SafetyScoreCard safetyData={safetyData} childSafetyData={childSafetyData} />
        </div>
    );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Popup />);
