import React, { Component } from 'react'
import FBLoginComponent from './FBLoginComponent';


const FacebookConnect = ({
    isLoggedIn,
    loadComplete,
    userName,
    onClick,
}) => {
    let component = null;

    if (loadComplete) {
        if (isLoggedIn) {
            component = <h5>Welcome {userName}</h5>
        } else {
            component = <button onClick={onClick}>Fb login</button>
        }
    }

    return (
        <div>
            <h4>FB login</h4>
            {component}
        </div>
    );
};

export default class FBLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            loadComplete: false,
            userName: ''
        };
    }

    /**
     * Callback function
     */
    responseFacebook = response => {
        this.setState({
            userName: response.name
        });
    }

    /**
     * Set true when the FBinit and load SDK processes are finished.
     */
    onLoadComplete = () => {
        this.setState({loadComplete: true});
    }

    /**
     * Set true if the user is log in already
     */
    setLoggedIn = () => {
        this.setState({isLoggedIn: true});
    }

    render() {
        let {
            userName,
            isLoggedIn,
            loadComplete,
        } = this.state;

        const renderButton = ({onClick}) => (
            <FacebookConnect
                isLoggedIn={isLoggedIn}
                onClick={onClick}
                loadComplete={loadComplete}
                userName={userName}
            />
        );

        return (
            <div>
                <FBLoginComponent
                    onResponse={this.responseFacebook}
                    appId='FB_APP_ID'
                    onLoadComplete={this.onLoadComplete}
                    isLoggedIn={this.setLoggedIn}
                    renderProps={renderButton}
                />
            </div>
        );
    }
}
