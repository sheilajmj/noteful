import React, { Component } from 'react';
import FolderSpecificNotes from './folderSpecificNotes';
import FolderSpecificSidebar from './folderSpecificSidebar';


class FolderView extends Component {
    render(){
        return(
            <div className="viewWrap">
                <section className="sidebar">
                    <FolderSpecificSidebar />
                </section>
                <section className="mainSection">
                    <FolderSpecificNotes />
                </section>
            </div>
        )
}
}

export default FolderView