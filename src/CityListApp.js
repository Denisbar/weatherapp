import React from 'react';

class CityListApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {items: [], text: ''};
    }

    render() {
        return (
            <div>
                <CityList
                    items={this.state.items}
                    delete={this.delete.bind(this)} />
                <form onSubmit={this.handleSubmit}>
                    <button>{'Add => ' + this.props.name}</button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        var newItem = {
            text: this.props.name + ' : ' + this.props.t,
            id: Date.now()
        };
        this.setState((prevState) => ({
            items: prevState.items.concat(newItem),
            text: ''
        }));
    }

    delete(id){
        let items = this.state.items;
        items = items.filter(item => item != id );
        this.setState({items});
    }
}

class CityList extends React.Component {
    delete(id){
        this.props.delete(id);
    }
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}&deg;
                        <button className="delBtn" onClick={this.delete.bind(this, item)}>Delete</button></li>
                ))}
            </ul>
        );
    }
}

export default CityListApp;