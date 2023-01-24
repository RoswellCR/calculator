import React, {Component}from 'react';
//import logo from './logo.svg';
import './App.css';
import Form from './Form';

class App extends Component{
  state = {
    fields:{}
  }
  onChange = updatedValue => {
      //console.log('App Component got' , fields)
      this.setState({fields: {
        ...this.state.fields,
        ...updatedValue
      }
      });
  }
  render(){
    return (
      <div className="App">

        <h1> My Form </h1>
        <Form  onChange ={fields => this.onChange(fields)}/>
        <p>
          {JSON.stringify(this.state.fields, null, 2)}
        </p>
      </div>
    );
  }
}

export default App;
