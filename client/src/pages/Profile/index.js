import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, Route } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import HttpClient from '../../services/HttpClient';
import { uploadPhoto } from '../../utils/Utils';
import { getSetDiscussions, getSetPosts, updateLikes, deleteDiscussionPost } from '../../utils/Utils';
import Page from '../../components/Page';
import ProfilebarNav from '../../components/ProfilebarNav';
import { ForumContainer, ForumInnerContainer, ForumDiscussion, ForumPost } from '../../components/ForumComponents';
import RankGenerator from '../../components/RankGenerator';
import { ProfileContainer, ProfileSection, ProfileImage } from './ProfileElements';
import profile_placeholder from '../../images/profile_placeholder.png';

const Profile = () => {
    const { user } = useContext(AppContext);
    const { username } = useParams();
    const current_path = useLocation().pathname;
    const [urlUser, setUrlUser] = useState(null);
    const [urlUserImage, setUrlUserImage] = useState(null);

    const [categoriesMap,] = useState(new Map());
    const [discussionsMap,] = useState(new Map());

    const [discussionsPosts, setDiscussionsPosts] = useState([]);
    const [discussionPostLikes, setDiscussionPostLikes] = useState([]);

    const [discussionsPostsLiked, setDiscussionsPostsLiked] = useState([]);
    const [discussionsPostsDisliked, setDiscussionsPostsDisliked] = useState([]);

    // Get the user
    useEffect(() => {
        const findUser = async () => {
            if (!username) {
                setUrlUserImage(null);
                setUrlUser(null);
                return;
            }

            let imagePath = null;
            try {
                const { data } = await HttpClient().get("/api/user/" + username);
                imagePath = data.imagePath;
                setUrlUser(data);
            } catch (e) {
                console.log(e);
                setUrlUser(null);
                return;
            }

            try {
                const user_pic_raw = await HttpClient().get("/api/user/image/" + imagePath, {responseType: 'blob'});
                
                // alt way: setUrlUserImage(URL.createObjectURL(user_pic_raw.data));
                const reader = new FileReader();
                reader.readAsDataURL(user_pic_raw.data);
                reader.onloadend = function () {
                    setUrlUserImage("data:image/png;base64," + reader.result.slice(reader.result.indexOf(",") + 1));
                };
            } catch (e) {
                console.log(e);
                setUrlUserImage(null);
            }
        };

        findUser();
    }, [username]);

    // Get the categories map
    useEffect(() => {
        const getCategoriesMap = async () => {
            const { data } = await HttpClient().get("/api/category");
            data.map((category) => categoriesMap.set(category._id, category.title));
        };

        getCategoriesMap();
    }, []);

    // Get discussions and posts
    useEffect(() => {
        const getDiscussionsPosts = async () => {
            if(!username || !current_path ||
                (current_path !== "/profile/" + username && 
                current_path !== "/profile/" + username + "/discussions" &&
                current_path !== "/profile/" + username + "/posts")) {
                setDiscussionsPosts([]);
                return;
            };

            let _discussions = await getSetDiscussions(null, username, (a, b) => a.createdAt < b.createdAt ? 1 : -1, 20, false);
            let _posts = await getSetPosts(null, username, (a, b) => a.createdAt < b.createdAt ? 1 : -1, 20, false);

            await Promise.all(_posts.map(async (_data) => {
                if (!discussionsMap.has(_data.discussionId)) {
                    const { data } = await HttpClient().get("/api/discussion/findById/" + _data.discussionId);
                    discussionsMap.set(data._id, data.categoryId);
                }

                return true;
            }));

            setDiscussionsPosts([..._discussions, ..._posts].sort((a, b) => a.createdAt < b.createdAt ? 1 : -1));
        };
        
        getDiscussionsPosts();
    }, [username, current_path]);

    // Get discussion and post likes
    useEffect(() => {
        const getDiscussionPostLikes = async () => {
            if (!user || !username || !discussionsPosts || !discussionsPosts.length || user.username !== username) {
                setDiscussionPostLikes([]);
                return;
            }

            const discussion_likes = await HttpClient().get("/api/likes/discussion");
            const post_likes = await HttpClient().get("/api/likes/post");

            let discussionMap = new Map();
            let postMap = new Map();

            for (let i = 0; i < discussion_likes.data.length; i++)
                discussionMap.set(discussion_likes.data[i].discussionId, discussion_likes.data[i].like);
            for (let i = 0; i < post_likes.data.length; i++)
                postMap.set(post_likes.data[i].postId, post_likes.data[i].like);
            
            let likes_array = [];
            for (let i = 0; i < discussionsPosts.length; ++i)
                if (discussionsPosts[i].hasOwnProperty("title")) {
                    if (discussionMap.has(discussionsPosts[i]._id))
                        likes_array.push({ id: discussionsPosts[i]._id, like: discussionMap.get(discussionsPosts[i]._id) });
                    else
                        likes_array.push({ id: discussionsPosts[i]._id, like: 0 });                        
                } else {
                    if (postMap.has(discussionsPosts[i]._id))
                        likes_array.push({ id: discussionsPosts[i]._id, like: postMap.get(discussionsPosts[i]._id) });
                    else
                        likes_array.push({ id: discussionsPosts[i]._id, like: 0 });            
                }

            setDiscussionPostLikes(likes_array);
        };

        getDiscussionPostLikes();
    }, [discussionsPosts, user, username]);

    const callUpdateLikes = async (elem, liked) => {
        updateLikes(elem, liked, discussionPostLikes, setDiscussionPostLikes, user);
    };

    const callDeleteDiscussionPost = async (elem) => {
        deleteDiscussionPost(elem, discussionsPosts, setDiscussionsPosts);
    };

    // Get all liked and disliked posts and discussions
    useEffect(() => {
        const getLikedDislikedDiscussionsPosts = async () => {
            if (!user || !username || user.username !== username || !current_path ||
                (current_path !== "/profile/" + username + "/liked"
                && current_path !== "/profile/" + username + "/disliked")) {
                setDiscussionsPostsLiked([]);
                setDiscussionsPostsDisliked([]);
                return;
            }

            const discussion_data = await HttpClient().get("/api/likes/discussion");
            const post_data = await HttpClient().get("/api/likes/post");

            let liked_disliked_discussions = await Promise.all(discussion_data.data.map(async (like_dislike) => {
                const { data } = await HttpClient().get("/api/discussion/findById/" + like_dislike.discussionId);

                if (data === "")
                    return;

                return { data: data, like: like_dislike.like };
            }));

            let liked_disliked_posts = await Promise.all(post_data.data.map(async (like_dislike) => {
                const { data } = await HttpClient().get("/api/post/findById/" + like_dislike.postId);
                
                if (data === "")
                    return;

                if (!discussionsMap.has(data.discussionId)) {
                    const _discussion = await HttpClient().get("/api/discussion/findById/" + data.discussionId);
                    discussionsMap.set(_discussion.data._id, _discussion.data.categoryId);
                }

                return { data: data, like: like_dislike.like };
            }));

            let joined_data = [...liked_disliked_discussions, ...liked_disliked_posts].sort((a, b) => (a.like < b.like) ? 1 : (a.like === b.like ? (a.createdAt < b.createdAt ? 1 : -1) : -1));
            if (joined_data.includes(undefined))
                joined_data.splice(joined_data.indexOf(undefined));

            let liked_data = [];
            let disliked_data = [];
            joined_data.map((elem) => {
                if (elem.like === 1)
                    liked_data.push(elem.data);
                else
                    disliked_data.push(elem.data);
                return true;
            });

            setDiscussionsPostsLiked(liked_data.slice(0, 20));
            setDiscussionsPostsDisliked(disliked_data.slice(0, 20));            
        };

        getLikedDislikedDiscussionsPosts();
    }, [current_path, username, user]);

    const updateLikesLikedDisliked = async (elem, liked) => {
        if (discussionsPostsLiked.includes(elem)) {
            if (liked === 1)
                liked = 0;

            let i = discussionsPostsLiked.indexOf(elem);
            setDiscussionsPostsLiked([...(discussionsPostsLiked.slice(0, i)), ...(discussionsPostsLiked.slice(i + 1))]);
        } else {
            if (liked === -1)
                liked = 0;

            let i = discussionsPostsDisliked.indexOf(elem);
            setDiscussionsPostsDisliked([...(discussionsPostsDisliked.slice(0, i)), ...(discussionsPostsDisliked.slice(i + 1))]);
        }

        const data = {
            like: liked
        };

        try {
            if (elem.hasOwnProperty("title"))
                await HttpClient().post("/api/likes/discussion/" + elem._id, data);
            else
                await HttpClient().post("/api/likes/post/" + elem._id, data);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteDiscussionPostLikedDisliked = async (elem) => {
        if (discussionsPostsLiked.includes(elem)) {
            deleteDiscussionPost(elem, discussionsPostsLiked, setDiscussionsPostsLiked);
        } else {
            deleteDiscussionPost(elem, discussionsPostsDisliked, setDiscussionsPostsDisliked);
        }
    };

    const callUploadPhoto = async event => {
        uploadPhoto(event.target.files[0]);
        window.location.reload();
    };

    return (
        <Page>
            <ProfilebarNav />
            <ForumContainer>
                <ForumInnerContainer>
                    <ProfileContainer>
                        <div>
                            <Route exact path="/profile/:username">
                                {discussionsPosts.length > 0 && discussionsPosts.map((elem, index) => (
                                        <div key={index}>
                                            {elem.hasOwnProperty("title") ?
                                                <ForumDiscussion
                                                    categoryTitle={categoriesMap.get(elem.categoryId)}
                                                    index={index}
                                                    discussion={elem}
                                                    like={(discussionPostLikes && discussionPostLikes.length > index) ? discussionPostLikes[index].like : 0}
                                                    onLikeClick={callUpdateLikes}
                                                    onDeleteClick={callDeleteDiscussionPost}
                                                />
                                                :
                                                <ForumPost
                                                    categoryTitle={categoriesMap.get(discussionsMap.get(elem.discussionId))}
                                                    index={index}
                                                    post={elem}
                                                    like={(discussionPostLikes && discussionPostLikes.length > index) ? discussionPostLikes[index].like : 0}
                                                    onLikeClick={callUpdateLikes}
                                                    onDeleteClick={callDeleteDiscussionPost}
                                                />
                                            }
                                        </div>
                                ))}
                            </Route>
                            <Route path="/profile/:username/discussions">
                                {discussionsPosts.length > 0 && discussionsPosts.map((elem, index) => (
                                    <div key={index}>
                                        { elem.hasOwnProperty("title") && (
                                            <ForumDiscussion
                                                categoryTitle={categoriesMap.get(elem.categoryId)}
                                                index={index}
                                                discussion={elem}
                                                like={(discussionPostLikes && discussionPostLikes.length > index) ? discussionPostLikes[index].like : 0}
                                                onLikeClick={callUpdateLikes}
                                                onDeleteClick={callDeleteDiscussionPost}
                                            />
                                        )}
                                    </div>
                                ))}
                            </Route>
                            <Route path="/profile/:username/posts">
                                {discussionsPosts.length > 0 && discussionsPosts.map((elem, index) => (
                                    <div key={index}>
                                        { !elem.hasOwnProperty("title") && (
                                            <ForumPost
                                                key={index}
                                                categoryTitle={categoriesMap.get(discussionsMap.get(elem.discussionId))}
                                                index={index}
                                                post={elem}
                                                like={(discussionPostLikes && discussionPostLikes.length > index) ? discussionPostLikes[index].like : 0}
                                                onLikeClick={callUpdateLikes}
                                                onDeleteClick={callDeleteDiscussionPost}
                                            />
                                        )}
                                    </div>
                                ))}
                            </Route>
                            <Route path="/profile/:username/liked">
                                {user && user.username === username && discussionsPostsLiked.length > 0 && discussionsPostsLiked.map((elem, index) => (
                                    <div key={index}>
                                        {elem.hasOwnProperty("title") ?
                                            <ForumDiscussion
                                                categoryTitle={categoriesMap.get(elem.categoryId)}
                                                index={index}
                                                discussion={elem}
                                                like={1}
                                                onLikeClick={updateLikesLikedDisliked}
                                                onDeleteClick={deleteDiscussionPostLikedDisliked}
                                            />
                                        :
                                            <ForumPost
                                                categoryTitle={categoriesMap.get(discussionsMap.get(elem.discussionId))}
                                                index={index}
                                                post={elem}
                                                like={1}
                                                onLikeClick={updateLikesLikedDisliked}
                                                onDeleteClick={deleteDiscussionPostLikedDisliked}
                                            />
                                        }
                                    </div>
                                ))}
                            </Route>
                            <Route path="/profile/:username/disliked">
                                {user && user.username === username && discussionsPostsDisliked.length > 0 && discussionsPostsDisliked.map((elem, index) => (
                                    <div key={index}>
                                        {elem.hasOwnProperty("title") ?
                                            <ForumDiscussion
                                                categoryTitle={categoriesMap.get(elem.categoryId)}
                                                index={index}
                                                discussion={elem}
                                                like={-1}
                                                onLikeClick={updateLikesLikedDisliked}
                                                onDeleteClick={deleteDiscussionPostLikedDisliked}
                                            />
                                        :
                                            <ForumPost
                                                categoryTitle={categoriesMap.get(discussionsMap.get(elem.discussionId))}
                                                index={index}
                                                post={elem}
                                                like={-1}
                                                onLikeClick={updateLikesLikedDisliked}
                                                onDeleteClick={deleteDiscussionPostLikedDisliked}
                                            />
                                        }
                                    </div>
                                ))}
                            </Route>
                        </div>
                        {urlUser && (
                            <ProfileSection>
                                <ProfileImage>
                                    <img src={urlUserImage !== null ? urlUserImage : profile_placeholder} alt=""/>
                                    {user && user.username === username && (
                                        <label>
                                            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                            </svg>
                                            <input type="file" onChange={callUploadPhoto} />
                                        </label>
                                    )}
                                </ProfileImage>
                                <h2><span>{urlUser.role === "moderator" ? "Chameleon " : ""}</span>{urlUser.username}</h2>
                                <h3>Reputation: {urlUser.reputation}</h3>
                                <h3>Rank: <RankGenerator reputation={urlUser.reputation}/></h3>
                            </ProfileSection>
                        )}
                    </ProfileContainer>
                </ForumInnerContainer>
            </ForumContainer>
        </Page>
    )
}

export default Profile;