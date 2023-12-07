import allContacts from '../assets/nav_bar/all_contacts.svg'
import allContactsActive from '../assets/nav_bar/all_contacts_filled.svg'
import lastActive from '../assets/nav_bar/last_active.svg'
import lastActiveActive from '../assets/nav_bar/last_active_filled.svg'
import favourites from '../assets/nav_bar/favourites.svg'
import favouritesActive from '../assets/nav_bar/favourites_filled.svg'
import profile from '../assets/nav_bar/profile.svg'
import profileActive from '../assets/nav_bar/profile_filled.svg'
import { Link, useLocation } from 'react-router-dom'

const DesktopNavBar = () => {
    const location = useLocation()

    return (
        <div className="h-full w-28 flex hidden lg:block" style={{ background: '#363A3F', fontSize: '10px' }}>
            <div className="flex items-start text-white font-bold pt-5 pb-1 ">
                <div className="w-full max-w-sm mx-auto flex flex-col gap-5 px-7">
                    <div className={`flex items-center justify-center ${location.pathname === '/' ? 'active' : 'text-gray-300'}`}>
                        <Link to="/">
                            {location.pathname !== '/' && <img alt="All contacts" width={30} height={30} src={allContacts} className="mx-auto mb-1" />}
                            {location.pathname === '/' && <img alt="All contacts" width={30} height={30} src={allContactsActive} className="mx-auto mb-1" />}
                            <div>Contacts</div>
                        </Link>
                    </div>
                    <div className={`flex items-center justify-center ${location.pathname === '/last-active' ? 'active' : 'text-gray-300'}`}>
                        <Link to="/last-active">
                            {location.pathname !== '/last-active' && <img alt="Last active" width={30} height={30} src={lastActive} className="mx-auto mb-1" />}
                            {location.pathname === '/last-active' && <img alt="Last active" width={30} height={30} src={lastActiveActive} className="mx-auto mb-1" />}
                            <div className="text-center center flex items-center justify-center">Last active</div>
                        </Link>
                    </div>
                    <div className={`flex items-center justify-center ${location.pathname === '/favourites' ? 'active' : 'text-gray-300'}`}>
                        <Link to="/favourites">
                            {location.pathname !== '/favourites' && <img alt="Favourites" width={30} height={30} src={favourites} className="mx-auto mb-1" />}
                            {location.pathname === '/favourites' && <img alt="Favourites" width={30} height={30} src={favouritesActive} className="mx-auto mb-1" />}
                            <div>Favourites</div>
                        </Link>
                    </div>
                    <div className={`flex items-center justify-center ${location.pathname === '/profile' ? 'active' : 'text-gray-300'}`}>
                        <Link to="/profile">
                            {location.pathname !== '/profile' && <img alt="Profile" width={30} height={30} src={profile} className="mx-auto mb-1" />}
                            {location.pathname === '/profile' && <img alt="Profile" width={30} height={30} src={profileActive} className="mx-auto mb-1" />}
                            <div>Profile</div>
                        </Link>
                    </div>                   
                </div>
            </div>
        </div>
    )
}

export default DesktopNavBar
