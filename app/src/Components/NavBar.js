import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className = 'nav-bar'>
      <Link to = '/' style = {linkStyles}><h2>Water My Plants</h2></Link>
      <div className = 'nav-items'>
        <Link to = '/inventory' style = {linkStyles}><span className = 'nav-item'>Inventory</span></Link>
        <Link to = '/signin' style = {linkStyles}><span className = 'nav-item'>Sign In</span></Link>
      </div>
    </div>
  )
};

export default NavBar;

const linkStyles = {
  textDecoration: 'none',
  color: 'black'
}