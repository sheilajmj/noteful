import React, { Component } from 'react';

class NoteErrors extends Component {

    static getDerivedStateFromError(error){
        return {hasError: false}
    };

    render(){
        if (this.state.hasError){
            return <h2>Could not display your notes.  Please try again.</h2>
        }
        return this.props.children
    }
}

export default NoteErrors