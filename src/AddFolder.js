import React, { Component } from 'react';
import { uid } from 'react-uid';

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    addFolder: "",
    };
  }


  handleSubmit(event) {
    event.preventDefault();
    const newFolderName = document.getElementById("newFolderName").value
    const newFolderId = uid(newFolderName)
    //look up how a new react object gets an id findById, search console.error,  
    const newFolderObject = {name: newFolderName, id: newFolderId}
    this.handleAddNewFolder(newFolderObject);
  }

  handleAddNewFolder(folder){
  const url = 'http://localhost:9090/folders'
  const options = {
        method: 'POST',
        body: folder,
        headers: {
          "Content-Type": "application/json",
        }
      };
  fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then(data => {
          this.context.handleAddFolder(data);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }






  
    render(){
      
            return( 
            <section className="addFolder">
              <form className="registration"></form>
              <label>Add New Folder</label>
              <input
                type="text"
                name="newFolderName"
                id="newFolderName"
                placeholder="new folder name"
              />
              <button for= 'newFolderName' type="submit"  onClick= {e => this.handleSubmit(e)}>Add Folder</button>
            </section> 
           
            )} 
    }
    
      

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const bookmark = (({title, url, description, rating}) => ({title, url, description, rating}))(this.state);
  //   const url ='https://tf-ed-bookmarks-api.herokuapp.com/bookmarks';
  //   const options = {
  //     method: 'POST',
  //     body: JSON.stringify(bookmark),
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": "Bearer $2a$10$ZhdeJefcb.5sx/DCmO/n8u5sJLcARAdbHw9tfm1mevGRq3s1.5DpW"
  //     }
  //   };

  //   fetch(url, options)
  //     .then(res => {
  //       if(!res.ok) {
  //         throw new Error('Something went wrong, please try again later');
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       this.setState({
  //         title: "",
  //         url: "",
  //         description: "",
  //         rating: 1
  //       });
  //       this.props.handleAdd(bookmark);
  //     })
  //     .catch(err => {
  //       this.setState({
  //         error: err.message
  //       });
  //     });
  // }

//   render() {
//     const error = this.state.error
//           ? <div className="error">{this.state.error}</div>
//           : "";

//     return (
//       <div className="addbookmark">
//         <h2>Add Bookmark</h2>
//         { error }
//         <form className="addbookmark__form" onSubmit={e => this.handleSubmit(e)}>
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             placeholder="Title"
//             value={this.state.title}
//             onChange={e => this.titleChanged(e.target.value)}/>
//           <label htmlFor="url">Url:</label>  
//           <input
//             type="text"
//             name="url"
//             id="url"
//             placeholder="url"
//             value={this.state.url}
//             onChange={e => this.urlChanged(e.target.value)}/>
//           <label htmlFor="description">Description:</label>  
//           <textarea
//             name="description"
//             id="description"
//             placeholder="description"
//             value={this.state.description}
//             onChange={e => this.descriptionChanged(e.target.value)}/>
//           <label htmlFor="rating">Rating: </label>
//           <input
//             type="number"
//             name="rating"
//             id="rating"
//             min="1"
//             max="5"
//             value={this.state.rating}
//             onChange={e => this.ratingChanged(e.target.value)}/>

//           <div className="addbookmark__buttons">
//             <button onClick={e => this.props.showForm(false)}>Cancel</button>
//             <button type="submit" >Save</button>
//           </div>  
//         </form>
//       </div>
//     );
//   }
// }

export default AddFolder;