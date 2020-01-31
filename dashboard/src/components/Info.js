import React from 'react';
import Alarm from './Alarm';
import Temperature from './Temperature';

function Info(props) {
  return (
    <div>
      <div className='col-sm-6 soc'>
        <h3> Battery Info </h3>
        <table class='table'>
          <thead>
            <tr>
              <th scope='col'>BusinessUnit</th>
              <th scope='col'>EdgeHWRSN</th>
              <th scope='col'>EdgeSWRVer</th>
              <th scope='col'>BMSHWRSN</th>
              <th scope='col'>BMSSWRVer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.infoData.BusinessUnit}</td>
              <td>{props.infoData.EdgeHWRSN}</td>
              <td>{props.infoData.EdgeSWRVer}</td>
              <td>{props.infoData.BMSHWRSN}</td>
              <td>{props.infoData.BMSSWRVer}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Alarm alarmData={props.alarmData} />
        <Temperature temperatureData={props.temperatureData} />
      </div>
    </div>
  );
}

export default Info;
