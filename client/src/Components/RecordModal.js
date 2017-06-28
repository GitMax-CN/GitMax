import React from 'react';
import {Modal, Tag} from 'antd';
import {compose, withState, withHandlers} from 'recompose';

const RecordModal = (props) =>{
  return <Modal
      title="Read Me"
      visible={props.visible}
      okText = "Ok"
      cancelText="Cancel"
      onOk={props.onOk}
      onCancel={props.onCancel}
  >
    Hi there,
    <p>In order to try this demo, please make sure your mic is working.</p>
    <p>This demo is trained with a very small sales call dataset (10 calls). Therefore, It only understand certain words and sentence structures.</p>
    {"You can find examples by clicking the "}
    <Tag color="green">
      {"colored tags"}
    </Tag>
    {"in the right column"}
  </Modal>
};

export default compose(
    withHandlers({
      onCancel: props => () => {
        props.updateModal(false);
      },
      onOk: props => (event) => {
        props.updateModal(false);
        props.startRecording(event);
      }
    }),
)(RecordModal);



