import React, { useState } from 'react';


const App = () => {
  const [status, setStatus] = useState('');

  const sendMessageToContentScript = async (action) => {
    setStatus('Loading...');
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.url.startsWith('https://eportal.incometax.gov.in/iec/foservices/#/login')) {
        await chrome.tabs.sendMessage(tab.id, { action });
        setStatus(`Action "${action}" sent!`);
      } else {
        setStatus('This extension only works on the specified website.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Error: Could not perform action.');
    }
  };

  const handleSaveClick = () => {
    sendMessageToContentScript('saveForm');
  };

  const handlePrefillClick = () => {
    sendMessageToContentScript('prefillForm');
  };

  return (
    <div className="p-4 w-64 bg-gray-100 rounded-lg shadow-xl font-sans flex flex-col items-center">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Form Automator</h1>
      <p className="text-sm text-gray-600 text-center mb-4">
        Click a button to save or prefill the form on the current page.
      </p>
      <div className="flex flex-col space-y-3 w-full">
        <button
          onClick={handleSaveClick}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Save Form
        </button>
        <button
          onClick={handlePrefillClick}
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Prefill Form
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-500 italic">{status}</p>
    </div>
  );
};

export default App;
