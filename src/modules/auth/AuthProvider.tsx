import React, {Component} from "react";
import AuthService from "../../services/AuthService";
import userManager from "../../utils/userManager";

const AuthContext = React.createContext({
    signinRedirectCallback: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signinRedirect: () => ({}),
    signinSilentCallback: () => ({}),
    createSigninRequest: () => ({})
});

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component<any, any> {
    authService: any;

    constructor(props: any) {
        super(props);
        this.authService = new AuthService()
    }

    render() {
        return (
            <AuthContext.Provider value={this.authService}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}