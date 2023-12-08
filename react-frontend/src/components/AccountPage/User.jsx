import './User.css';

function User({currentUser}) {
    return (
        <div id="user-main-container">
            <div id="user-title-container">
                <span id="user-username">{currentUser.username}</span>
                <span id="user-email">{currentUser.email}</span>
            </div>
            <div id="user-detail-container">
                <span><b>First Name:</b> {currentUser.first_name}</span>
                <span><b>Last Name:</b> {currentUser.last_name}</span>
                <span><b>City:</b> {currentUser.city}</span>
                <span><b>State:</b> {currentUser.state}</span>
            </div>
        </div>
    )
}

export default User;