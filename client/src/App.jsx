import React from 'react';

class App extends React.Component {
  render () {
    return <div>
      {/*<p> Hello React! </p>*/}
      {this.props.children}
    </div>
  }
}

export default App;