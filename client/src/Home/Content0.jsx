import React, { PropTypes } from 'react';
import Button from 'antd/lib/button';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Icon from 'antd/lib/icon';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

class Content extends React.Component {
  render() {
    return (
      <OverPack
        replay
        playScale={[0.3, 0.1]}
        {...this.props}
        style={{ backgroundColor: '#585858' }}
        hideProps={{ icon: { reverse: true } }}
      >
        <QueueAnim
          type={['bottom', 'top']}
          delay={200}
          className={`${this.props.className}-wrapper`}
          key="text"
        >
          <span
            className="title"
            key="title"
          >
            <img width="100%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />
          </span>
          <p
            key="content"
          >
            一个高效的页面动画解决方案
          </p>
          <Button type="ghost" key="button">
            Learn More
          </Button>
        </QueueAnim>
        <TweenOne
          animation={{ y: '-=20', yoyo: true, repeat: -1, duration: 1000 }}
          className={`${this.props.className}-icon`}
          key="icon"
        >
          <Icon type="down" />
        </TweenOne>
      </OverPack>
    );
  }
}

Content.propTypes = {
  className: PropTypes.string,
};

Content.defaultProps = {
  className: 'banner0',
};

export default Content;
