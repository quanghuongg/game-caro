import React from 'react';
import { Form, Button } from 'react-bootstrap'
import $ from 'jquery';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            name: "",
            password: "",
            rePassword: ""
        };
    }

    registerClick(e){
        var me = this;
        e.target.disabled = true;
        if(this.state.password !== this.state.rePassword){
            alert('Password and re-Password not match');
            e.target.disabled = false;
            return ;
        }
        // Call API
        $.ajax({
            method: 'POST',
            url: "https://rest-api-jwt.herokuapp.com/user/register",
            data: {
                "username": this.state.username,
                "name": this.state.name,
                "password": this.state.password
            },
            success: function(res){
                alert(res.status);
                me.props.history.push('/login');
            },
            error: function(err){
                alert(err.responseJSON.Info);
                me.props.history.push('/register');
                return;
            }
        });
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h4>Register</h4>
                <div className="form-login">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" required value={this.state.email} name="username" onChange={(e)=>{this.handleChange(e)}}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Display name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" required value={this.state.name} name="name" onChange={(e)=>{this.handleChange(e)}}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required value={this.state.password} name="password" onChange={(e)=>{this.handleChange(e)}}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Repeat password</Form.Label>
                            <Form.Control type="password" placeholder="Repeat Password" required value={this.state.rePassword} name="rePassword" onChange={(e)=>{this.handleChange(e)}}/>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={(e)=>{this.registerClick(e)}}>Sign Up</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Register;