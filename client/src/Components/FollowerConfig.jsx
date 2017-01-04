import React, {PropTypes} from 'react';
import EditableTable from './EditableTable';

const FollowerConfig = (props) => {
  return <div>
    <div className="markdown">
      <h1 id="添加好友"><span>添加好友</span><a href="#添加好友" className="anchor">#</a></h1>
      <p>在此设置好友添加条件，并添加GitMax好友。</p>
    </div>
    <EditableTable />
    
  </div>
};

FollowerConfig.propTypes = {
  crit_FollowersCount: PropTypes.number,
  crit_StargazersCount: PropTypes.number,
  addFollowersNow: PropTypes.number,
  addFollowersMax: PropTypes.number,
  followModalPrevStep: PropTypes.func,
  followModalNextStep: PropTypes.func,
  showMessage: PropTypes.func,
};

export default FollowerConfig;