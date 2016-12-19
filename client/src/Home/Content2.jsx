import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

class Content extends React.Component {

  static propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
  };

  static defaultProps = {
    className: 'content1',
  };

  render() {
    return (
      <div
        {...this.props}
        className="content-template-wrapper content-half-wrapper"
      >
        <OverPack
          className={`content-template ${this.props.className}`}
          hideProps={{ img: { reverse: true } }}
          location={this.props.id}
        >
          <QueueAnim
            type="left"
            className={`${this.props.className}-text`}
            key="text"
            leaveReverse
            ease={['easeOutCubic', 'easeInCubic']}
          >
            <h1
              key="h1"
            >
              分布式中间件
            </h1>
            <p
              key="p"
            >
              金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。
            </p>
          </QueueAnim>
          <TweenOne
            key="img"
            animation={{ x: '+=30', opacity: 0, type: 'from' }}
            className={`${this.props.className}-img`}
          >
            <span
            >
              <img width="100%" src="https://zos.alipayobjects.com/rmsportal/tvQTfCupGUFKSfQ.png" />
            </span>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}


export default Content;
