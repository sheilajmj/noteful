import React, { Component } from 'react';
import { Link } from 'react-router-dom'



class Folder extends Component {
  render(){
    const folder = this.props.folder
    return (
        <section className="folder" id = {folder.id} key={folder.id}>      
            <Link to={`/folder/${ folder.id }`}> 
              {folder.name}  
            </Link>
        </section>
    )
  }    

}

  

export default Folder;