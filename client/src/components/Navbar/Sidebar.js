import React, { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';
import { SidebarNav, SidebarButton, SidebarMenu, MenuItem, MenuLink, PageFade,
    ProfileMenu, ProfileMenuItem, ProfilePicture, ProfileMenuLink, ProfileMenuBottom
    } from './SidebarElements';
import profile_placeholder from '../../images/profile_placeholder.png';
import './sidebar.css';

const Sidebar = ({ userImage }) => {

    const {logout, user, nightMode, toggleNightMode} = useContext(AppContext);

    const [isOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!isOpen);

    return (
        <>
            <SidebarNav isOpen={ isOpen } className={`${isOpen ? 'sidebar-opened' : 'sidebar-closed'}`}> 
                <SidebarButton className="sidebar-button" onClick={ toggle } />
                <svg id="hamburger-side-menu" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50">
                    <path className="hamburger-top" fill="#3ba55c" d="M8.667,15h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,15,8.667,15z"/>
                    <path className="hamburger-middle" fill="#3ba55c" d="M8.667,26h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,26,8.667,26z"/>
                    <path className="hamburger-bottom" fill="#3ba55c" d="M8.667,37h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,37,8.667,37z"/>
                </svg>

                {!user ?
                <SidebarMenu>
                    <MenuItem>
                        <MenuLink to="/home">Home</MenuLink>
                        <MenuLink to="/about">About</MenuLink>
                    </MenuItem>
                    <MenuItem>
                        <MenuLink to="/auth/login">Log in</MenuLink>
                        <MenuLink to="/auth/register">Sign up</MenuLink>
                    </MenuItem>
                </SidebarMenu>
                :
                <ProfileMenu>
                    <ProfileMenuItem>
                        <ProfilePicture>
                            <img src={userImage ? userImage : profile_placeholder} alt="User profile"/>
                        </ProfilePicture>
                        <h3>{user.username}</h3>
                        <h2>Reputation: {user.reputation}</h2>
                    </ProfileMenuItem>
                    <ProfileMenuItem>
                        <ProfileMenuLink to="/home">
                            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path fill="#FFF" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path>
                            </svg>
                            <span>Home</span>
                        </ProfileMenuLink>
                        <ProfileMenuLink to="/about">
                            <h3>About</h3>
                        </ProfileMenuLink>
                    </ProfileMenuItem>
                    <ProfileMenuItem>
                        <ProfileMenuLink to={{ pathname: `/profile/${user.username}` }}>
                            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                <path fill="#FFF" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>
                            </svg>
                            <span>Profile</span>
                        </ProfileMenuLink>
                        <ProfileMenuLink to="/settings">
                            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="#FFF" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path>
                            </svg>
                            <span>User Settings</span>
                        </ProfileMenuLink>
                    </ProfileMenuItem>
                    <ProfileMenuItem>
                        <ProfileMenuLink to="/create-post">
                            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path>
                            </svg>
                            <span>Post Discussion</span>
                        </ProfileMenuLink>
                    </ProfileMenuItem>
                    <ProfileMenuBottom>
                        <svg onClick={logout} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#FFF" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path>
                        </svg>
                        <svg onClick={toggleNightMode} className={`${nightMode ? 'active navbar-night' : 'navbar-night'}`} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="#FFF" d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path>
                        </svg>
                    </ProfileMenuBottom>
                </ProfileMenu>
                }
            </SidebarNav>
            <PageFade isOpen={ isOpen } onClick={ toggle } />
        </>
    )
}

export default Sidebar
