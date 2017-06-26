import React from 'react';
import {Modal} from 'antd';
import {compose, withState} from 'recompose';

const RecordModal = (props) =>{
  console.log("RecordModal props", props);
  return <Modal
      title="Basic Modal"
      visible={props.visible}
      onOk={()=>props.updateModal(false)}
      //onCancel={()=>props.updateModal(false)}
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
};

export default RecordModal;



