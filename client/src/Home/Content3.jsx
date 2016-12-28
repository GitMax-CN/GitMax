import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import {Row, Col, Button} from 'antd';

class Content extends React.Component {

  static propTypes = {
    id: React.PropTypes.string,
    dataSource: React.PropTypes.object,
  };

  static defaultProps = {
    className: 'content7',
  };

  getBlockChildren = (item, i) =>
    (<li key={i} style={item.style}>
        <div className="icon" style={item.children.icon.style}>
          <img src={item.children.icon.children} width="100%" />
        </div>
        <h3 style={item.children.title.style}>{item.children.title.children}</h3>
        <p style={item.children.content.style}>{item.children.content.children}</p>
      </li>
    );

  render() {
    const dataSource = [
      { children: { icon: { children: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png' }, title: { children: '添加好友原理是什么？' }, content: { children: '使用GitMax的用户登录Github，之后GitMax为你们相互follow，添加Github好友基数' } } },
      { children: { icon: { children: 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png' }, title: { children: 'GitMax收费吗？' }, content: { children: 'Gitmax添加好友服务免费，并会帮你维护与好友的相互follow状态，维护服务也是免费' } } },
      { children: { icon: { children: 'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png' }, title: { children: '可以删除GitMax为我添加的好友吗？' }, content: { children: '用户可以随时无理由删除好友 - 只需在Github中unfollow该好友。请注意GitMax会自动将你从该好友的follow列表中也删除。' } } },
    ];
    const listChildren = dataSource.map(this.getBlockChildren);
    return (
      <div
        {...this.props}
        className={`content-template-wrapper ${this.props.className}-wrapper`}
      >
        <OverPack
          className={`content-template ${this.props.className}`}
          hideProps={{ h1: { reverse: true } }}
          location={this.props.id}
        >
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            component="h1"
            key="h1"
            reverseDelay={300}
          >
            GitMax问答
          </TweenOne>
          <QueueAnim
            component="ul" type="bottom" key="block" leaveReverse
          >
            {listChildren}
  
            {/*<Row gutter={32} >*/}
              {/*<Col span={8} offset={8}>*/}
                {/*<Button type="primary" icon="github"*/}
                        {/*key="button" size="large" >*/}
                  {/*Github帐号登录*/}
                {/*</Button>*/}
              {/*</Col>*/}
            {/*</Row>*/}
            
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}


export default Content;
