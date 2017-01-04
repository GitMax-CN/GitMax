import React from 'react';
import {Menu, Row, Col} from 'antd';
import {Link} from 'react-router';
import NavContainer from './Home/NavContainer';
import Footer from './Home/Footer';

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
    <Menu.Item key="3">登出</Menu.Item>
  </Menu>;
  
  return (
      <div>
        <div className="page-wrapper">
          <NavContainer router={props.router}/>
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
          <Footer/>
        </div>
      </div>
  );
};

export default App;