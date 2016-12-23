import React, {PropTypes}from 'react';
import { Modal, Button, Icon } from 'antd';

let FollowerUserModal = ({isFollowing, onCloseModal, userLogin}) => {
  // const handleOk = () => console.log("ok");
  // const handleCancel = () => console.log("cancel");
  
  return (
      <div>
        <Modal
            visible={isFollowing}
            maskClosable = {false}
            title="添加好友正在进行中..."
            onOk={onCloseModal}
            onCancel={onCloseModal}
            footer={[
              <Button key="submit" type="primary" size="large" loading={false} onClick={onCloseModal}>
                知道了
              </Button>,
            ]}
        >
          <p>GitMax正在努力为你添加 GitHub 好友中，新账户可添加最多 99 位好友</p>
          <p>该过程通常在5分钟内完成，快去你的GitHub账户，<a href={`https://www.github.com/${userLogin}/followers`} target="_blank">看看你的新朋友吧</a></p>
        </Modal>
      </div>
  );
};

FollowerUserModal.propTypes = {
  isFollowing: PropTypes.bool,
  onCloseModal: PropTypes.func,
  userLogin: PropTypes.string,
};

export default FollowerUserModal;