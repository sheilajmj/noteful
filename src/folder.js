import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Folder extends Component {
  componentDidMount() {
   const { id } = this.props.match.params.id
  this.props.folder.id
  }

  render(){
    const folder = this.props.folder
    console.log ('this is the folder.id', folder.id)
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