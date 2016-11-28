class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDone = this.updateDone.bind(this);
    this.delete = this.delete.bind(this);
    this.state = {
      items: [], // TODO convert to Map
      newTodoLabel: ''
    };
  }

  render() {
    console.log(this.state.items);
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} onUpdateDone={this.updateDone} onDelete={this.delete}/>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.newTodoLabel} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
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
    };

    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      newTodoLabel: ''
    }));
  }

  updateDone(targetId, newDone){
    var targetItem = this.state.items.filter((item) => {
        return item.id == targetId;
    })[0];

    // targetItem.done = newDone;

    this.setState({
      items: React.addons.update(this.state.items, { targetId : { $set: newDone }})
    })
    // this.setState(
    //   {items:this.state.items.concat(targetItem)}
    // )
  }

  delete(id){
    this.setState({
      items: this.state.items.filter((item) => {
        return item.id != id;
    })});
  }
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

ReactDOM.render(
    <TodoApp />,
    document.getElementById('app-container')
);