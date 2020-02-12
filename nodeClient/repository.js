class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  getSystemInfo(id) {
    return this.dao.get(`SELECT * FROM System WHERE Id = ?`, [id]);
  }

  getNewPrimaryData() {
    return this.dao.all(
      `SELECT * FROM PrimaryData P INNER JOIN SyncLog S ON P.Id = S.PrimaryDataId WHERE S.Synced = 0`,
      []
    );
  }

  updateSyncLog(syncLog) {
    const { SyncDate, SyncComment, Synced, performanceData } = syncLog;
    return this.dao.run(
      `UPDATE SyncLog SET SyncDate=?, SyncComment=?, Synced=? WHERE PrimaryDataId IN (${performanceData.join(
        ','
      )})`,
      [SyncDate, SyncComment, Synced]
    );
  }

  deleteOldSyncLog(fromDate) {
    return this.dao.run(`DELETE FROM SyncLog WHERE SyncDate <= ?`, [fromDate]);
  }

  deleteOldPrimaryDate(fromDate) {
    return this.dao.run(`DELETE FROM PrimaryData WHERE CreatedAt <= ?`, [
      fromDate
    ]);
  }
}

module.exports = Repository;
