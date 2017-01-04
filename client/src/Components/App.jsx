import React from 'react';
import {Menu, Row, Col} from 'antd';
import {Link} from 'react-router';
import Content1 from './Home/Content1';
import Content2 from './Home/Content2';
import Content3 from './Home/Content3';
import AppNavContainer from './AppNavContainer';
const SubMenu = Menu.SubMenu;

const App = (props) => {
  
  const handleClick = () => console.log("handleClick!");
  
  const leftBar = <Menu
      onClick={handleClick}
      style={{width: "100%", height: "100%"}}
      defaultOpenKeys={['sub1']}
      mode="inline"
  >
    <Menu.Item key="1"><Link to = "/app/addFollower">添加好友</Link></Menu.Item>
    <Menu.Item key="2"><Link to = "/app/friends">我的好友</Link></Menu.Item>
    {/*<Link to = "addUser"><Menu.Item key="1">添加好友</Menu.Item></Link>*/}
    {/*<Link to = "friends"><Menu.Item key="2">我的好友</Menu.Item></Link>*/}
    <Menu.Item key="3">登出</Menu.Item>
  </Menu>;
  
  return (
      <div>
        <div className="page-wrapper">
          <AppNavContainer />
          <div className="main-wrapper">
            <Row>
              <Col span={4}>
                {leftBar}
              </Col>
              
              <Col className="main-container" span={20}>
                {props.children}
              </Col>
            </Row>
          </div>
        </div>
      </div>
  );
};

export default App;