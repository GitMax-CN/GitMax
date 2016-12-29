import React, {PropTypes} from 'react';
import TweenOne from 'rc-tween-one';
import {Button, Menu, Dropdown} from 'antd';
import FollowerUserModalContainer from './FollowerUserModelContainer'
const Item = Menu.Item;

let Header = (props) => {
  
  const onBtnClick = () => {
    if (!props.user.id) {
      props.onUserLogin();
    } else {
      props.onUserLogout();
    }
  };
  
  const onMenuClick = ({item, key, keyPath}) => {
    // console.log("item, key, keyPath", item, key, keyPath);
    switch (key){
      case "2": props.onUserLogout();
    }
  };
  
  const menu = (
      <Menu onClick={onMenuClick}>
        <Menu.Item key="0">
          <a>添加好友设置</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href={`https://www.github.com/${props.user.login}/followers`} target="_blank">访问Github账户</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">登出</Menu.Item>
      </Menu>
  );
  
  const navData = {menu1: '导航一', menu2: '导航二', menu3: '导航三', menu4: '导航四'};
  const navChildren = Object.keys(navData)
      .map((key, i) => (<Item key={i}>{navData[key]}</Item>));
  
  return (<div>
    <TweenOne
        component="header"
        animation={{opacity: 0, type: 'from'}}
        id={props.id}
        className={props.className}
        style={{backgroundColor: '#ffffff', position: 'fixed'}}
    >
      <TweenOne
          className={`${props.className}-logo`}
          animation={{x: -30, type: 'from', ease: 'easeOutQuad'}}
      >
        <img width="100%" src="images/gitmax_logo_mono_horizontal2.png"/>
      </TweenOne>
  
      {
        props.user.id
          &&
        <Dropdown overlay={menu} trigger={['click']}>
          <TweenOne
              className={`${props.className}-user`}
              animation={{ x: 30, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad' }}
          >
            <a href="" className="user">
          <span className="img">
            <img
                src={props.user.avatar_url}
                width="30"
                height="30"
            />
          </span>
              <span>{props.user.name || props.user.login}</span>
            </a>
          </TweenOne>
        </Dropdown>
        
      }
      
      <TweenOne
          className={`${props.className}-nav`}
          animation={{x: 30, type: 'from', ease: 'easeOutQuad'}}
      >
        {
          !props.user.id
            &&
          <Button type="primary" icon="github" loading={props.user.isLogging}
                  key="button" size="large" onClick={onBtnClick}>
            GitHub帐号登录
          </Button>
        }
        
        {/*<Menu*/}
        {/*mode="horizontal" defaultSelectedKeys={['a']}*/}
        {/*style={{ color: '#ffffff' }}*/}
        {/*>*/}
        {/*{navChildren}*/}
        {/*</Menu>*/}
      </TweenOne>
      
    </TweenOne>
    <FollowerUserModalContainer />
  </div>);
};

Header.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  user: PropTypes.object,
  onUserLogin: PropTypes.func,
  onUserLogout: PropTypes.func,
  isFollowing: PropTypes.bool,
};

Header.defaultProps = {
  className: 'header1',
  user: {
    isLogging: false
  }
};

export default Header;
