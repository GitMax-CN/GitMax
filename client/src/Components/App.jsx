import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import {withState, compose, withHandlers, lifecycle} from 'recompose';


import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import Categorizer from './Categorizer';
import EmotionAnalyzer from './EmotionAnalyzer';
import Particles from 'react-particles-js';

const styles = {
  wrapper: {
    backgroundColor: null,
    minHeight: "100vh",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif',
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
        >
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
  
          <div style={{ padding: 24, minHeight: "70vh" }}>
            <h1 id="analytics">
              <span>Real time voice analytics demo </span>
              <a href="#analytics" className="anchor">#</a>
            </h1>
  
            <Tabs defaultActiveKey="1" onChange={(key)=>{console.log(key)}}>
              <TabPane tab="What you say" key="1">
                <Categorizer/>
              </TabPane>
              <TabPane tab="How you say it" key="2">
                <EmotionAnalyzer/>
              </TabPane>
            </Tabs>

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
    // withState("text", "updateText", "start"),
    

)(App);