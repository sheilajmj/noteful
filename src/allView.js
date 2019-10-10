import React, { Component } from 'react';
import AllViewNotes from './allViewNotes';
import AllViewSidebar from './allViewSidebar';

class AllView extends Component {
    render() {
        return (
            <div className="viewWrap">
                <section className="sidebar">
                    < AllViewSidebar />
                </section>
                <section className="mainSection">
                    <AllViewNotes />

                </section>
            </div>
        )
    }
}

export default AllView