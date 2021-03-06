const os = require('os');
const io = require('socket.io-client');
const cron = require('node-cron');

const keys = require('./config/keys');
const performanceData = require('./performanceData');
const syncLog = require('./syncLog');

let socket = io(keys.clusterUrl);

socket.on('connect', () => {
  const nI = os.networkInterfaces();
  let macA;
  for (let key in nI) {
    // For testing purposes:
    // macA = Math.floor(Math.random() * 3) + 1;
    // break;

    // For production
    if (!nI[key][0].internal) {
      if (nI[key][0].mac === '00:00:00:00:00:00') {
        macA = Math.random()
          .toString(36)
          .substr(2, 15); // It's not a macA but it's unique enough for testing purpose
      } else {
        macA = nI[key][0].mac;
      }
      break;
    }
  }

  // client auth with simple key value
  socket.emit('clientAuth', '6677ytyty7677ghgd77793');

  // Initial read
  console.log(`${Date.now()} Sending intial primary data to the server...`);
  performanceData().then(allPerformanceData => {
    allPerformanceData.macA = macA;
    allPerformanceData.isActive = true;
    socket.emit('initPerfData', allPerformanceData);
  });

  // start sending over data on interval
  // let task = cron.schedule('1 * * * * *', () => {
  //   console.log(`${Date.now()} Sending primary data to the server...`);
  //   performanceData().then(allPerformanceData => {
  //     allPerformanceData.macA = macA;
  //     allPerformanceData.isActive = true;
  //     if (allPerformanceData.performanceData.length > 0) {
  //       socket.emit('perfData', allPerformanceData);
  //     }
  //   });
  // });
  let perfDataInterval = setInterval(() => {
    console.log(`${Date.now()} Sending primary data to the server...`);
    performanceData().then(allPerformanceData => {
      allPerformanceData.macA = macA;
      allPerformanceData.isActive = true;
      if (allPerformanceData.performanceData.length > 0) {
        socket.emit('perfData', allPerformanceData);
      }
    });
  }, keys.sendingOverDataInterval);

  socket.on('disconnect', () => {
    clearInterval(perfDataInterval);
    //task.destroy();
  });

  // allPerformanceData has been synced
  socket.on('synced', performanceData => syncLog(performanceData));
});
