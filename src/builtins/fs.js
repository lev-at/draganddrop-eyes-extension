import browser from 'webextension-polyfill'
import * as path from 'path'

export async function readFile(filePath, _options, callback) {
  const directory = filePath.includes('dom-snapshot') ? 'dom-snapshot' : 'dom-capture'
  const fileUrl = browser.runtime.getURL(`assets/${directory}/${path.basename(filePath)}`)
  try {
    debugger
    const response = await fetch(fileUrl)
    const data = await response.text()
    debugger;
    callback(null, data)
    return data
  } catch (err) {
    callback(err)
    throw err
  }
}

export async function writeFile() {
  return null
}

export const promises ={
  readFile,
  writeFile,
}