// const fs = require('fs');
const sqlite3 = require('sqlite3');

let data = {
  ConfigVer: '',
  BusinessUnit: '',
  EdgeHWRSN: '',
  EdgeSWRVer: '',
  BMSHWRSN: '',
  BMSSWRVer: '',
  performanceData: []
};

function performanceData() {
  return new Promise(async (resolve, reject) => {
    // fs.readFile('./lifeTimeData.json', (err, data) => {
    //   if (err) {
    //     throw err;
    //     reject(err);
    //   }
    //   const formattedData = JSON.parse(data);
    //   formattedData.localtime.Value = new Date();
    //   formattedData.SOC.value = Math.floor(Math.random() * 99) + 1;
    //   formattedData.SOH.value = Math.floor(Math.random() * 30) + 1;
    //   formattedData.VBattery.value = Math.floor(Math.random() * 30) + 1;
    //   formattedData.IBattery.value = Math.floor(Math.random() * 30) + 1;
    //   formattedData.HV2.value = Math.floor(Math.random() * 30) + 1;
    //   resolve(formattedData);
    // });

    // Read data from db
    let db = new sqlite3.Database('./db/bms.db', sqlite3.OPEN_READONLY, err => {
      if (err) {
        throw err.message;
        reject(err.message);
      }
      console.log('Connected to the bms database for readonly');
    });

    db.parallelize(() => {
      readSystem(db);
      readNotSyncedPrimaryData(db);
    });

    db.close(err => {
      if (err) {
        throw err.message;
        reject(err.message);
      }

      resolve(data);
      console.log('Close the database connection');
    });
  });
}

function readSystem(db) {
  db.each(`SELECT * FROM System`, (err, row) => {
    if (err) {
      throw err.message;
      reject(err.message);
    }

    data.ConfigVer = row.ConfigVer;
    data.BusinessUnit = row.BusinessUnit;
    data.EdgeHWRSN = row.EdgeHWRSN;
    data.EdgeSWRVer = row.EdgeSWRVer;
    data.BMSHWRSN = row.BMSHWRSN;
    data.BMSSWRVer = row.BMSSWRVer;
  });
}

function readNotSyncedPrimaryData(db) {
  db.each(
    `SELECT * FROM PrimaryData P INNER JOIN SyncLog S ON P.Id = S.PrimaryDataId WHERE S.Synced = 0`,
    (err, row) => {
      if (err) {
        throw err.message;
        reject(err.message);
      }
      data.performanceData.push(row);
    }
  );
}

module.exports = performanceData;
