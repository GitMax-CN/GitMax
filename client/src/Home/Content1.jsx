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
    className: 'content0',
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
          <TweenOne
            key="img"
            animation={{ x: '-=30', opacity: 0, type: 'from' }}
            className={`${this.props.className}-img`}
          >
            <span style={{ width: '75%', right: '5%' }}>
              <img width="100%" src="images/plumber.jpg" />
            </span>
          </TweenOne>
          <QueueAnim
            className={`${this.props.className}-text`}
            key="text"
            leaveReverse
            ease={['easeOutCubic', 'easeInCubic']}
          >
            <h1
              key="h1"
            >
              添加Github Follower
            </h1>
            <p
              key="p"
            >
              水平虽好，其他人却不认识你？一心专注编程，没时间写博客，发知乎，译教程？GitMax替你找到同路人，互加好友，共同进步。
            </p>
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}


export default Content;
