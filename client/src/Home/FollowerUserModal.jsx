import React, {PropTypes} from 'react';
import {Modal, Button, Steps, InputNumber, Row, Col, Card, Icon, Popover} from 'antd';
const Step = Steps.Step;

let FollowerUserModal = ({isFollowing, onCloseModal, userLoginStr}) => {
  
  const onChange = (value) => {
    console.log('changed', value);
  };
  
  const popOver = {
    content1: (<div>
      <p>点击 '下一步' 后，GitMax一次性在GitHub添加的Follower的数量上限（为保证稳定性，新用户一次性最高添加99人）</p>
    </div>),
    content2: (<div>
      <p>随着GitMax的用户增多，GitMax给你在GitHub添加的Follower的总数上限</p>
    </div>)
  };
  
  const steps = [{
    title: '添加好友条件设置',
    content: <div>
      <Row>
        <Col span={8}>
          <Card title={<div>超过一定Follower的用户才加好友</div>} style={{width: 280, margin: "auto"}}
                bodyStyle={{padding: 10}}>
            <div className="custom-image">
              <img alt="example" width="100%"
                   src="https://octodex.github.com/images/swagtocat.png"/>
            </div>
            <div className="custom-card">
              GitHub的Follower数
            </div>
            <div className="custom-number-input">
              大于
              <InputNumber min={0} max={10000} defaultValue={0} size="small" onChange={onChange}/>
            </div>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title={<div>超过一定Star的用户才加好友</div>} style={{width: 280, margin: "0 auto"}}
                bodyStyle={{padding: 10}}>
            <div className="custom-image">
              <img alt="example" width="100%"
                   src="https://octodex.github.com/images/total-eclipse-of-the-octocat.jpg"/>
            </div>
            <div className="custom-card">
              GitHub项目的Star数
            </div>
            <div className="custom-number-input">
              大于
              <InputNumber min={0} max={10000} defaultValue={0} size="small" onChange={onChange}/>
            </div>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title={<div> 总共要添加Follower的上限</div>}
                style={{width: 280, margin: "auto"}} bodyStyle={{padding: 10}}>
            <div className="custom-image">
              <img alt="example" width="100%"
                   src="https://octodex.github.com/images/setuptocat.jpg"/>
            </div>
            <div className="custom-card">
              本次
              <Popover placement="bottom" content={popOver.content1} arrowPointAtCenter>
                <Icon type="question-circle-o"/>
              </Popover>
              <InputNumber min={0} max={99} defaultValue={99} size="small" onChange={onChange}/>
            </div>
            <div className="custom-number-input">
              总共
              <Popover placement="bottom" content={popOver.content2} arrowPointAtCenter>
                <Icon type="question-circle-o"/>
              </Popover>
              <InputNumber min={0} max={9999} defaultValue={9999} size="small" onChange={onChange}/>
            </div>
          </Card>
        </Col>
      </Row>
    </div>,
    description: "请设置您想在GitHub与哪些人互相Follow",
  }, {
    title: '开始添加',
    content: 'Second-content',
    description: "好友添加中...",
  }, {
    title: '添加成功',
    content: 'Last-content',
    description: "好友添加完成",
  }];
  
  let current = 0;
  
  const next = () => {
    current = current + 1;
  };
  
  const prev = () => {
    current = current - 1;
  };
  
  
  // const handleOk = () => console.log("ok");
  // const handleCancel = () => console.log("cancel");
  
  // return (
  //     <div>
  {/*<Modal*/
  }
  {/*visible={isFollowing}*/
  }
  {/*maskClosable = {false}*/
  }
  {/*title="添加好友正在进行中..."*/
  }
  {/*onOk={onCloseModal}*/
  }
  {/*onCancel={onCloseModal}*/
  }
  {/*footer={[*/
  }
  {/*<Button key="submit" type="primary" size="large" loading={false} onClick={onCloseModal}>*/
  }
  {/*知道了*/
  }
  {/*</Button>,*/
  }
  {/*]}*/
  }
  {/*>*/
  }
  //         <p>GitMax正在努力为你添加 GitHub 好友中</p>
  //         <br/>
  //         <p>该过程通常在5分钟内完成，快去你的GitHub账户，<a
  // href={`https://www.github.com/${userLoginStr}/followers`} target="_blank">看看你的新朋友吧</a></p>
  // <br/> <br/> <p> * 恭喜你，至此你已经完成设置GitMax</p> <p> * 随着用户增多，GitMax会自动为你添加更多好友</p> </Modal> </div>
  // );
  return (
      <div>
        <Modal
            visible={true}
            maskClosable={false}
            closable={false}
            width={1024}
            footer={[
              <Button key="back" type="ghost" size="large" onClick={prev}>取消</Button>,
              <Button key="submit" type="primary" size="large" loading={false} onClick={next}>
                下一步
              </Button>,
            ]}
        >
          <div style={{margin: 20}}>
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title}
                                       description={item.description}/>)}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
          </div>
        </Modal>
      </div>
  );
};

FollowerUserModal.propTypes = {
  isFollowing: PropTypes.bool,
  onCloseModal: PropTypes.func,
  userLoginStr: PropTypes.string,
};

export default FollowerUserModal;

