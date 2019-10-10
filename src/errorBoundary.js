import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: false }
    };

    render() {
        if (this.state.hasError) {
            return <h2 className="errorMessage">Oh, no!  There was an error.  Please try again.</h2>
        }
        return this.props.children
    }
}

export default ErrorBoundary