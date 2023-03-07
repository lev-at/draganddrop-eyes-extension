document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the saved API key and server URL from storage and set them as the default values for the input fields
    chrome.storage.local.get(['apikey', 'serverurl'], function(result) {
      document.getElementById('apikey').value = result.apikey || '';
      document.getElementById('serverurl').value = result.serverurl || '';
    });
  
    // Save the input field values to storage when the Save button is clicked
    document.getElementById('save-btn').addEventListener('click', function() {
      var apikey = document.getElementById('apikey').value;
      var serverurl = document.getElementById('serverurl').value;
      chrome.storage.local.set({ apikey: apikey, serverurl: serverurl }, function() {
        console.log('Settings saved.');
      });
    });
  });
  