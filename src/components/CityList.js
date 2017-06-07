import React from 'react';

class CityList extends React.Component {
    delete(id){
        this.props.delete(id);
    }
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li style={s} key={item.id}>{item.text}&deg;C
                        <button className="delBtn" onClick={this.delete.bind(this, item)}>Delete</button></li>
                ))}
            </ul>
        );
    }
}

let s = {
    display: "flex",
    justifyContent: "space-between",
}

export default CityList;