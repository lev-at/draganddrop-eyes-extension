const {Eyes, Target, Configuration, BatchInfo} = require('@applitools/eyes-images')
import 'core-js'

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      if (msg.type === 'uploadImage') {
        loadImg(msg.data);
      }
    });
  });

  async function loadImg(imageData){

    let eyes 
    eyes = new Eyes()

    // Initialize the eyes configuration
    const configuration = new Configuration();

    configuration.setApiKey('euFn9D3orGU7VFLJ5V2o102103Wkvx3AX0D8LeLu7R4HUz8110')

    // Set new batch
    configuration.setBatch(new BatchInfo('Demo batch'))

    // Set the configuration to eyes
    eyes.setConfiguration(configuration);

    await uploadIt(eyes,imageData);


}

async function uploadIt(eyes,imageData)
{

  await eyes.open('Applitools site', 'Screenshot test!', {width: 800, height: 600})

  await eyes.check('Buffer', Target.base64(imageData.split(',')[1]))
  
  await eyes.close(false)

}
