import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isLogged: false
        };
    }

    loginClick(e) {
        var me = this;
        e.target.disabled = true;
        // Call API
        $.ajax({
            method: 'POST',
            url: "https://rest-api-jwt.herokuapp.com/user/login",
            data: {
                "username": this.state.username,
                "password": this.state.password
            },
            success: function (res) {
                alert(res.status);
                me.props.dispatch({
                    type: "Logged"
                });
                localStorage.setItem("username", me.state.username);
                localStorage.setItem("token", me.state.token)
                me.props.history.push('/');
            },
            error: function (err) {
                alert(err.responseJSON.Info);
                window.location.reload();
                return;
            }
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">ĐĂNG NHẬP</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text" id="inputAccount" className="form-control"
                                           placeholder="Nhập tài khoản" required="required" autoFocus={true}
                                           autoComplete="true"
                                           value={this.state.email} name="username" onChange={(e)=>{this.handleChange(e)}}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input className="form-control"
                                           placeholder="Nhập mật khẩu" required="required" type="password"
                                           autoComplete="true"
                                           value={this.state.password}
                                           name="password" onChange={(e)=>{this.handleChange(e)}}/>
                                </div>
                            </div>
                            <a className="btn btn-primary btn-block"
                               onClick={(e)=>{this.loginClick(e)}}>ĐĂNG NHẬP</a>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Login);