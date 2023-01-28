
var port = chrome.runtime.connect();

window.onload = function() {
    var dropArea = document.getElementById("drop-area");

var dropArea = document.getElementById("drop-area");

dropArea.addEventListener("dragover", function(event) {
  event.preventDefault();
});

dropArea.addEventListener("drop", function(event) {
  event.preventDefault();
  var file = event.dataTransfer.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    var imageData = reader.result;
    port.postMessage({type: 'uploadImage', data: imageData});
  }

}); }

