document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.getElementById('saveBtn');
    const prefillBtn = document.getElementById('prefillBtn');
    const status = document.getElementById('status');

    function setStatus(message) {
        status.textContent = message;
    }

    async function sendMessageToContentScript(action) {
        setStatus('Loading...');
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab.url.startsWith('https://eportal.incometax.gov.in/')) {
                setStatus('Please navigate to the Income Tax portal first.');
                return;
            }

            try {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['src/content/content.js']
                });
            } catch (injectionError) {
                console.log('Content script injection attempt:', injectionError.message);
            }

            setTimeout(async () => {
                try {
                    await chrome.tabs.sendMessage(tab.id, { action });
                    setStatus(`${action} completed!`);
                } catch (messageError) {
                    console.error('Message error:', messageError);
                    setStatus('Please refresh the page and try again.');
                }
            }, 100);

        } catch (error) {
            console.error('Error:', error);
            setStatus('Error: Could not perform action.');
        }
    }

    saveBtn.addEventListener('click', function() {
        sendMessageToContentScript('saveForm');
    });

    prefillBtn.addEventListener('click', function() {
        sendMessageToContentScript('prefillForm');
    });

    setInterval(() => {
        if (status.textContent && status.textContent !== '') {
            setTimeout(() => setStatus(''), 3000);
        }
    }, 100);
});