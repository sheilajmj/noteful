import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Folder extends Component {

  render(){
    const folder = this.props.folder
    console.log (folder.id)
    return (
        <section className="folder" id = {folder.id} key={folder.id}>      
            <Link to={`/folder/${ folder.id }`} onClick= {this.props.onClick.bind(this)} value = {folder.id}> 
              {folder.name}  
            </Link>
        
        </section>
    )
  }    

}

  

export default Folder;