import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import './login.css';

class Login extends Component {
  render() {
    return (
    	<Container>
    		<div>
    			<h6 className="title"> Promarc </h6>
    			<h1 className="subtitle text-muted">Find your team.</h1>
    		</div>
		    <div>
		    	<Button className="sign-in" color="primary" a href="http://localhost:3001/api/auth/google">Sign in with Google</Button>
		    </div>
		    <p class="mt-5 mb-3 text-muted copyright">© 2018-2019 • Santa Clara University</p>
	    </Container>
    );
  }
}

export default Login;
