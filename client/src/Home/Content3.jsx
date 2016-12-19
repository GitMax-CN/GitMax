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
      { children: { icon: { children: 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png' }, title: { children: '一站式业务接入' }, content: { children: '支付、结算、核算接入产品效率翻四倍' } } },
      { children: { icon: { children: 'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png' }, title: { children: '一站式事中风险监控' }, content: { children: '在所有需求配置环节事前风险控制和质量控制能力' } } },
      { children: { icon: { children: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png' }, title: { children: '一站式数据运营' }, content: { children: '沉淀产品接入效率和运营小二工作效率数据' } } },
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
            产品与服务
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
