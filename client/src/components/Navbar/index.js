import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import AppContext from '../../context/AppContext';
import HttpClient from '../../services/HttpClient';

import {
    Nav, NavStart, NavLogoLink, NavLink, NavCenter, NavSearchBar, NavSearchButton, NavEnd,
    NavLinkBordered, NavMenuButton, NavbarTop, NavbarMenu, MenuItem, MenuLink, NavButtonLink,
    NavProfile, ProfileInfo, ProfilePicture, ProfileText, NavProfileMenu, NavProfileLink,
    NavProfileSetting, NavSearchBarHelp
} from './NavbarElements';
import SlideButton from '../SlideButton';
import Sidebar from './Sidebar';
import './index.css';

import { ReactComponent as SearchSvg } from '../../images/search.svg';
import { ReactComponent as HomeSvg } from '../../images/home.svg';
import { ReactComponent as HamburgerMenuSvg } from '../../images/hamburger_menu.svg';
import { ReactComponent as HamburgerMenuExitSvg } from '../../images/hamburger_menu_exit.svg';
import { ReactComponent as WritePostSvg } from '../../images/write_post.svg';
import { ReactComponent as ArrowDownSvg } from '../../images/arrow_down.svg';
import { ReactComponent as UserCircleSvg } from '../../images/user_circle.svg';
import { ReactComponent as CogSvg } from '../../images/cog.svg';
import { ReactComponent as MoonSvg } from '../../images/moon.svg';
import { ReactComponent as SignOutSvg } from '../../images/sign_out.svg';

import logoImg from '../../images/logo.png';
import profilePlaceholderImg from '../../images/profile_placeholder.png';

const Navbar = (props) => {

    const {logout, user, nightMode, toggleNightMode} = useContext(AppContext);
    const history = useHistory();    

    const [userImage, setUserImage] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const toggle = () => setOpen(!isOpen);

    const searchQuerry = () => history.push("/search/" + searchText);

    useEffect(() => {
        const getUserImage = async () => {
            if (!user) {
                setUserImage(null);
                return;
            }

            try {
                const { data } = await HttpClient().get("/api/user/image/" + user.imageId, {responseType: "arraybuffer"});
                const base64Image = btoa(
                    new Uint8Array(data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                );
                setUserImage("data:image/png;base64," + base64Image);
            } catch (e) {
                console.log(e);
            }
        }

        getUserImage();
    }, [user]);

    return (
        <Nav aria-label="primary">
            <NavStart>
                <NavLogoLink to="/">
                    <img id="logo" src={logoImg} alt="Logo"/>
                </NavLogoLink>
                <NavLink to="/home" hiddenon="mobile">
                    <HomeSvg/>
                    <span>Home</span>
                </NavLink>
                <NavLink to="/about" hiddenon="mobile">
                    <span>About</span>
                </NavLink>
            </NavStart>
            <NavCenter>
                <NavSearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <NavSearchBarHelp>
                        <div>
                            <p>user:username <span>search by user</span></p>
                            <p>"key words here" <span>exact phrase</span></p>
                        </div>
                        <div>
                            <p>likes:1 <span>discussions with 1+ likes</span></p>
                            <p>[tag] <span>search within tags</span></p>
                        </div>
                </NavSearchBarHelp>
                <NavSearchButton onClick={searchQuerry}>
                    <SearchSvg style={{ height: "22px", paddingTop: "0.3em" }}/>
                </NavSearchButton>
            </NavCenter>
            <NavEnd user={user} isOpen={isOpen} className={`${isOpen ? 'navmenu-opened' : 'navmenu-closed'}`}>
                {!user ? 
                <>
                    <NavLink to="/auth/login" hiddenon="tablet">
                        <span>Log in</span>
                    </NavLink>
                    <NavLinkBordered to="/auth/register">Sign up</NavLinkBordered>
                    <NavMenuButton className="navbar-button" onClick={toggle}/>
                    <HamburgerMenuSvg id="hamburger-nav-menu"/>
                    <NavbarTop isOpen={isOpen}>
                        <NavbarMenu>
                            <MenuItem>
                                <NavMenuButton exit className="navbar-button-exit" onClick={toggle}/>
                                <HamburgerMenuExitSvg id="hamburger-nav-menu-exit"/>
                            </MenuItem>
                            <MenuItem>
                                <MenuLink to="/auth/login">Log in</MenuLink>
                            </MenuItem>
                            <MenuItem>
                                <MenuLink to="/auth/register">Sign up</MenuLink>
                            </MenuItem>
                        </NavbarMenu>
                    </NavbarTop>
                </>
                :
                <>
                    <NavButtonLink to="/create-post" title="Create a discussion">
                        <WritePostSvg style={{marginLeft: "5px", marginBottom: "1px"}}/>
                    </NavButtonLink>
                    <NavProfile onClick={toggle}>
                        <ProfileInfo>
                            <ProfilePicture><img src={userImage ? userImage : profilePlaceholderImg} alt="User profile"/></ProfilePicture>
                            <ProfileText>
                                <span><span>{ user.role === "moderator" ? "Chameleon " : "" }</span>{ user.username }</span>
                                <span>Reputation: { user.reputation }</span>
                            </ProfileText>
                        </ProfileInfo>
                        <ArrowDownSvg/>
                    </NavProfile>
                    <NavProfileMenu>
                        <h3>My stuff</h3>
                        <NavProfileLink to={{ pathname: `/profile/${user.username}` }}>
                            <UserCircleSvg/>
                            <span>Profile</span>
                        </NavProfileLink>
                        <NavProfileLink to="/settings">
                            <CogSvg/>
                            <span>User Settings</span>
                        </NavProfileLink>
                        <h3>View Options</h3>
                        <NavProfileSetting onClick={toggleNightMode}>
                            <MoonSvg className={`${nightMode ? 'active navbar-night' : 'navbar-night'}`}/>
                            <span>Dark mode</span>
                            <SlideButton activated={nightMode}/>
                        </NavProfileSetting>
                        <NavProfileSetting onClick={logout}>
                            <SignOutSvg style={{marginLeft: "1px", marginTop: "1px"}}/>
                            <span>Log out</span>
                        </NavProfileSetting>
                    </NavProfileMenu>
                </>
                }
            </NavEnd>
            <Sidebar userImage={userImage}/>
        </Nav>
    )
}

export default Navbar;