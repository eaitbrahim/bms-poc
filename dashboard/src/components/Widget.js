import React, { Component } from 'react';
import Soc from './Soc';
import Voltage from './Voltage';
import Info from './Info';
import './Widget.css';

class Widget extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      BusinessUnit,
      EdgeHWRSN,
      EdgeSWRVer,
      BMSHWRSN,
      BMSSWRVer,
      localtime,
      ReqWCheck,
      ReqWoutCheck,
      ClearFault,
      EnBalance,
      DV,
      SOC,
      AError,
      AWarning,
      IChgLimit,
      IDsgLimit,
      SOH,
      VBattery,
      IBattery,
      VCellMin,
      VCellMinID,
      VCellMax,
      VCellMaxID,
      TModMin,
      HV2,
      TModMax,
      TModMinID,
      macA,
      isActive
    } = this.props.data;

    const socWidgetId = `soc-widget-${macA}`;
    const voltageWidgetId = `voltage-widget-${macA}`;
    const soc = { SOC, socWidgetId };
    const voltage = {
      DV,
      VBattery,
      IBattery,
      VCellMin,
      VCellMinID,
      VCellMax,
      VCellMaxID,
      voltageWidgetId,
      HV2
    };
    const info = {
      BusinessUnit,
      EdgeHWRSN,
      EdgeSWRVer,
      BMSHWRSN,
      BMSSWRVer,
      localtime,
      ReqWCheck,
      ReqWoutCheck,
      ClearFault,
      EnBalance,
      IChgLimit,
      IDsgLimit,
      SOH
    };
    const alarm = { AWarning, AError };
    const temperature = { TModMin, TModMax, TModMinID };

    let notActiveDiv = '';
    if (!isActive) {
      notActiveDiv = <div className='not-active'>Offline</div>;
    }

    return (
      <div className='container'>
        <div className='widget col-sm-12'>
          {notActiveDiv}

          <Soc socData={soc} />
          <Voltage voltageData={voltage} />
          <Info
            infoData={info}
            alarmData={alarm}
            temperatureData={temperature}
          />
        </div>
      </div>
    );
  }
}

export default Widget;
