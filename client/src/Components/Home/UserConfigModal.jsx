import React, {PropTypes} from 'react';
import {Modal, Button, InputNumber, Row, Col, Card, Icon, Popover} from 'antd';

let UserConfigModal = (props) => {
  // console.log("props", props);
  let crit_FollowersCount = props.crit_FollowersCount,
      crit_StargazersCount = props.crit_StargazersCount,
      addFollowersMax = props.addFollowersMax;
  
  const saveData = () => {
    const data = {crit_FollowersCount, crit_StargazersCount, addFollowersMax};
    props.onInitialModalSave(data, );
  };
  
  const popOver = {
    content1: (<div>
      <p>点击 '下一步' 后，GitMax一次性在GitHub添加的Follower的数量上限（为保证稳定性，一次性最高添加99人，每24小时可执行一次）</p>
    </div>),
    content2: (<div>
      <p>随着GitMax的用户增多，GitMax给你在GitHub添加的Follower的总数上限</p>
    </div>)
  };
  
  
  const content = <div>
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
              <InputNumber min={0} max={10000} defaultValue={props.crit_FollowersCount}
                           size="small" onChange={value => crit_FollowersCount = value}/>
            </div>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title={<div>超过一定Star数的用户才加好友</div>} style={{width: 300, margin: "0 auto"}}
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
              <InputNumber min={0} max={10000} defaultValue={props.crit_StargazersCount}
                           size="small" onChange={value => crit_StargazersCount = value}/>
            </div>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title={<div> GitMax为我添加Follower的上限</div>}
                style={{width: 300, margin: "auto"}} bodyStyle={{padding: 10}}>
            <div className="custom-image">
              <img alt="example" width="100%"
                   src="https://octodex.github.com/images/swagtocat.png"/>
            </div>
  
            <div className="custom-card">
              给我添加的Follower
            </div>
            <div className="custom-number-input">
              不超过
              <Popover placement="bottom" content={popOver.content2} arrowPointAtCenter>
                <a><Icon type="question-circle-o"/></a>
              </Popover>
              ：
              <InputNumber min={1} max={10000} defaultValue={props.addFollowersMax}
                           size="small" onChange={value => addFollowersMax = value}/>
            </div>
          </Card>
        </Col>
      </Row>
    </div>;
  
  const modalFooter = <div>
    {/*<Button key="back" type="ghost" size="large"*/}
            {/*onClick={()=>props.followModalClose()}>取消</Button>*/}
    <Button key="save" type="primary" size="large" onClick={saveData}>
      保存
    </Button>
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
            {content}
            {/*<div className="steps-content">{steps[props.current].content}</div>*/}
          </div>
        </Modal>
      </div>
  );
};

UserConfigModal.propTypes = {
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

UserConfigModal.defaultProps = {
  crit_FollowersCount: 0,
  crit_StargazersCount: 0,
  addFollowersNow: 99,
  addFollowersMax: 5000,
};

export default UserConfigModal;

