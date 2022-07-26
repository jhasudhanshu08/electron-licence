const { ipcRenderer } = require('electron');
const fs = require("fs");
const readline = require("readline");
 
window.addEventListener('DOMContentLoaded', () => {
  const gate = document.getElementById('license-gate')
 
  gate.addEventListener('submit', async event => {
    event.preventDefault()
 
    const data = new FormData(gate)
    const key = data.get('key')
    const status = true

  //   fs.writeFileSync('licence.txt', key, err => {
  //     console.log("gate key", key)
  //     if(err) {
  //         console.log("error");
  //     }
  // })
 
    // setTimeout();
    // console.log(key);
    // sleep(5000).then(() => {
      ipcRenderer.send('GATE_SUBMIT', { key, status })
      console.log("gatejs ", key);
    // })
    
  })
})