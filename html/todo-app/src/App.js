/*
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
*/


import './App.css';
import React from 'react';
// import ReactDOM from 'react-dom';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
// require('react-datepicker/dist/react-datepicker.css');


class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDone = this.updateDone.bind(this);
    this.delete = this.delete.bind(this);
    // this.updateDate = this.updateDate.bind(this);
    this.state = {
      items: [], // TODO convert to Map
      newTodoLabel: '',
      // newTodoDate: moment()
    };
  }

  render() {
 //         <DatePicker selected={this.state.newTodoDate} onChange={this.updateDate} />
 
    return (
      <div>
        <h3>TODO</h3>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.newTodoLabel} placeholder="what's to do?"/>
          <button>{'ADD'}</button>
        </form>
        <TodoList items={this.state.items} onUpdateDone={this.updateDone} onDelete={this.delete}/>
      </div>
    );
  }

  handleChange(e) {
    this.setState({newTodoLabel: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      id: Date.now(),
      label: this.state.newTodoLabel,
      done: false
      // ,date: moment()
    };

    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      newTodoLabel: ''
    }));
  }

  updateDone(targetId, newDone){
    var targetItem = this.state.items.filter((item) => {
        return item.id === targetId;
    })[0];

    targetItem.done = newDone;

    this.setState(
      {items:this.state.items}
    )
  }

  delete(id){
    this.setState({
      items: this.state.items.filter((item) => {
        return item.id !== id;
    })});
  }

  // updateDate(date){
  //   this.setState({newTodoDate: date});
  // }
}

class TodoList extends React.Component {
  render() {
      return (
        <ul>
          {this.props.items.map(item => (
            <TodoItem key={item.id} item={item} onUpdateDone={this.props.onUpdateDone} onDelete={this.props.onDelete}/>
          ))}
        </ul>
      );
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this._onUpdateDone = this._onUpdateDone.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  // delegate updateed done flag events.
  _onUpdateDone(e){
    this.props.onUpdateDone(this.props.item.id, e.target.checked);
  }

  _onDelete(){
    this.props.onDelete(this.props.item.id);
  }

  render() {
    const label = this.props.item.label;
    const done = this.props.item.done;

    return (
      <li className={done ? 'completed': ''}>
        <label>
          <input type="checkbox" checked={done ? 'checked': ''} onChange={this._onUpdateDone}/>
          {label}
          <input type="button" onClick={this._onDelete} value="DEL"/>
        </label>
      </li>
    );
  }

}

export default TodoApp;