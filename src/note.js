import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Note extends Component {

  render(){
    const item = this.props.item
    return (
        <section className="note" id = {item.id} key = {item.id}> 
          <Link to={`{/note/${item.id}`}><h2> {item.name} </h2></Link>
            <p>{item.content}</p>
            <h3>{item.modified}</h3>
           
            <button type="button" onClick= {this.props.onClick.bind(this)} value = {item.id}>Delete Note</button>
        </section>
    )
  }
  

}

  

export default Note;