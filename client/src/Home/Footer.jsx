import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

class Footer extends React.Component {
  static propTypes = {
    dataSource: React.PropTypes.object,
  };

  static defaultProps = {
    className: 'footer0',
  };

  render() {
    return (<OverPack
      {...this.props}
      playScale={0.05}
      hideProps={{ footer: { reverse: true } }}
    >
      <TweenOne
        animation={{ y: '+=30', opacity: 0, type: 'from' }}
        key="footer"
      >
        <span
        >
          版权 © 2016 The Project by <a href="#">GitMax</a> | 联系我们：
          <a href="mailto:support@gitmax.cn">support@gitmax.cn</a>
        </span>
      </TweenOne>
    </OverPack>);
  }
}

export default Footer;
