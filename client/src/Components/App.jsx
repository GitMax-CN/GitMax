import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import InputBox from './InputBox';
import { Button } from 'antd';
import {withState, compose, withHandlers, lifecycle} from 'recompose';
import {determineCategory} from '../api';
// import Footer from './Footer';

let recognition, start_timestamp;

const App = (props) => {
  console.log("App props", props);
  return (
      <Layout style={{minHeight: "100vh"}}>
        <Header style={{ position: 'fixed', width: '100%' }}>
          <div className="logo" />
          <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          
          <div style={{ background: '#fff', padding: 24, minHeight: "70vh" }}>
            <h1 id="实时语音分析">
              <span>Real time analytics / 实时语音分析</span>
              <a href="#实时语音分析" className="anchor">#</a>
            </h1>
  
            <InputBox tempText = {props.tempText}
                      finalTextList = {props.finalTextList}/>
  
            <Button type={props.recognizing ? "" : "primary"}
                    size="large"
                    onClick = {props.onPress}
                    loading = {props.recognizing}
                    shape={props.recognizing ? "circle" : null}
                    style={{marginLeft: "auto", marginRight: "auto", marginTop: 30, display: "block", paddingLeft: props.recognizing ? 7 : ""}}
            >
              {props.recognizing ? "" : "start"}
            </Button>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2017 Created by Clevo Team
        </Footer>
      </Layout>
  );
};


{/*<p id="info_start">Click on the microphone icon and begin speaking.</p>*/}
{/*<p id="info_speak_now">Speak now.</p>*/}
{/*<p id="info_no_speech">No speech was detected. You may need to adjust your*/}
{/*<a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">*/}
    {/*microphone settings</a>.</p>*/}
{/*<p id="info_no_microphone" style="display:none">*/}
    {/*No microphone was found. Ensure that a microphone is installed and that*/}
{/*<a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">*/}
    {/*microphone settings</a> are configured correctly.</p>*/}
{/*<p id="info_allow">Click the "Allow" button above to enable your microphone.</p>*/}
{/*<p id="info_denied">Permission to use microphone was denied.</p>*/}
{/*<p id="info_blocked">Permission to use microphone is blocked. To change,*/}
    {/*go to chrome://settings/contentExceptions#media-stream</p>*/}
    {/*<p id="info_upgrade">Web Speech API is not supported by this browser.*/}
      {/*Upgrade to <a href="//www.google.com/chrome">Chrome</a>*/}
      {/*version 25 or later.</p>*/}

export default compose(
    withState('tempText', "updateTemp", ""),
    withState('finalTextList', "updateFinal", []),
    withState("recognizing", "updateRecognizing", false),
    withState("btnText", "updateBtnText", "start"),
    withState("text", "updateText", "start"),
    withState("ignore_onend", "updateIgnoreEnd", false),
    withHandlers({
      onPress: props => (event) => {
        if (props.recognizing) {
          recognition.stop();
          return;
        }
        props.updateFinal([]);
        props.updateIgnoreEnd(false);
        // select_language.selectedIndex = 6;
        // select_dialect.selectedIndex = 6;
        // recognition.lang = select_dialect.value;
        recognition.start();
        // ignore_onend = false;
        // final_span.innerHTML = '';
        // interim_span.innerHTML = '';
        // start_img.src = 'mic-slash.gif';
        props.updateText("recording");
        start_timestamp = event.timeStamp;
        
        // final_transcript = '';
        // recognition.lang = select_dialect.value;
        // recognition.start();
        // ignore_onend = false;
        // final_span.innerHTML = '';
        // interim_span.innerHTML = '';
        // start_img.src = 'mic-slash.gif';
        // showInfo('info_allow');
        // showButtons('none');
        // start_timestamp = event.timeStamp;
        
      },
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
    
          recognition.onstart = () => {
            // recognizing = true;
            this.props.updateRecognizing(true);
            
            // update explaination text
            // showInfo('info_speak_now');
            // start_img.src = 'mic-animate.gif';
          };
  
          recognition.onerror = (event) => {
            if (event.error == 'no-speech') {
              this.props.updateBtnText("start");
              this.props.updateIgnoreEnd(true);
              alert("info_no_speech")
              // start_img.src = 'mic.gif';
              // showInfo('info_no_speech');
              // ignore_onend = true;
            }
            if (event.error == 'audio-capture') {
              this.props.updateBtnText("start");
              this.props.updateIgnoreEnd(true)
              alert("info_no_microphone")
              // start_img.src = 'mic.gif';
              // showInfo('info_no_microphone');
              // ignore_onend = true;
            }
            if (event.error == 'not-allowed') {
              this.props.updateIgnoreEnd(true)
              
              if (event.timeStamp - start_timestamp < 100) {
                alert("info_blocked")
                // showInfo('info_blocked');
              } else {
                alert("info_denied")
                // showInfo('info_denied');
              }
              // ignore_onend = true;
            }
          };
  
          recognition.onend = () => {
            this.props.updateRecognizing(false);
            if (this.props.ignore_onend) {
              return;
            }
            // start_img.src = 'mic.gif';
            this.props.updateBtnText("start");
            if (!this.props.finalTextList || this.props.finalTextList.length === 0) {
              // showInfo('info_start');
              alert("info_start");
              return;
            }
            // showInfo('');
            // if (window.getSelection) {
            //   window.getSelection().removeAllRanges();
            //   var range = document.createRange();
            //   range.selectNode(document.getElementById('final_span'));
            //   window.getSelection().addRange(range);
            // }
            // if (create_email) {
            //   create_email = false;
            //   createEmail();
            // }
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
            // final_transcript = capitalize(final_transcript);
            // final_span.innerHTML = linebreak(final_transcript);
            // interim_span.innerHTML = linebreak(interim_transcript);
            // if (final_transcript || interim_transcript) {
            //   showButtons('inline-block');
            // }
          };
        }
      }
    }),
)(App);