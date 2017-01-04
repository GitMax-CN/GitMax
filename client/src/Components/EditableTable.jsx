import React from 'react';
import { Table, Popconfirm } from 'antd';
import EditableCell from './EditableCell';

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
    }, {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'age', text),
    }, {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'address', text),
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { editable } = this.state.data[index].name;
        return (<div className="editable-row-operations">
          {
            editable ?
                <span>
              <a onClick={() => this.editDone(index, 'save')}>Save</a>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                <a>Cancel</a>
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
        name: {
          editable: false,
          value: 'Edward King 0',
        },
        age: {
          editable: false,
          value: '32',
        },
        address: {
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
    return <Table bordered dataSource={dataSource} columns={columns} />;
  }
}

export default EditableTable;