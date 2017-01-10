import React, {PropTypes} from 'react';
import {Modal, Button, Steps, InputNumber, Row, Col, Card, Icon, Popover} from 'antd';
import Spinner from 'react-spinkit';
const Step = Steps.Step;

let FollowerUserModal = (props) => {
  // console.log("FollowerUserModal props", props);
  const finish = () => {
        return props.followModalClose();
  };
  
  const step3PopOver = (<div>
    <ul>
      <li>每次手动添加，会根据你设置的条件，随机添加至多12位好友</li>
      <li>随着GitMax用户数增加，GitMax会继续随机为您添加满足条件的好友，直到达到你设置的好友总数</li>
    </ul>
  </div>);
  
  const steps = [{
    title: '开始添加',
    content: <div>
      <div style={{marginTop: 150}}>
        <Spinner spinnerName='double-bounce' noFadeIn/>
        <p>正在为您添加好友，请稍候...</p>
      </div>
    </div>,
    description: "好友添加中...",
  }, {
    title: '添加成功',
    content: props.newFriends.length > 0
        ?
        <div>
          <Row>
            <Col span={8} offset={1}>
              <img style={{width: 350}} src="images/welcometocat.png"/>
            
            </Col>
            <Col span={13} offset={1}>
              <Row>
                <h2>{`GixMax为您成功添加 ${props.newFriends.length} 位好友 `}
                  <Popover placement="top" title={"好友添加说明"} content={step3PopOver} trigger="hover">
                    <a><Icon type="question-circle-o" className="h1-question-mark"/></a>
                  </Popover>
                </h2>
                <p>每次手动添加，需间隔 24 小时</p>
              </Row>
              <Row gutter={8} type="flex" justify="space-around"
                   className={"new-friends-container"}>
                {
                  props.newFriends.slice(0, 12).map(friend => {
                    return <Col span="4" className="follower-col">
                      <Card bodyStyle={{padding: 10}}>
                        <div className="new-friend-image">
                          <a href={"https://github.com/" + friend.login} target="_blank">
                            <img alt="example" width="100%" src={friend.avatar_url}/>
                          </a>
                        </div>
                        <div className="friend-card">
                        <span>
                          {friend.name ? friend.name : friend.login}
                        </span>
                        </div>
                      </Card>
                    </Col>
                  })
                }
              </Row>
              <Row>
                <p>快去你的GitHub账户，
                  <a href={`https://www.github.com/${props.user.login}/followers`} target="_blank">
                    看看{props.newFriends.length > 12 ? "更多" : "这些"}新朋友吧
                  </a>
                </p>
              </Row>
            </Col>
          </Row>
        </div>
        :
        <div>
          <Row>
            <Col span={8} offset={1}>
              <img style={{width: 350}} src="images/maxtocat.gif"/>
            </Col>
            <Col span={13} offset={1}>
              <Row>
                <h2>{`抱歉，GixMax没有为你找到新的好友`}
                </h2>
                <p>GitMax用户中没有满足条件的用户了</p>
              </Row>
              <Row className="not-found-row2">
                <p className="first-row">您可以选择：</p>
                <p>不做修改：随着用户数增加，GitMax会为你筛选符合条件的用户加为好友</p>
                <p className="or"> 或者 </p>
                <p>修改好友添加条件，再试一次</p>
              </Row>
            </Col>
          </Row>
        </div>
    ,
    description: "好友添加完成",
  }];
  
  const modalFooter = <div>
    {
      props.current === 0
      &&
      <Button key="back" type="ghost" size="large"
              onClick={props.followModalClose}>取消</Button>
    }
    {
      props.current === 1
      &&
      <Button key="finish" type="primary" size="large" onClick={finish}>
        完成
      </Button>
    }
  </div>;
  
  return (
      <div>
        <Modal
            visible={props.visible}
            maskClosable={false}
            closable={false}
            width={1100}
            wrapClassName="vertical-center-modal"
            footer={modalFooter}
        >
          <div style={{margin: 20}}>
            <Steps current={props.current}>
              {steps.map(item => <Step key={item.title} title={item.title}
                                       description={item.description}/>)}
            </Steps>
            <div className="steps-content">{steps[props.current].content}</div>
          </div>
        </Modal>
      </div>
  );
};

FollowerUserModal.propTypes = {
  user: PropTypes.object,
  visible: PropTypes.bool,
  current: PropTypes.number,
  followModalOpen: PropTypes.func,
  followModalClose: PropTypes.func,
  followModalNextStep: PropTypes.array,
  followModalPrevStep: PropTypes.func,
  newFriends: PropTypes.array,
  // isFollowing: PropTypes.bool,
  // onCloseModal: PropTypes.func,
  // userLoginStr: PropTypes.string,
};

FollowerUserModal.defaultProps = {
};

export default FollowerUserModal;

