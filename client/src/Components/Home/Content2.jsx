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
              hideProps={{img: {reverse: true}}}
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
                找到认识的他们
              </h1>
              <p
                  key="p"
              >
                社交网络上好友虽多，Github上却不认识几个？GitMax帮你在Github上寻找熟人。编程之路从此与他们结伴同行。
              </p>
            </QueueAnim>
            <TweenOne
                key="img"
                animation={{x: '+=30', opacity: 0, type: 'from'}}
                className={`${this.props.className}-img`}
            >
            <span style={{width: '75%', right: '5%'}}>
              <img width="100%" src="images/filmtocat.png"/>
            </span>
            </TweenOne>
          </OverPack>
        </div>
    );
  }
}


export default Content;
