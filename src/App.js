import './App.css';
import React from 'react';
import axios from "axios";
import LoginForm from './Login/LoginForm';
import UserProfile from './user/UserProfile'

// GitHub usernames: gaearon, sophiebits, sebmarkbage, bvaughn

const CardList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
);

class Card extends React.Component {
	render() {
  	const profile = this.props;
  	return (
    	<div className="github-profile">
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    	</div>
    );
  }
}

class Form extends React.Component {
	state = { userName: '' };
	handleSubmit = async (event) => {
  	event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' });
  };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
    	  <input 
          type="text" 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username" 
          required 
        />
        <button>Add card</button>
    	</form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
    user: null,
  };
  addNewProfile = (profileData) => {
  	this.setState(prevState => ({
    	profiles: [...prevState.profiles, profileData],
    }));
  };
  login = (userData) => {
    console.log(userData);
    this.setState(prevState => ({
      user: userData,   
    }));
  }
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
        <LoginForm onSubmit={this.login} />
        {this.state.user !== null && <UserProfile />} 
      </div>
    );
  }	
}

export default App;
