import React from 'react';
import drawCircle from '../utilities/canvasLoadAnimation';

function Soc(props) {
  const canvas = document.querySelector(`.${props.socData.socWidgetId}`);
  drawCircle(canvas, props.socData.SOC.Value);

  return (
    <div className='col-sm-3 soc'>
      <h3> SOC </h3>
      <div className='canvas-wrapper'>
        <canvas
          className={props.socData.socWidgetId}
          width='200'
          height='200'
        ></canvas>
        <div className='soc-text'>
          {props.socData.SOC.Value} {props.socData.SOC.Unit}
        </div>
      </div>
    </div>
  );
}

export default Soc;
