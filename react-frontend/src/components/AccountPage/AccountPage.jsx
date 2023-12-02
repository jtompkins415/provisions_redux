import User from './User';
import './AccountPage.css';
function AccountPage({currentUser}){
    return (
        <div id="account-main-container">
            <div id="account-title-container">
                <h2>Account Details</h2>
            </div>
            <div id="account-detail-container">
                <User currentUser={currentUser} />
            </div>
        </div>
    )
}

export default AccountPage;