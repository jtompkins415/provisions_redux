import './User.css';

function User({currentUser}) {
    return (
        <div id="user-main-container">
            <div id="user-title-contianer">
                <span id="user-username">{currentUser.username}</span>
                <span id="user-email">{currentUser.email}</span>
            </div>
            <div id="user-detail-container">
                <span>First Name: {currentUser.first_name}</span>
                <span>Last Name: {currentUser.last_name}</span>
                <span>City: {currentUser.city}</span>
                <span>State: {currentUser.state}</span>
            </div>
        </div>
    )
}

export default User;