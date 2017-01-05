import React, {PropTypes} from 'react';
import EditableTableContainer from './EditableTableContainer';
import {Button} from 'antd';

let FollowerConfig = (props) => {
  // console.log("props", props);
  return <div>
      <h1 id="添加好友"><span>添加好友</span><a href="#添加好友" className="anchor">#</a></h1>
      <p>在此设置好友添加条件，并添加GitMax好友。</p>
      
      <EditableTableContainer />
      <div className="follow-btn">
        <Button type="primary" size="large" onClick={() => props.onStartFollow()}>开始添加</Button>
      </div>
  </div>
};

FollowerConfig.propTypes = {
  // crit_FollowersCount: PropTypes.obj,
  // crit_StargazersCount: PropTypes.number.isRequired,
  // addFollowersNow: PropTypes.number,
  // addFollowersMax: PropTypes.number,
  // followModalPrevStep: PropTypes.func,
  // followModalNextStep: PropTypes.func,
  // showMessage: PropTypes.func,
};

export default FollowerConfig;