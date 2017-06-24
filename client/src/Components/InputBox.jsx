import React from 'react';
import {compose, withState, withHandlers} from 'recompose';
import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;
import { Row, Col } from 'antd';


const styles = {
  boxWrapper: {
    webkitBoxShadow: "0px 0px 22px -1px rgba(214,214,214,1)",
    mozBoxShadow: "0px 0px 22px -1px rgba(214,214,214,1)",
    boxShadow: "0px 0px 54px 3px rgba(237,237,237,1)",
    background: '#fff',
    borderRadius: 5,
    // border: "solid #eee",
    // borderWidth: "10",
    height: "50vh",
    width: "70vw",
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    overflow: "auto",
  },
  rightCol: {
    height: "50vh",
    border: "solid #eee",
    borderWidth: "0 0 0 1px",
    padding: "10px",
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

{/*<Tag color="pink">pink</Tag>*/}
{/*<Tag color="red">red</Tag>*/}
{/*<Tag color="orange">orange</Tag>*/}
{/*<Tag color="green">green</Tag>*/}
{/*<Tag color="cyan">cyan</Tag>*/}
{/*<Tag color="blue">blue</Tag>*/}
{/*<Tag color="purple">purple</Tag>*/}

const InputBox = (props) => {
  const tags = props.finalTextList.map((finalText,i) =>
      <Tag style={{marginBottom: 10,}}
           key={i}
           color={categoryToColors[finalText.category]}>
        {finalText.text}
      </Tag>
  );
  return <div style={styles.boxWrapper}>
    <Row>
      <Col span={18}>
        {tags}
        {
          props.tempText.length > 0
          &&
          <CheckableTag>
            {props.tempText}
          </CheckableTag>
        }
      </Col>
      <Col span={6} style={styles.rightCol}>
        <Row>
          <Tag style={{marginBottom: 10,}}
               color={"green"}>
            Introduction
          </Tag>
        </Row>
  
        <Row>
          <Tag style={{marginBottom: 10,}}
               color={"orange"}>
            Credibility
          </Tag>
        </Row>
  
        <Row>
          <Tag style={{marginBottom: 10,}}
               color={"red"}>
            Probing question
          </Tag>
        </Row>
        
        <Row>
          <Tag style={{marginBottom: 10,}}
               color={"blue"}>
            Product Benefits
          </Tag>
        </Row>

  
        <Row>
          <Tag style={{marginBottom: 10,}}
               color={"purple"}>
            Attempts to close deal
          </Tag>
        </Row>
  
        <Row>
          <Tag style={{marginBottom: 10,}}>
            Regular talk
          </Tag>
        </Row>
        
      </Col>
    </Row>
  </div>
  
};

export default InputBox;