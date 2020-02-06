const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Battery = new Schema({
  macA: String,
  BusinessUnit: String,
  EdgeHWRSN: String,
  EdgeSWRVer: String,
  BMSHWRSN: String,
  BMSSWRVer: String,
  localtime: {
    Description: String,
    Value: Date
  },
  ReqWCheck: {
    Description: String,
    Value: String
  },
  ReqWoutCheck: {
    Description: String,
    Value: String
  },
  ClearFault: {
    Description: String,
    Value: String
  },
  EnBalance: {
    Description: String,
    Value: String
  },
  DV: {
    Description: String,
    Unit: String,
    Value: String
  },
  SOC: {
    Description: String,
    Unit: String,
    Value: Number
  },
  AError: {
    Description: String,
    Unit: String,
    Value: String
  },
  AWarning: {
    Description: String,
    Unit: String,
    Value: String
  },
  IChgLimit: {
    Description: String,
    Unit: String,
    Value: Number
  },
  IDsgLimit: {
    Description: String,
    Unit: String,
    Value: Number
  },
  SOH: {
    Description: String,
    Unit: String,
    Value: Number
  },
  VBattery: {
    Description: String,
    Unit: String,
    Value: Number
  },
  IBattery: {
    Description: String,
    Unit: String,
    Value: Number
  },
  VCellMin: {
    Description: String,
    Unit: String,
    Value: Number
  },
  VCellMinID: {
    Description: String,
    Value: Number
  },
  VCellMax: {
    Description: String,
    Unit: String,
    Value: Number
  },
  VCellMaxID: {
    Description: String,
    Value: Number
  },
  TModMin: {
    Description: String,
    Unit: String,
    Value: Number
  },
  HV2: {
    Description: String,
    Unit: String,
    Value: Number
  },
  TModMax: {
    Description: String,
    Unit: String,
    Value: Number
  },
  TModMinID: {
    Description: String,
    Value: Number
  },
  ErrorFlags: {
    Description: String,
    Value: Number
  },
  WarningFlags: {
    Description: String,
    Value: Number
  }
});

module.exports = mongoose.model('Battery', Battery);
