import React from 'react';
import {compose, withState, withHandlers} from 'recompose';
import { Tag,Popover } from 'antd';
const CheckableTag = Tag.CheckableTag;
import { Row, Col } from 'antd';


const styles = {
  boxWrapper: {
    webkitBoxShadow: "0px 0px 22px -1px rgba(214,214,214,1)",
    mozBoxShadow: "0px 0px 22px -1px rgba(214,214,214,1)",
    boxShadow: "0px 0px 54px 3px rgba(237,237,237,1)",
    background: '#fff',
    borderRadius: 5,
    height: "50vh",
    width: "90vw",
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    overflow: "auto",
  },
  rightCol: {
    minHeight: "47vh",
    border: "solid #eee",
    borderWidth: "0 0 0 1px",
    padding: "10px",
  },
  tag:{
    marginBottom: 10,
    fontSize: "16px",
    padding: 6,
    height: "34px",
  },
  leftCol:{
    overflow: "auto",
    minHeight: "40vh",
  }
};

const categoryToColors = {
  "REGULAR" : null,
  "INTRO": "green",
  "PROBING": "red",
  "BENEFITS": "blue",
  "CREDIBILITY":"orange",
  "CLOSE": "purple"
};

const InputBox = (props) => {
  const tags = props.finalTextList.map((finalText,i) =>
      <Tag style={styles.tag}
           key={i}
           color={categoryToColors[finalText.category]}>
        {finalText.text}
      </Tag>
  );
  return <div style={styles.boxWrapper}>
    <Row>
      <Col span={18} style={styles.leftCol}>
        {tags}
        {
          props.tempText.length > 0
          &&
          <CheckableTag style={styles.tag}>
            {props.tempText}
          </CheckableTag>
        }
      </Col>
      
      <Col span={6} style={styles.rightCol}>
        <Popover placement="left" content={"content"} trigger="click">
          <Row>
            <Tag style={styles.tag}
                 color={"green"}>
              Introduction
            </Tag>
          </Row>
        </Popover>
  
        <Row>
          <Tag style={styles.tag}
               color={"orange"}>
            Credibility
          </Tag>
        </Row>
  
        <Row>
          <Tag style={styles.tag}
               color={"red"}>
            Probing question
          </Tag>
        </Row>
        
        <Row>
          <Tag style={styles.tag}
               color={"blue"}>
            Product Benefits
          </Tag>
        </Row>

        <Row>
          <Tag style={styles.tag}
               color={"purple"}>
            Attempts to close deal
          </Tag>
        </Row>

        <Row>
          <Tag style={styles.tag}>
            Regular
          </Tag>
        </Row>
        
      </Col>
    </Row>
  </div>
  
};

export default InputBox;