var port = chrome.runtime.connect();

window.onload = function() {

  function read(key) {
    return new Promise((resolve, reject) => {
        if (key != null) {
            chrome.storage.local.get(key, function (obj) {
                resolve(obj);
            });
        } else {
            reject(null);
        }
    });
}


  var dropArea = document.getElementById("drop-area");
  var fileName = document.getElementById("file-name");
  var runButton = document.getElementById("run-test-btn");

  dropArea.addEventListener("dragover", function(event) {
    event.preventDefault();
    dropArea.classList.add("dragover");
  });

  dropArea.addEventListener("dragleave", function(event) {
    event.preventDefault();
    dropArea.classList.remove("dragover");
  });

  dropArea.addEventListener("drop", function(event) {
    event.preventDefault();
    dropArea.classList.remove("dragover");
    var file = event.dataTransfer.files[0];
    fileName.innerText = file.name;
    runButton.disabled = false;
    runButton.addEventListener("click", function() {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async function() {
        var imageData = reader.result;
        var testName = document.getElementById("testname").value;
        var appName = document.getElementById("appname").value;
        var apiKey,serverUrl;

        const result = await read(['apikey', 'serverurl']);
        apiKey = result.apikey  || '';
        serverUrl = result.serverurl || '';
  
        port.postMessage({type: 'uploadImage', data: {imageData: imageData, testName: testName, appName: appName, apiKey: apiKey, serverUrl: serverUrl}});
      }
    });
  });

  runButton.disabled = true;
  
};
