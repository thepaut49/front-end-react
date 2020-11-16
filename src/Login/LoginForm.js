import React from 'react';
import axios from "axios";

class LoginForm extends React.Component {
	state = { username: '', password: '' };
	handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.post(`http://localhost:8080/users/signin?username=${this.state.username}&password=${this.state.password}`);
        console.log(resp);
        this.props.onSubmit(resp.data);
        this.setState({ username: '', password: '' });
    };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
            <h1>Connexion</h1>
            <div class="login">
                <div>
                    <label for="username">Nom d'utilisateur : </label>
                        <input type="text"
                            name="username"
                            id="username"
                            onChange={event => this.setState({ username: event.target.value })}
                            required />
                </div>
                <div>
                    <label for="password">Mot de passe : </label>
                        <input type="password"
                            name="password"
                            id="password"
                            onChange={event => this.setState({ password: event.target.value })}
                            required />
                </div>

                <div class="actions">
                    <button class="button">Se connecter</button>
                </div>
            </div>
    	</form>
    );
  }
}

export default LoginForm;