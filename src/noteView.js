import React, { Component } from 'react';
import NoteMain from './selectedNote';
import NoteSidebar from './selectedNoteSidebar';




class FolderView extends Component {
    render(){
        return(
            <div className="viewWrap">
                <section className="sidebar">
                    <NoteSidebar/>
                </section>
                <section className="mainSection">
                    <NoteMain/>
                </section>
            </div>
        )
}
}

export default FolderView