import React from 'react'

export const Alert = (props) => (
  <div className="row" id="alert_box">
    <div className="col s12 m12">
      <div className={'card '+props.color+ ' darken-1'}>
        <div className="row">
          <div className="col s12 m12">
            <div className="card-content white-text">
              <p className="text-center">{props.message}</p>
          </div>
        </div>
      </div>
     </div>
    </div>
  </div>
);
