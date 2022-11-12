import {Fragment, useContext} from "react";
import {Link, Outlet} from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/crown.svg";
import './navigation.styles.scss'
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  // Navigation re-renders when currentUser changes, as it is hooked with "useContext"
  const {currentUser} = useContext(UserContext)
  return (
    <Fragment>
      <div className={'navigation'}>
        <Link className={'logo-container'} to={'/'}>
          <Logo className={'logo'}></Logo>
        </Link>

        <div className={'nav-links-container'}>
          <Link className={'nav-link'} to={'/'}>
            Home
          </Link>
          <Link className={'nav-link'} to={'/shop'}>
            Shop
          </Link>
          {
            currentUser ? (
              <span className={'nav-link'} onClick={signOutUser}>Sign Out {currentUser.displayName}</span>
            ) : (
            <Link className={'nav-link'} to={'/auth'}>
            Sign In
            </Link>
            )
          }
        </div>
      </div>
      <Outlet></Outlet>
    </Fragment>
  )
}

export default Navigation;