const sqlite3 = require('sqlite3');

function syncLog(primaryData) {
  let db = new sqlite3.Database('./db/bms.db', sqlite3.OPEN_READWRITE, err => {
    if (err) {
      throw err.message;
    }
    console.log('Connected to the bms database for Sync');
  });

  primaryData.forEach(pd => {
    db.run(
      `UPDATE SyncLog SET SyncDate=?, SyncComment=?, Synced=1 WHERE PrimaryDataId=?`,
      [Date.now(), 'Success', pd.Id]
    );
  });

  db.close(err => {
    if (err) {
      throw err.message;
    }
    console.log('Close the sync database connection');
  });
}
module.exports = syncLog;
