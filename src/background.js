const {Eyes, Target, Configuration, BatchInfo} = require('@applitools/eyes-images')
import 'core-js'

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      if (msg.type === 'uploadImage') {
        loadImg(msg.data);
      }
    });
  });

  async function loadImg(data){

    var imageData=data.imageData;
    var testName=data.testName || 'Screenshot test!';
    var appName=data.appName || 'Drag and Drop Ext.';
    var apiKey=data.apiKey
    var serverUrl=data.serverUrl || 'https://eyesapi.applitools.com';

    let eyes 
    eyes = new Eyes()

    // Initialize the eyes configuration
    const configuration = eyes.getConfiguration();

    configuration.setApiKey(apiKey);
    configuration.setServerUrl(serverUrl);

    // Set new batch
    // configuration.setBatch(new BatchInfo('Demo batch'))

    // Set the configuration to eyes
    eyes.setConfiguration(configuration);

    await uploadIt(eyes,imageData,appName,testName);


}

async function uploadIt(eyes,imageData,appName,testName)
{

  await eyes.open(appName,testName, {width: 800, height: 600})

  await eyes.check('Buffer', Target.base64(imageData.split(',')[1]))
  
  await eyes.close(false)

}
