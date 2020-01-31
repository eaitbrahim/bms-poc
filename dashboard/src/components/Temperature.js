import React from 'react';

function Temperature(props) {
  return (
    <div className='col-sm-3 soc'>
      <h3> Battery Temperature </h3>
      <ul>
        <li>
          <strong>TModMin: </strong>
          {props.temperatureData.TModMin.Value} (
          {props.temperatureData.TModMin.Unit})
        </li>
        <li>
          <strong>TModMax: </strong>
          {props.temperatureData.TModMax.Value} ({' '}
          {props.temperatureData.TModMin.Unit})
        </li>
        <li>
          <strong>TModMinID: </strong>
          {props.temperatureData.TModMinID.Value}
        </li>
      </ul>
    </div>
  );
}

export default Temperature;
