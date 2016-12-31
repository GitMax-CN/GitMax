import React, {PropTypes} from 'react';
import {Modal, Button, Steps, InputNumber, Row, Col, Card, Icon, Popover} from 'antd';
import Spinner from 'react-spinkit';
const Step = Steps.Step;

let FollowerUserModal = (props) => {
  console.log("props", props);
  let crit_FollowersCount = props.crit_FollowersCount,
      crit_StargazersCount = props.crit_StargazersCount,
      addFollowersNow = props.addFollowersNow,
      addFollowersMax = props.addFollowersMax;
  
  const next = () => {
    // 在modal的每一步中，'下一步'按钮对应传递的参数不同
    switch (props.current) {
      case 0:
        return props.followModalNextStep(props.current, {
          crit_FollowersCount,
          crit_StargazersCount,
          addFollowersNow,
          addFollowersMax,
        });
      case 1:
        return props.followModalNextStep(props.current);
      default:
        return props.followModalClose();
    }
  };
  
  const onChange = (value) => {
    console.log('changed', value);
    
  };
  
  const popOver = {
    content1: (<div>
      <p>点击 '下一步' 后，GitMax一次性在GitHub添加的Follower的数量上限（为保证稳定性，一次性最高添加99人，每24小时可执行一次）</p>
    </div>),
    content2: (<div>
      <p>随着GitMax的用户增多，GitMax给你在GitHub添加的Follower的总数上限（最高10000人）</p>
    </div>)
  };
  
  const steps = [{
    title: '添加好友条件设置',
    content: <div>
      <Row>
        <Col span={8}>
          <Card title={<div>超过一定Follower的用户才加好友</div>} style={{width: 300, margin: "auto"}}
                bodyStyle={{padding: 10}}>
            <div className="custom-image">
              <img alt="example" width="100%"
                   src="https://octodex.github.com/images/setuptocat.jpg"/>
            </div>
            <div className="custom-card">
              GitHub的Follower数
            </div>
            <div className="custom-number-input">
              大于：
              <InputNumber min={0} max={10000} defaultValue={crit_FollowersCount}
                           size="small" onChange={value => crit_FollowersCount = value}/>
            </div>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title={<div>超过一定总Star数的用户才加好友</div>} style={{width: 300, margin: "0 auto"}}
                bodyStyle={{padding: 10}}>
            <div className="custom-image">
              <img alt="example" width="100%"
                   src="https://octodex.github.com/images/electrocat.png"/>
            </div>
            <div className="custom-card">
              GitHub项目的Star总数
            </div>
            <div className="custom-number-input">
              大于：
              <InputNumber min={0} max={10000} defaultValue={crit_StargazersCount}
                           size="small" onChange={value => crit_StargazersCount = value}/>
            </div>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title={<div> 总共要添加Follower的上限</div>}
                style={{width: 300, margin: "auto"}} bodyStyle={{padding: 10}}>
            <div className="custom-image">
              <img alt="example" width="100%"
                   src="https://octodex.github.com/images/swagtocat.png"/>
            </div>
            <div className="custom-card">
              本次
              <Popover placement="bottom" content={popOver.content1} arrowPointAtCenter>
                <Icon type="question-circle-o"/>
              </Popover>
              ：
              <InputNumber min={0} max={99} defaultValue={addFollowersNow}
                           size="small" onChange={value => addFollowersNow = value}/>
            </div>
            <div className="custom-number-input">
              总计
              <Popover placement="bottom" content={popOver.content2} arrowPointAtCenter>
                <Icon type="question-circle-o"/>
              </Popover>
              ：
              <InputNumber min={0} max={10000} defaultValue={addFollowersMax}
                           size="small" onChange={value => addFollowersMax = value}/>
            </div>
          </Card>
        </Col>
      </Row>
    </div>,
    description: "请设置您想在GitHub与哪些人互相Follow",
  }, {
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
    content: <div>
      <Row>
        <Col span={12}>
          <img style={{width: 250}} src="https://octodex.github.com/images/welcometocat.png"/>
          {/*<Progress type="circle" percent={100} />*/}
          <h2>恭喜你已经完成好友添加</h2>
          <br/>
          <p>快去你的GitHub账户，
            <a href={`https://www.github.com/${props.user.login}/followers`} target="_blank">看看你的新朋友吧</a>
          </p>
          <p>随着用户增多，GitMax会自动为你添加更多好友</p>
        </Col>
        <Col span={12}>
          {/*显示follow的用户*/}
          <Col span={8}>
          
          </Col>
          <Col span={8}>
          
          </Col>
          <Col span={8}>
          
          </Col>
        </Col>
      </Row>
    
    
    </div>,
    description: "好友添加完成",
  }];
  
  
  const modalFooter = <div>
    {
      props.current !== 2 ?
          <div>
            <Button key="back" type="ghost" size="large"
                    onClick={props.followModalClose}>取消</Button>
            <Button key="submit" type="primary" size="large" loading={props.nextBtnLoading}
                    onClick={next}>
              下一步
            </Button>
          </div>
          :
          <Button key="submit" type="primary" size="large" onClick={next}>
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
  crit_FollowersCount: 0,
  crit_StargazersCount: 0,
  addFollowersNow: 99,
  addFollowersMax: 5000,
};

export default FollowerUserModal;

