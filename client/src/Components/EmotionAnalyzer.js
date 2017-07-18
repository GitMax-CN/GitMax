import React from 'react';
import {compose, lifecycle, withHandlers, withState} from 'recompose';
import {Button, Icon, Table, Upload} from 'antd';
import fetch from 'isomorphic-fetch';
import {calcFormEncode} from '../api';
const Dragger = Upload.Dragger;

let options = {
  url: {
    tokenUrl: 'https://token.beyondverbal.com/token',
    // serverUrl: 'https://apiv3.beyondverbal.com/v1/recording/'
    serverUrl: 'https://apiv4.beyondverbal.com/v3/recording/',
  },
  apiKey: "70e0885c-2ade-48b8-bc69-556dc49417cd",
  token: ''
};


const columns = [
  {
    title: 'File Name',
    dataIndex: 'name',
    key: 'name',
    width: '15%',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    width: '5%',
  },
  {
    title: "Arousal",
    dataIndex: 'arousal',
    key: 'arousal',
    width: '10%',
  },
  {
    title: "Temper",
    dataIndex: 'temper',
    key: 'temper',
    width: '10%',
  },
  // {
  //   title: "Valence",
  //   dataIndex: 'valence',
  //   key: 'valence',
  //   width: '10%',
  // },
  // {
  //   title: 'Group 7',
  //   dataIndex: 'group7',
  //   key: 'group7',
  //   width: '15%',
  // },
  {
    title: 'Group 11',
    dataIndex: 'group11',
    key: 'group11',
    width: '15%',
  },
  {
    title: 'Group 21',
    dataIndex: 'group21',
    key: 'group21',
    width: '15%',
  },
];
const weights21 = {
  "admiration": 1,
  "anger": -1,
  "anxiety": -1,
  "belief": 0,
  "creativity": 0,
  "desire": 0,
  "disliking": -1,
  "dominance": -0.5,
  "egoism": -1,
  "excitement": 0,
  "friendliness": 1,
  "happiness": 1,
  "hope": 1,
  "hostility": -1,
  "inferiority": -1,
  "loneliness": -1,
  "love": 1,
  "motivation": 1,
  "self control": -1,
  "self esteem": 1,
  "unhappiness": -1
};
const weights11 = {
  "Creative, Passionate": 0.5,
  "Criticism, Cynicism": -1,
  "Defensivness, Anxiety": -0.5,
  "Friendly, Warm": 1,
  "Hostility, Anger": -1,
  "Leadership, Charisma": 0.5,
  "Loneliness, Unfulfillment": -1,
  "Love, Happiness": 1,
  "Sadness, Sorrow": -1,
  "Self-Control, Practicality": -0.5,
  "Supremacy, Arrogance": -1,
};

// const summaryColumns = [
//   {
//     title: 'File Name',
//     dataIndex: 'name',
//     key: 'name',
//     width: '15%',
//   },
//   {
//     title: 'Arousal',
//     dataIndex: 'arousal',
//     key: 'arousal',
//     width: '15%',
//   },
//   {
//     title: 'Temper',
//     dataIndex: 'temper',
//     key: 'temper',
//     width: '15%',
//   },
//   {
//     title: 'Temper',
//     dataIndex: 'temper',
//     key: 'temper',
//     width: '15%',
//   },
// ];
let summaryList = [];

const EmotionAnalyzer = (props) => {
  // console.log("EmotionAnalyzer props.summaryList", props.summaryList);
  return <div>
    {
      props.fileList.length === 0
      &&
      <div style={{marginTop: 16, height: 180}}>
        <Dragger action=''
                 onChange={props.handleChange}
                 multiple={true}
                 beforeUpload={props.interruptUpload}
                 showUploadList={false}
                 fileList={props.fileList}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox"/>
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files</p>
        </Dragger>
      </div>
    }
    <Button onClick={props.startAnalyzeFiles}>
      Analyze
    </Button>
  
    {
      props.fileList.length === 1
          &&
      <Table columns={columns}
             rowKey={record => record.name + record.time}
             dataSource={props.data}
             scroll={{y: 240}}
          // pagination={this.state.pagination}
             loading={props.fileList.length > 0 && props.data.length === 0}
          // onChange={this.handleTableChange}
      />
    }
  
    <Table columns={columns}
           rowKey={record => record.name + record.time}
           dataSource={props.summaryList}
           scroll={{y: 240}}
        // pagination={this.state.pagination}
        //    loading={props.fileList.length > 0 && props.data.length === 0}
        // onChange={this.handleTableChange}
    />
  </div>
  
  
  // return <div>
  //   <Upload action=''
  //           onChange= {props.handleChange}
  //           multiple={true}
  //           beforeUpload = {props.interruptUpload}
  //           headers = {{ Authorization: "Bearer " + options.token }}
  //           fileList={props.fileList}>
  //     <Button>
  //       <Icon type="upload" /> upload
  //     </Button>
  //   </Upload>
  //
  //
  //   <Button onClick={props.startAnalyzeFiles}>
  //     Analyze
  //   </Button>
  //
  // </div>
};

export default compose(
    withState('token', 'updateToken', null),
    withState('fileList', 'updateList', []),
    withState('data', 'updateData', []),
    withState('summaryList', 'updateSummary', []),
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
      },
      interruptUpload: props => (file, fileList) => {
        console.log("fileList", fileList);
        props.updateList(fileList);
        return false;
        // console.log("file, fileList", file, fileList);return false
      },
      analyzeFile: props => (apiKey, content, fileName) => {
        return fetch(options.url.serverUrl + "start", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Bearer " + props.token,
          },
          body: '{"dataFormat":{"type":"WAV"}}',
        })
            .then((response) => response.json())
            .then((data) => {
              console.log("data", data);
              const recID = data.recordingId ? data.recordingId : JSON.parse(data).recordingId;
              const upStreamUrl = options.url.serverUrl + recID;
              
              return fetch(upStreamUrl, {
                method: 'POST',
                headers: {
                  'Authorization': "Bearer " + props.token,
                },
                body: content,
              })
                  .then(response => {
                    console.log("response", response);
                    return response.json();
                  })
                  .then(result => {
                    console.log("result", result);
                    let recordList = [...props.data];
                    let totalMoodValue21 = 0, totalMoodValue11 = 0, totalArousal = 0,
                        totalTemper = 0, totalMoodValue11P = 0, totalMoodValue21P = 0;
                    
                    for (let segment of result.result.analysisSegments) {
                      const {analysis} = segment;
                      const mood11 = analysis.Mood.Group11;
                      const mood21 = analysis.Mood.Group21;
                      
                      let moodValue11 = weights11[mood11.Primary.Phrase] + weights11[mood11.Secondary.Phrase] * 0.75;
                      let moodValue21 = weights21[mood21.Primary.Phrase] + weights21[mood21.Secondary.Phrase] * 0.75;
  
                      totalMoodValue11 += moodValue11;
                      totalMoodValue21 += moodValue21;
                      totalMoodValue11P += weights11[mood11.Primary.Phrase];
                      totalMoodValue21P += weights21[mood21.Primary.Phrase];
                      
                      totalArousal += Math.trunc(analysis.Arousal.Value);
                      totalTemper += Math.trunc(analysis.Temper.Value);
                      
                      let record = {
                        name: fileName,
                        time: `${Math.trunc(segment.offset / 1000)} - ${Math.trunc(
                            segment.end / 1000)}`,
                        arousal: `${analysis.Arousal.Value}: ${analysis.Arousal.Score}%`,
                        temper: `${analysis.Temper.Value}: ${analysis.Temper.Score}%`,
                        valence: `${analysis.Valence.Value}: ${analysis.Valence.Score}%`,
                        // group7: `${analysis.Mood.Group7.Primary.Phrase} /
                        // ${analysis.Mood.Group7.Secondary.Phrase}`,
                        group11: `${analysis.Mood.Group11.Primary.Phrase} / ${analysis.Mood.Group11.Secondary.Phrase} (${moodValue11})`,
                        group21: `${analysis.Mood.Group21.Primary.Phrase} / ${analysis.Mood.Group21.Secondary.Phrase} (${moodValue21})`,
                      };
                      recordList.push(record);
                    }
                    totalMoodValue11 /= result.result.analysisSegments.length;
                    totalMoodValue21 /= result.result.analysisSegments.length;
                    totalMoodValue11P /= result.result.analysisSegments.length;
                    totalMoodValue21P /= result.result.analysisSegments.length;
                    totalArousal /= result.result.analysisSegments.length;
                    totalTemper /= result.result.analysisSegments.length;
  
                    console.log("fileName", fileName, "totalMoodValue", totalMoodValue11, "totalMoodValue21", totalMoodValue21, "totalArousal", totalArousal, "totalTemper", totalTemper);
                    props.updateData(recordList);
  
                    // console.log("props.summaryList", props.summaryList);
                    summaryList.push({
                      name: fileName,
                      time: Math.trunc(result.result.duration / 1000) + "s",
                      arousal: parseFloat(totalArousal).toFixed(2),
                      temper: parseFloat(totalTemper).toFixed(2),
                      group11: parseFloat(totalMoodValue11).toFixed(2) + " / " + parseFloat(totalMoodValue11P).toFixed(2),
                      group21: parseFloat(totalMoodValue21).toFixed(2) + " / " + parseFloat(totalMoodValue21P).toFixed(2),
                    });
  
                    // console.log("newSummaryList", newSummaryList);
                    if (summaryList.length === props.fileList.length) props.updateSummary(summaryList);
                  });
              // recordingId = result.recordingId;
            })
            .catch(err => {
              console.log("err", err);
            })
      },
    }),
    withHandlers({
      startAnalyzeFiles: props => () => {
        for (let file of props.fileList) {
          (() => {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            // Initialize file reader
            reader.onload = (e) => {
              // console.log("e.target.result", e.target.result);
              let content = e.target.result;
              props.analyzeFile(options.apiKey, content, file.name);
            }
          })(file)
        }
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