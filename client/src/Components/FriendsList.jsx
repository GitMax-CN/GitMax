import React from 'react';
import {Button} from 'antd';

const FriendsList = (props) => {
  
  return <div>
    <h1 id="GitMax好友列表">
      <span>GitMax好友列表</span>
      <a href="#GitMax好友列表" className="anchor">#</a>
    </h1>
    <Button type="primary" icon="reload" className = "refresh-btn"  onClick={() => props.onFetchFriends()}>
      刷新
    </Button>
  
  </div>
};

export default FriendsList;
