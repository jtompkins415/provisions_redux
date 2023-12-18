import {Link} from '@mui/material/';
import './NavBar.css';

function NavBar({currentUser, logout, cart}){


    return (
       <div id='nav-main-container'>
            <div id='icon-container'>
                <span id='nav-icon'>Provisions</span>
            </div>
            <div id='nav-links-container'>
                <Link href='/' className='nav-link'>Home</Link>
                <Link href='/about' className='nav-link'>About</Link>
                <Link href='/shop' className='nav-link'>Shop</Link>

                {cart.currentCart.length ? (
                    <>
                        <Link href={'/shop/cart'} className='nav-link'>Cart</Link>
                    </>
                ): null
                }

                {currentUser ? (
                    <>
                        <Link href={`/account/${currentUser.username}`} className='nav-link'>Account</Link>
                        <Link href='/' className='nav-link' onClick={logout}>Logout</Link>
                    </>
                    ):(
                    <>
                        <Link href='/login' className='nav-link'>Login</Link>
                        <Link href='/signup' className='nav-link'>Sign-up</Link>
                    </>
                )}
                
            </div>
       </div>
            
        
    );
}

export default NavBar;



