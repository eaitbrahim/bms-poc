const mongoose = require('mongoose');

const keys = require('./config/keys');
const Battery = require('./models/Battery');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
});

function socketMain(io, socket) {
  let macA;
  socket.on('clientAuth', key => {
    if (key === '6677ytyty7677ghgd77793') {
      // valid nodeClient
      socket.join('clients');
    } else if (key === 'hghhg7878dfdfdfd232xcv') {
      // valid ui client has joined
      socket.join('ui');
      console.log('A dashboard has just joined');
      Battery.find({}, (err, docs) => {
        docs.forEach(aBattery => {
          // on load, assume that all batteries are offline
          aBattery.isActive = false;
          io.to('ui').emit('data', aBattery);
        });
      });
    } else {
      // an invalid client has joined. Goodbye
      socket.disconnect(true);
    }
  });

  socket.on('disconnect', () => {
    Battery.find({ macA: macA }, (err, docs) => {
      if (docs.length > 0) {
        // Send one last emit to UI
        docs[0].isActive = false;
        io.to('ui').emit('data', docs[0]);
      }
    });
  });

  // a battery is connected, check to see if it's new.
  // if it's add it.
  socket.on('initPerfData', async data => {
    macA = data.macA;
    const mongooseResponse = await checkAndAdd(data);
    console.log('mongooseResponse: ', mongooseResponse);
  });

  socket.on('perfData', data => {
    io.to('ui').emit('data', data);
  });
}

function checkAndAdd(data) {
  return new Promise((resolve, reject) => {
    Battery.findOne(
      {
        macA: data.macA
      },
      (err, doc) => {
        if (err) {
          throw err;
          reject(err);
        } else if (doc == null) {
          let newBattery = new Battery(data);
          newBattery.save();
          resolve('added');
        } else {
          resolve('found');
        }
      }
    );
  });
}

module.exports = socketMain;
