const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const System = new Schema({
  macA: String,
  ConfigVer: String,
  BusinessUnit: String,
  EdgeHWRSN: String,
  EdgeSWRVer: String,
  BMSHWRSN: String,
  BMSSWRVer: String,
  performanceData: [
    {
      Id: Number,
      Localtime: Date,
      HB1: Number,
      SOC: Number,
      SOCMax: Number,
      SOCMin: Number,
      IChgLimit: Number,
      IDsgLimit: Number,
      HB2: Number,
      SOH: Number,
      OpStatus: Number,
      RlyStatus: Number,
      VBattery: Number,
      IBattery: Number,
      VCellMin: Number,
      VCellMinID: Number,
      VCellMax: Number,
      VCellMaxID: Number,
      TModMin: Number,
      TModAvg: Number,
      TModMax: Number,
      TModMinID: Number,
      TModMaxID: Number,
      HIBattery: Number,
      reserved: Number
    }
  ]
});

module.exports = mongoose.model('System', System);
