import React from 'react';
import { Table, Popconfirm } from 'antd';
import EditableCell from './EditableCell';

class EditableTable extends React.Component {
  constructor(props) {
    console.log("props", props);
    super(props);
    this.columns = [{
      title: 'Follower数',
      dataIndex: 'crit_FollowersCount',
      width: '25%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'crit_FollowersCount', text),
    }, {
      title: 'Star数',
      dataIndex: 'crit_StargazersCount',
      width: '15%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'crit_StargazersCount', text),
    }, {
      title: '我要添加好友的总数',
      dataIndex: 'addFollowersMax',
      width: '40%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'addFollowersMax', text),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { editable } = this.state.data[index].crit_FollowersCount;
        return (<div className="editable-row-operations">
          {
            editable ?
                <span>
              <a onClick={() => this.editDone(index, 'save')}>保存</a>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                <a>取消</a>
              </Popconfirm>
            </span>
                :
                <span>
              <a onClick={() => this.edit(index)}>Edit</a>
            </span>
          }
        </div>);
      },
    }];
    this.state = {
      data: [{
        key: '0',
        crit_FollowersCount: {
          editable: false,//其实属性名应该是'editing'. ant design团队有个typo
          value: 'Edward King 0',
        },
        crit_StargazersCount: {
          editable: false,
          value: '32',
        },
        addFollowersMax: {
          editable: false,
          value: 'London, Park Lane no. 0',
        },
      }],
    };
  }
  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
        editable={editable}
        value={text}
        onChange={value => this.handleChange(key, index, value)}
        status={status}
    />);
  }
  
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }
  
  render() {
    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return <div>
      <h4>好友添加条件</h4>
      <Table pagination={false} bordered dataSource={dataSource}
                  columns={columns} />
    </div>;
  }
}

export default EditableTable;