import React from 'react';

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

export default CityList;