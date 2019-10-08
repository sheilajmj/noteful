import React from 'react';

export default function ValidationErrors(props) {
    if (props.message){
        return (
            <div className="errorMessage"> {props.message} </div>
        )
    }
}
