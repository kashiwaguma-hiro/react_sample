import './App.css';
import React from 'react';
import Datetime from 'react-datetime';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDone = this.updateDone.bind(this);
    this.delete = this.delete.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.state = {
      items: [],
      newTodoLabel: ''
    };
  }

  render() {
     return (
      <div>
        <h3>TODO List</h3>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.newTodoLabel} placeholder="what's to do?"/>
          <button>{'ADD'}</button>
        </form>
        <TodoList items={this.state.items} onUpdateDone={this.updateDone} onDelete={this.delete} onUpdateDate={this.updateDate}/>
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
      done: false,
      date: ''
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

  updateDate(targetId, moment){
    var targetItem = this.state.items.filter((item) => {
        return item.id === targetId;
    })[0];

    targetItem.date = moment;

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
}


class TodoList extends React.Component {
  render() {
      return (
        <ul>
          {this.props.items.map(item => (
            <TodoItem key={item.id} item={item} onUpdateDone={this.props.onUpdateDone} onDelete={this.props.onDelete} onUpdateDate={this.props.onUpdateDate}/>
          ))}
        </ul>
      );
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this._onUpdateDone = this._onUpdateDone.bind(this);
    this._onUpdateDate = this._onUpdateDate.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  _onUpdateDone(e){
    this.props.onUpdateDone(this.props.item.id, e.target.checked);
  }

  _onUpdateDate(moment){
    this.props.onUpdateDate(this.props.item.id, moment);
  }

  _onDelete(){
    this.props.onDelete(this.props.item.id);
  }

  render() {
    const label = this.props.item.label;
    const done = this.props.item.done;

    return (
      <li className={done ? 'completed': ''}>
      <div>
        <label>
          <input type="checkbox" checked={done ? 'checked': ''} onChange={this._onUpdateDone}/>
          {label}
        </label>
        <Datetime className="datepicker" dateFormat="YYYY/MM/DD" timeFormat=""　onBlur={this._onUpdateDate}/>
        <input type="button" onClick={this._onDelete} value="DEL" className="delete-button"/>
        </div>
      </li>
    );
  }
}

export default TodoApp;