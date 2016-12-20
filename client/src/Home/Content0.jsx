import React, {PropTypes} from 'react';
import Button from 'antd/lib/button';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Icon from 'antd/lib/icon';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import {Link} from 'rc-scroll-anim';

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
            style={{ width: '450px' }}
          >
            <img width="100%" src="https://s3-us-west-2.amazonaws.com/gitmax.cn/images/gitmax_logo_mono.png" />
          </span>
          <p
              key="content"
          >
            一个帮你扩展Github影响力的工具
          </p>
  
          <Button type="ghost" key="button">
            <Link key={"Content1"} to={"Content1"} toHash={false}>
              了解一下
            </Link>
          </Button>
          
        </QueueAnim>
        <TweenOne
          animation={{ y: '-=20', yoyo: true, repeat: -1, duration: 1000 }}
          className={`${this.props.className}-icon`}
          key="icon"
        >
          <Link key={"Content1"} to={"Content1"} toHash={false}>
            <Icon type="down"/>
          </Link>
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
