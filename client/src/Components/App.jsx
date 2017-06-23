import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import InputBox from './InputBox';
import { Button } from 'antd';
import {withState, compose, withHandlers, lifecycle} from 'recompose';
import {determineCategory, vec_result, maxarg} from '../api';
// import Footer from './Footer';
import Particles from 'react-particles-js';

let recognition, start_timestamp;

const styles = {
  wrapper: {
    backgroundColor: null,
    minHeight: "100vh",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;',
  },
  logo: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "normal",
    letterSpacing: "0.5px",
  }
};

const App = (props) => {
  return (
      <Layout style={styles.wrapper}>
        <Header style={{ position: 'fixed', width: '100%' }}>
          <span style={styles.logo}>Clevo</span>
          {/*<Menu*/}
              {/*theme="dark"*/}
              {/*mode="horizontal"*/}
              {/*defaultSelectedKeys={['2']}*/}
              {/*style={{ lineHeight: '64px' }}*/}
          {/*>*/}
            {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
            {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
            {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
          {/*</Menu>*/}
        </Header>
  
        <Particles style={{backgroundColor:"#fff"}} width="100vw" height="90vh" params={{
          "particles": {
            "number": {
              "value": 40,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#1c385f"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 70,
              "color": "#1c385f",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 3,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": false,
                "mode": "repulse"
              },
              "onclick": {
                "enable": false,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        }}/>
        
        <Content
            style = {{
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              padding: "64px",
              position: "fixed",
            }}
            //style={{ padding: '0 50px', marginTop: 64}}
        >
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
  
          <div style={{ padding: 24, minHeight: "70vh" }}>
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

// Container
export default compose(
    withState('tempText', "updateTemp", ""),
    withState('finalTextList', "updateFinal", []),
    withState("recognizing", "updateRecognizing", false),
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
        start_timestamp = event.timeStamp;
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
              this.props.updateIgnoreEnd(true);
              alert("info_no_speech")
              // start_img.src = 'mic.gif';
              // showInfo('info_no_speech');
              // ignore_onend = true;
            }
            if (event.error == 'audio-capture') {
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
)(App);