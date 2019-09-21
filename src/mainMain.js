import React, { Component } from 'react';
import Note from './note'

class MainMain extends Component {

  render(){
    const noteComponents = this.props.notes.map((item) => {
      return <Note item = {item} onClick= {this.props.onClick.bind(this)}/>
  })
  
    return (
        <section className="folders">
           {noteComponents}
        </section>
    )
  }
  

}
  

export default MainMain;