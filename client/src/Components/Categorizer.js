import React from 'react';
import InputBox from './InputBox';
import { Button } from 'antd';
import {withState, compose, withHandlers, lifecycle} from 'recompose';
import RecordModal from './RecordModal';
import {determineCategory} from '../api';

let recognition, start_timestamp;

const Categorizer = (props) => {
  return <div>
    <RecordModal visible={props.isModalVisible}
                 updateModal={props.updateModal}
                 startRecording={props.startRecording}
    />
    
    <InputBox tempText = {props.tempText}
              finalTextList = {props.finalTextList}/>
  
    <Button type={props.recognizing ? "" : "primary"}
            size="large"
            onClick = {props.onPress}
            loading = {props.recognizing}
            shape={props.recognizing ? "circle" : null}
            style={{marginLeft: "auto", marginRight: "auto", marginTop: 30, display: "block", paddingLeft: props.recognizing ? 7 : ""}}
            disabled={!('webkitSpeechRecognition' in window)}
    >
      {props.recognizing ? "" : "start recording"}
    </Button>
  
    {
      !('webkitSpeechRecognition' in window)
      &&
      <h3 style={{textAlign:"center"}}>Please use Chrome browser with version > 25</h3>
    }
  </div>
};

export default compose(
    withState('tempText', "updateTemp", ""),
    withState('finalTextList', "updateFinal", []),
    withState("recognizing", "updateRecognizing", false),
    withState("ignore_onend", "updateIgnoreEnd", false),
    withState("isModalVisible", "updateModal", false),
    withHandlers({
      onPress: props => (event) => {
        if (props.recognizing) {
          recognition.stop();
          return;
        }
        props.updateModal(true);
      },
      startRecording: props => (event) => {
        props.updateFinal([]);
        props.updateIgnoreEnd(false);
        recognition.start();
        start_timestamp = event.timeStamp;
      }
    }),
    lifecycle({
      componentWillMount(){
        if (!('webkitSpeechRecognition' in window)) {
          // upgrade();
          alert("You need to use chrome with version > 25");
        } else {
          // start_button.style.display = 'inline-block';
          recognition = new webkitSpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "cmn-Hans-CN";
          
          recognition.onstart = () => {
            // recognizing = true;
            this.props.updateRecognizing(true);
            
          };
          
          recognition.onerror = (event) => {
            if (event.error === 'no-speech') {
              this.props.updateIgnoreEnd(true);
              alert("No speech detected");
            }
            if (event.error === 'audio-capture') {
              this.props.updateIgnoreEnd(true)
              alert("info_no_microphone")
            }
            if (event.error === 'not-allowed') {
              this.props.updateIgnoreEnd(true)
              
              if (event.timeStamp - start_timestamp < 100) {
                alert("info_blocked")
              } else {
                alert("info_denied")
              }
            }
          };
          
          recognition.onend = () => {
            this.props.updateRecognizing(false);
            if (this.props.ignore_onend) {
              return;
            }
            // start_img.src = 'mic.gif';
            if (!this.props.finalTextList || this.props.finalTextList.length === 0) {
              console.log("no data is recorded");
              return;
            }
          };
          
          recognition.onresult = (event) => {
            // var interim_transcript = '';
            this.props.updateTemp("");
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                let category = determineCategory(event.results[i][0].transcript);
                this.props.updateFinal([...this.props.finalTextList,
                  {
                    text: event.results[i][0].transcript,
                    category: category
                  }
                ]);
              } else {
                this.props.updateTemp(this.props.tempText + event.results[i][0].transcript);
              }
            }
          };
        }
      }
    }),
)(Categorizer)