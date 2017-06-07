import React from 'react';

class Sun extends React.Component{
    
    render(){
        let url = "http://openweathermap.org/img/w/" + this.props.iconName + ".png";   
        return(
            <div style={{marginLeft: "0"}}><img className="skyIcon" src={url} /></div>
        );
    }
}

export default Sun;