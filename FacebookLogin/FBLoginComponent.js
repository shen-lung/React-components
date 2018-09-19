import React, { Component } from 'react'
import PropTypes from 'prop-types';


export default class FBLoginComponent extends Component {
    static PropTypes = {
        appId: PropTypes.string.isRequired,
        onResponse: PropTypes.func.isRequired,
        renderProps: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.func.isRequired,
        onLoadComplete: PropTypes.func,
        version: PropTypes.string,
        cookie: PropTypes.bool,
        language: PropTypes.string,
        fields: PropTypes.string,
        scope: PropTypes.string,
        autoLogin: PropTypes.bool,
        xfbml: PropTypes.bool,
    };

    static defaultProps = {
        version: 'v3.1',
        cookie: false,
        language: 'en_US',
        fields: 'name',
        scope: 'public_profile,email',
        autoLogin: true,
        xfbml: false,
    };

    componentDidMount() {
        this.loadSdk();
    }

    /**
    * Init FB object and if autoLogin parameter is true check the login status
    */
    fbInit = () => {
        const {
            appId,
            version,
            cookie,
            xfbml,
            autoLogin,
        } = this.props;

        window.fbAsyncInit = () => {
            window.FB.init({
                appId,
                cookie,
                xfbml,
                version,
            });
            if (autoLogin) {
                window.FB.getLoginStatus(this.checkLoginStatus)
            }
        };
    }

    /**
    * Set Up the Facebook SDK for Javascript
    */
    loadSdk = () => {
        const {language} = this.props;
        ((d, s, id, fbInit) => {
            const element = d.getElementsByTagName(s)[0];
            const fjs = element;
            let js = element;
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = `https://connect.facebook.net/${language}/sdk.js#version=v2.0`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk', this.fbInit());
    }

    /**
    * Check login status and return the user information to the called method
    */
    checkLoginStatus = ({
        status,
        authResponse,
    }) => {
        const {
            language,
            fields,
            onResponse,
            onLoadComplete,
            isLoggedIn,
        } = this.props;

        if (status === 'connected' && authResponse) {
            window.FB.api(
                '/me',
                {
                    locale: language,
                    fields: fields
                },
                (me) => {
                    onResponse({
                        ...me,
                        ...authResponse
                    });
                }
            );
            if (isLoggedIn) {
                isLoggedIn();
            }
        }
        if (onLoadComplete) {
            onLoadComplete();
        }
    }

     /**
    * Login on Facebook
    */
    facebookLogin = () => {
        const {scope} = this.props;

        window.FB.login(
            this.checkLoginStatus,
            {scope: scope}
        );
    }

    render() {
        return this.props.renderProps({
            onClick: this.facebookLogin,
        });
    }
}
