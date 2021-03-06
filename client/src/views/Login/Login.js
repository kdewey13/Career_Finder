import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import login from '../Captain.png'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            password: "",
            admin: false,
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            if (this.props.auth.user.admin) {
                this.props.history.push("/admin");
            } else { 
                this.props.history.push("/dashboard");
            }
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            if (nextProps.auth.user.admin) {
                this.props.history.push("/admin");
            } else { 
                this.props.history.push("/dashboard");
            }
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            userName: this.state.userName,
            password: this.state.password,
            admin: this.state.admin
        };

        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };


    render() {
        const { errors } = this.state;

        return (
            <div>
                <div className="main-theme">
                    <div className="form-container">
                        <div className="icon">
                            <a href="/"><img src={login} alt="Logo" /></a>
                            <h1>Career Finder</h1>
                            <h4>Account Login</h4>
                        </div>
                        <form className="general-form-area" noValidate onSubmit={this.onSubmit}>
                            <div className="single-column-col-1">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.userName}
                                    error={errors.userName}
                                    id="userName"
                                    type="text"
                                    placeholder="Username"
                                />
                                <span className="text-danger">
                                    {errors.userName}
                                    {errors.userNameNotFound}
                                    </span>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                />
                                <span className="text-danger">
                                    {errors.password}
                                    {errors.passwordIncorrect}
                                    </span>
                                {/* <div class="checkbox mb-3">
                            <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div> */}
                                <button className="regular-button" type="submit">Sign in</button>
                            </div>
                        </form>
                        <div>
                            <a className="link" href="/Register">Register</a>
                        </div>
                        <div>
                            <a className="link" href="/RecoverPassword">Forgot Username/Password</a>
                        </div>
                    </div>
                </div>
                <div className="credits">
                    Photo by <a  className="credit_link" href="https://www.vecteezy.com/free-vector/captain"  target="_blank">Captain Vectors by Vecteezy</a>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);