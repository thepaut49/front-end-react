function UserProfile(props) {
    return (
        <div>
            <h1>Utilisateur</h1>
            <div>Nom d'utilisateur : {props.username}</div>
            <div>Email : {props.email}</div>   
        </div>  
  );
}

export default UserProfile;