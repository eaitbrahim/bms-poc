const mongoose = require('mongoose');

const keys = require('./config/keys');
const System = require('./models/System');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
});

function socketMain(io, socket) {
  let BMSHWRSN;
  socket.on('clientAuth', key => {
    if (key === '6677ytyty7677ghgd77793') {
      // valid nodeClient
      socket.join('clients');
    } else if (key === 'hghhg7878dfdfdfd232xcv') {
      // valid ui client has joined
      socket.join('ui');
      console.log('A dashboard has just joined');
      System.find({}, (err, docs) => {
        docs.forEach(aSystem => {
          // on load, assume that all batteries are offline
          aSystem.isActive = false;
          io.to('ui').emit('data', aSystem);
        });
      });
    } else {
      // an invalid client has joined. Goodbye
      socket.disconnect(true);
    }
  });

  socket.on('disconnect', () => {
    System.find({ BMSHWRSN: BMSHWRSN }, (err, docs) => {
      if (docs.length > 0) {
        // Send one last emit to UI
        docs[0].isActive = false;
        io.to('ui').emit('data', docs[0]);
      }
    });
  });

  // a System is connected, check to see if it's new.
  // if it's add it.
  socket.on('initPerfData', async data => {
    BMSHWRSN = data.BMSHWRSN;
    await checkAndAdd(data);
  });

  // Serve data into ui and Save perf data
  socket.on('perfData', async data => {
    console.log('perData called');
    io.to('ui').emit('data', data);
    const doc = await checkAndAdd(data);
    console.log('checkAndAdd called by perData');
    if (doc !== null) {
      console.log('doc found then do update...');
      updatePerformanceData(doc);
    }
  });
}

function updatePerformanceData(doc) {
  const syncedData = [];

  data.performanceData.forEach(async pd => {
    if (doc.performanceData.findIndex(d => d.Id === pd.Id) > -1) {
      System.updateOne(
        { BMSHWRSN: data.BMSHWRSN },
        { $push: { performanceData: { pd } } },
        err => {
          if (!err) {
            syncedData.push(pd);
          }
        }
      );
    }
  });
  console.log('syncedData:', syncedData);
  if (syncedData.length > 0) {
    console.log('Full syncedData:', syncedData);
    io.to('clients').emit('synced', syncedData);
  }
}

function checkAndAdd(data) {
  return new Promise((resolve, reject) => {
    System.findOne(
      {
        BMSHWRSN: data.BMSHWRSN
      },
      (err, doc) => {
        if (err) {
          throw err;
          reject(err);
        } else if (doc == null) {
          let newSystem = new System(data);
          newSystem.save();
          resolve('added');
        } else {
          resolve(doc);
        }
      }
    );
  });
}

module.exports = socketMain;
