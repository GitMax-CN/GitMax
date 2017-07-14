import React from 'react';
import {withState, compose, withHandlers, lifecycle} from 'recompose';
import { Upload, Button, Icon } from 'antd';
import fetch from 'isomorphic-fetch';
import {calcFormEncode} from '../api';

let options = {
  url: {
    tokenUrl: 'https://token.beyondverbal.com/token',
    // serverUrl: 'https://apiv3.beyondverbal.com/v1/recording/'
    serverUrl: 'https://apiv4.beyondverbal.com/v3/recording/',
  },
  apiKey: "70e0885c-2ade-48b8-bc69-556dc49417cd",
  token: ''
};

const EmotionAnalyzer = (props) => {
  return <div>
    Emotion analyzer
  
    {/*url: startUrl,*/}
    {/*headers: { 'Authorization': "Bearer " + options.token },*/}
    {/*type: "POST",*/}
    {/*cache: false,*/}
    {/*data: JSON.stringify({ dataFormat: { type: "WAV" } }),*/}
    {/*contentType: 'application/x-www-form-urlencoded',*/}
    {/*dataType: 'text'*/}
    
    <Upload action='//jsonplaceholder.typicode.com/posts/'
            onChange= {props.handleChange}
            multiple={true}
            // headers = {{ Authorization: "Bearer " + options.token }}
            headers = {{ Authorization: "Bearer " + options.token }}
            // data = {}
            fileList={props.fileList}>
      <Button>
        <Icon type="upload" /> upload
      </Button>
    </Upload>
  
  
    {/*action: props.action,*/}
    {/*filename: props.name,*/}
    {/*file,*/}
    {/*data,*/}
    {/*headers: props.headers,*/}
    {/*withCredentials: props.withCredentials,*/}
    {/*onProgress: onProgress ? e => {*/}
    {/*onProgress(e, file);*/}
  {/*} : null,*/}
    {/*onSuccess: ret => {*/}
    {/*delete this.reqs[uid];*/}
    {/*props.onSuccess(ret, file);*/}
  {/*},*/}
    {/*onError: (err, ret) => {*/}
    {/*delete this.reqs[uid];*/}
    {/*props.onError(err, ret, file);*/}
  {/*},*/}
  
  </div>
};

export default compose(
    withState('token', 'updateToken', null),
    withState('fileList', 'updateList', [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    }]),
    withHandlers({
      handleChange: props => (info) => {
        let fileList = info.fileList;
    
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        // fileList = fileList.slice(-2);
    
        // 2. read from response and show file link
        fileList = fileList.map((file) => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url;
          }
          return file;
        });
    
        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
          if (file.response) {
            return file.response.status === 'success';
          }
          return true;
        });
    
        props.updateList(fileList);
      },
      getToken: props => (apiKey, options) => {
        return fetch(options.url.tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: calcFormEncode({
            "grant_type": "client_credentials",
            "apiKey": apiKey
          }),
        })
            .then((response) => response.json())
            .then(result => {
              console.log("get token result", result);
              return result.access_token;
            })
      }
    }),
    lifecycle({
      componentWillMount(){
        if (!this.props.token) {
          this.props.getToken(options.apiKey, options)
              .then(token => this.props.updateToken(token))
              .catch(err => console.log("err", err));
        }
      }
    }),
)(EmotionAnalyzer);