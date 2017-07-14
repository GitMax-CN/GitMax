import React from 'react';
import {compose, withState, withHandlers} from 'recompose';
import { Tag,Popover } from 'antd';
const CheckableTag = Tag.CheckableTag;
import { Row, Col } from 'antd';


const styles = {
  boxWrapper: {
    WebkitBoxShadow: "0px 0px 22px -1px rgba(214,214,214,1)",
    MozBoxShadow: "0px 0px 22px -1px rgba(214,214,214,1)",
    boxShadow: "0px 0px 54px 3px rgba(237,237,237,1)",
    background: '#fff',
    borderRadius: 5,
    height: "50vh",
    width: "82vw",
    // marginTop: 50,
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

const contentList = [
  [
    "Good morning, it's John calling from Telus.",
    "Hello Eric, this is Steve from Clevo Analytics, have I caught you in the middle of anything?",
    "Hi, this is Jess from the Virtual Sales Academy. How are you?",
    "Hi, It’s Frank from Johnson & Johnson. I was referred to you by Alex from Procurify",
  ],
  [
    "I am actually using the service myself for 2 years",
    "One of your clients, Bench Accounting, already uses our service and are very satisfied with their results.",
    "We now have over 3000 users and 30 restaurants on our app.",
    "Well we already work with big companies like Telus and Shaw.",
  ],
  [
    "How do you currently listen to your sales calls?",
    "How often do you give feedback to your sales reps?",
    "Which one would you want to hear most about?",
    "What performance metrics do you use to review your team?",
  ],
  [
    "Improve staff availability and reduce turnover",
    "Automatically increase visits from repeat customers",
    "Collect emails with little to no effort",
    "Decrease labor costs associated with manual processing",
  ],
  [
    "When can you start?",
    "Here are the next steps",
    "I can show you a demo for free if you can send me a few hours of your call recordings.",
    "Let’s start by taking down company information and I’ll walk you through our setup process.",
  ],
  [
    "haha, that's right",
    "That's the best price we can offer",
    "That's fine",
  ],
];


const formatContent = (popUpContents) => {
  const content = popUpContents.map((content,i) => (
      <p key={i}>
        {content}
      </p>)
  );
  
  return <div>
    <h4>Examples:</h4>
    {content}
  </div>
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
        <Popover placement="left" content={formatContent(contentList[0])}>
          <Row>
            <Tag style={styles.tag}
                 color={"green"}>
              Introduction
            </Tag>
          </Row>
        </Popover>
  
        <Popover placement="left" content={formatContent(contentList[1])}>
          <Row>
            <Tag style={styles.tag}
                 color={"orange"}>
              Credibility
            </Tag>
          </Row>
        </Popover>
        
        <Popover placement="left" content={formatContent(contentList[2])}>
          <Row>
            <Tag style={styles.tag}
                 color={"red"}>
              Probing question
            </Tag>
          </Row>
        </Popover>
  
        <Popover placement="left" content={formatContent(contentList[3])}>
          <Row>
            <Tag style={styles.tag}
                 color={"blue"}>
              Product Benefits
            </Tag>
          </Row>
        </Popover>
  
        <Popover placement="left" content={formatContent(contentList[4])}>
          <Row>
            <Tag style={styles.tag}
                 color={"purple"}>
              Attempts to close deal
            </Tag>
          </Row>
        </Popover>
  
        <Popover placement="left" content={formatContent(contentList[5])}>
          <Row>
            <Tag style={styles.tag}>
              Regular
            </Tag>
          </Row>
        </Popover>
        
      </Col>
    </Row>
  </div>
  
};

export default InputBox;