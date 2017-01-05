import React from 'react';
import {Table, Popconfirm} from 'antd';
import EditableCell from './EditableCell';

class EditableTable extends React.Component {
  constructor(props) {
    console.log("props", props);
    super(props);
    this.columns = [{
      title: '好友的Follower数',
      dataIndex: 'crit_FollowersCount',
      width: '25%',
      render: (text, record, index) => this.renderColumns(this.state.data, index,
          'crit_FollowersCount', text),
    }, {
      title: '好友的Star数',
      dataIndex: 'crit_StargazersCount',
      width: '15%',
      render: (text, record, index) => this.renderColumns(this.state.data, index,
          'crit_StargazersCount', text),
    }, {
      title: '我要添加好友的总数',
      dataIndex: 'addFollowersMax',
      width: '40%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'addFollowersMax',
          text),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const {editable} = this.state.data[index].crit_FollowersCount;
        return (<div className="editable-row-operations">
          {
            editable ?
                <span>
                  <Popconfirm title="确定要保存好友条件吗?"
                              onConfirm={() => this.editDone(index, 'save')}>
                    <a>保存</a>
                  </Popconfirm>
                <a onClick={() => this.editDone(index, 'cancel')}>取消</a>
              
            </span>
                :
                <span>
              <a onClick={() => this.edit(index)}>修改</a>
            </span>
          }
        </div>);
      },
    }];
    this.state = {
      data: [{
        key: '0',
        crit_FollowersCount: {
          editable: false,//其实属性名定义有点confusing，这里editable是true表示正在编辑，false表示不在编辑，undefined表示不能编辑
          value: props.crit_FollowersCount,
          min: 0,
          max: 9999999,
        },
        crit_StargazersCount: {
          editable: false,
          value: props.crit_StargazersCount,
          min: 0,
          max: 9999999,
        },
        addFollowersMax: {
          editable: false,
          value: props.addFollowersMax,
          min: 1,
          max: 99999999,
        },
      }],
    };
  }
  
  renderColumns(data, index, key, text) {
    const {editable, status, min, max} = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
        editable={editable}
        value={text}
        min={min}
        max={max}
        onChange={value => this.handleChange(key, index, value)}
        status={status}
    />);
  }
  
  handleChange(key, index, value) {
    const {data} = this.state;
    data[index][key].value = value;
    this.setState({data});
  }
  
  edit(index) {
    const {data} = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({data});
  }
  
  editDone(index, type) {
    const {data} = this.state;
  
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    
    this.setState({data}, () => {
      if (type === "save"){//If user click save, then save this config into database.
        let config = {};
        Object.keys(data[index]).forEach(key => {
          if (key==="crit_StargazersCount") console.log(data[index][key].value, data[index].crit_StargazersCount.value);
          if (key !== "key") config[key] = data[index][key].value;
        });
        console.log("config", config);
        this.props.saveConfigIfChanged(config);
      }
  
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }
  
  render() {
    const {data} = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return <div>
      <h4>好友添加设置</h4>
      <Table pagination={false} bordered dataSource={dataSource}
             columns={columns}/>
    </div>;
  }
}

EditableCell.propTypes = {
  data: React.PropTypes.object,
};

export default EditableTable;