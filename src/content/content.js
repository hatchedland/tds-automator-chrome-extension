
const FORM_FIELDS = {
  panAdhaarUserId: 'input[id="panAdhaarUserId"]',
};

const STORAGE_KEY = 'formData';

function saveFormData() {
  const data = {};
  let formFound = false;
  for (const key in FORM_FIELDS) {
    const selector = FORM_FIELDS[key];
    const element = document.querySelector(selector);
    if (element) {
      data[key] = element.value;
      formFound = true;
    }
  }

  if (formFound) {
    chrome.storage.local.set({ [STORAGE_KEY]: data }, () => {
      console.log('Form data saved:', data);
    });
  } else {
    console.error('Could not find form fields to save.');
  }
}

function prefillFormData() {
  chrome.storage.local.get(STORAGE_KEY, (result) => {
    const savedData = result[STORAGE_KEY];
    if (savedData) {
      console.log('Found saved data:', savedData);
      for (const key in savedData) {
        const selector = FORM_FIELDS[key];
        const element = document.querySelector(selector);
        if (element) {
          element.value = savedData[key];
          console.log(`Prefilled ${key} with value: ${savedData[key]}`);
        }
      }
    } else {
      console.log('No saved form data found.');
    }
  });
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'saveForm') {
    saveFormData();
  } else if (request.action === 'prefillForm') {
    prefillFormData();
  }
});

window.addEventListener('load', () => {
  prefillFormData();
});
