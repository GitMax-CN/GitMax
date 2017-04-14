import React from 'react';
import ReactDOM from 'react-dom';
import { scrollScreen } from 'rc-scroll-anim';

import PreloadImages from './PreloadImages';
import NavContainer from '../NavContainer';
import Content0 from './Content0';
import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';
import Footer from '../Footer';
import Point from './Point';

import '../less/antMotion_style.less';

export default class Home extends React.Component {
  componentDidMount() {
    // 点的位置居中
    const list = ReactDOM.findDOMNode(this.refs.list);
    const listHeight = list.getBoundingClientRect().height;
    list.style.marginTop = ` -${listHeight / 2}px`;
  }

  render() {
    const children = [
      <PreloadImages key="PreloadImages"/>,
      <NavContainer id="Nav" key="Nav" router = {this.props.router}/>,
      <Content0 id="Content0" key="Content0"/>,
      <Content1 id="Content1" key="Content1"/>,
      <Content2 id="Content2" key="Content2"/>,
      <Content3 id="Content3" key="Content3"/>,
      <Footer id="Footer" key="Footer"/>,
      // 导航和页尾不进入锚点区，如果需要，自行添加;
      <Point key="list" ref="list" data={['Content0', 'Content1', 'Content2', 'Content3']} />,
    ];
    return (
      <div className="templates-wrapper">
        {children}
      </div>
    );
  }
}
