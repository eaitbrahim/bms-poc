const fs = require('fs');

function performanceData() {
  return new Promise(async (resolve, reject) => {
    fs.readFile('./lifeTimeData.json', (err, data) => {
      if (err) {
        throw err;
        reject(err);
      }
      const formattedData = JSON.parse(data);
      formattedData.localtime.Value = new Date();
      formattedData.SOH.value = Math.floor(Math.random() * 30) + 1;
      formattedData.VBattery.value = Math.floor(Math.random() * 30) + 1;
      formattedData.IBattery.value = Math.floor(Math.random() * 30) + 1;
      formattedData.HV2.value = Math.floor(Math.random() * 30) + 1;
      resolve(formattedData);
    });
  });
}

module.exports = performanceData;
