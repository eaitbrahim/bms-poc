import React from 'react';
import drawCircle from '../utilities/canvasLoadAnimation';

function Voltage(props) {
  const canvas = document.querySelector(
    `.${props.voltageData.voltageWidgetId}`
  );
  drawCircle(canvas, props.voltageData.VBattery.value);

  return (
    <div className='col-sm-3 soc'>
      <h3> Battery voltage </h3>
      <div className='canvas-wrapper'>
        <canvas
          className={props.voltageData.voltageWidgetId}
          width='200'
          height='200'
        ></canvas>
        <div className='voltage-text'>
          {props.voltageData.VBattery.value} ({props.voltageData.VBattery.Unit})
        </div>
      </div>
    </div>
  );
}

export default Voltage;
