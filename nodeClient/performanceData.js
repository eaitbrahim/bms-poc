const AppDAO = require('./dao');
const Repository = require('./repository');

const data = {
  ConfigVer: '',
  BusinessUnit: '',
  EdgeHWRSN: '',
  EdgeSWRVer: '',
  BMSHWRSN: '',
  BMSSWRVer: '',
  performanceData: []
};

const dao = new AppDAO('./db/bms.db');
const repo = new Repository(dao);

function performanceData() {
  return new Promise((resolve, reject) => {
    repo.getSystemInfo(1).then(system => {
      data.ConfigVer = system.ConfigVer;
      data.BusinessUnit = system.BusinessUnit;
      data.EdgeHWRSN = system.EdgeHWRSN;
      data.EdgeSWRVer = system.EdgeSWRVer;
      data.BMSHWRSN = system.BMSHWRSN;
      data.BMSSWRVer = system.BMSSWRVer;
    });

    repo
      .getNewPrimaryData()
      .then(newPrimaryData => {
        newPrimaryData.forEach(d => {
          data.performanceData.push(d);
        });
        return data;
      })
      .then(({ performanceData }) => {
        if (performanceData.length > 0) {
          repo.updateSyncLog({
            SyncDate: Date.now(),
            SyncComment: 'Processing',
            Synced: 2,
            performanceData: performanceData.map(d => d.Id)
          });
        }
      })
      .catch(err => {
        console.log(`Error: ${JSON.stringify(err)}`);
      });

    resolve(data);
  });
}

module.exports = performanceData;
