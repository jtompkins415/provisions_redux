import {Link} from '@mui/material/';

function NavBar(){
    return (
        <>
            <div className='icon-container'>
                <span className='icon'>Provisions</span>
            </div>
            <div className='nav-links-container'>
                <Link href='/' className='nav-link'>Home</Link>
                <Link href='/about' className='nav-link'>About</Link>
                <Link href='/shop' className='nav-link'>Shop</Link>
                <Link href='/login' className='nav-link'>Login</Link>
            </div>
        </>
    );
}

export default NavBar;



