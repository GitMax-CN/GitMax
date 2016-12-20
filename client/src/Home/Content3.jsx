import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

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
      { children: { icon: { children: 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png' }, title: { children: 'GitMax收费吗？' }, content: { children: 'Gitmax添加好友完全免费，用户需通过Github登录，之后GitMax会自动为你的Github账户添加follower' } } },
      { children: { icon: { children: 'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png' }, title: { children: '可以删除GitMax为我添加的好友吗？' }, content: { children: '当然可以，用户可以随时无理由删除好友。你只需要在Github中unfollow该好友即可。GitMax后台会自动将你从该好友的follow列表中也删除。' } } },
      { children: { icon: { children: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png' }, title: { children: '添加好友在Github里多久生效？' }, content: { children: '通常情况下，当用户登录成功后，在5分钟内即会完成添加follower' } } },
    ]
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
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}


export default Content;
