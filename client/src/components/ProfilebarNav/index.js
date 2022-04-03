import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { Profilebar, ProfilebarContent, ProfileLink } from './ProfilebarElements';
import './index.css';

const ProfilebarNav = () => {
    const { user } = useContext(AppContext);
    const { username } = useParams();
    const current_path = useLocation().pathname;

    return (
        <Profilebar className="profile-bar" aria-label="secondary">
            <ProfilebarContent>
                <ProfileLink 
                to={{ pathname: `/profile/${username}`, aboutProps: ""}} 
                isActive={() => { return current_path === "/profile/" + username; }}>
                    <span>Overview</span>
                </ProfileLink>
                <ProfileLink to={{ pathname: `/profile/${username}/discussions`, aboutProps: ""}}>
                            <span>Discussions</span>
                </ProfileLink>
                <ProfileLink to={{ pathname: `/profile/${username}/posts`, aboutProps: ""}}>
                            <span>Posts</span>
                </ProfileLink>
                { user && user.username === username && (
                    <>
                        <ProfileLink to={{ pathname: `/profile/${username}/liked`, aboutProps: ""}}>
                            <span>Liked</span>
                        </ProfileLink>
                        <ProfileLink to={{ pathname: `/profile/${username}/disliked`, aboutProps: ""}}>
                            <span>Disliked</span>
                        </ProfileLink>
                    </>
                )}
            </ProfilebarContent>
        </Profilebar>
    )
}

export default ProfilebarNav;