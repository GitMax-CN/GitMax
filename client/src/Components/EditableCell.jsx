import React from 'react';
import { Input, InputNumber} from 'antd';

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
        nextState.value !== this.state.value;
  }
  handleChange(value) {
    
  }
  render() {
    const { value, editable } = this.state;
    return (<div>
      {
        editable ?
            <div>
              <InputNumber min={this.props.min} max={this.props.max} value={value}
                           onChange={value => this.setState({ value })}/>
            </div>
            :
            <div className="editable-row-text">
              {value.toString() || ' '}
            </div>
      }
    </div>);
  }
}

export default EditableCell;