import React, { useEffect, useState, useContext } from 'react';
import { Route, useParams } from 'react-router-dom';
import Page from '../../components/Page';
import HttpClient from '../../services/HttpClient';
import AppContext from '../../context/AppContext';
import { getSetDiscussions, getSetDiscussionLikes, updateLikes, 
        deleteDiscussionPost, getSetPosts, getSetPostLikes } from '../../utils/Utils';
import { ScrollToTopCTADefault as ScrollToTopCTA } from '../../components/ScrollToTopCTA';
import { ForumContainer, ForumInnerContainer, ForumDiscussion, DiscussionContainer,
        PostContent } from '../../components/ForumComponents';
import ContentEditor from '../../components/ContentEditor';
import ContentRenderer from '../../components/ContentRenderer';
import { SubmitDiscussion as SubmitPost } from '../../pages/Post/PostElements';

const Category = () => {
    const { categoryTitle, discussionId } = useParams();
    const { user } = useContext(AppContext);

    const [category, setCategory] = useState(null);
    const [discussions, setDiscussions] = useState([]);
    const [discussionLikes, setDiscussionLikes] = useState([]);

    const [discussion, setDiscussion] = useState(null);
    // The array state is somehow necessary, with it just being
    // the object the children props don't update on change
    const [discussionLike, setDiscussionLike] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postLikes, setPostLikes] = useState([]);
    
    const [error404, setError404] = useState(false);

    const [body, setBody] = useState("");
    const [bodyError, setBodyError] = useState(false);

    // Get categories
    useEffect(() => {
        const getCategory = async () => {
            if (!categoryTitle)
                return;

            const { data } = await HttpClient().get("/api/category");

            let result = data.find((elem) => { return elem.title === categoryTitle });
            if (result === undefined) {
                setError404(true);
            }
            setError404(false);
            setCategory(result);
        }

        getCategory();
    }, [categoryTitle]);

    // Get discussions and discussion
    useEffect(() => {
        const getDiscussions = async () => {
            let _discussions = await getSetDiscussions(setDiscussions, category);

            if (discussionId) {
                    let _discussion = _discussions.find((elem) => { return elem._id === discussionId });
                    if (_discussion === undefined) {
                        setError404(true);
                    }
                    setError404(false);
                    setDiscussion(_discussion);
            } else 
                setDiscussion(null);
        }

        getDiscussions();
    }, [category, discussionId]);

    // Get discussion likes and discussion like
    useEffect(() => {
        const getDiscussionLikes = async () => {
            let likes = await getSetDiscussionLikes(setDiscussionLikes, discussions, user);

            if (discussionId && likes.length) {
                let like = likes.find((elem) => { return elem.id === discussionId; });
                if (like === undefined) {
                    like = { id: like.id, like: 0 };
                } else {
                    like = { id: like.id, like: like.like };
                }

                setDiscussionLike([like]);
            } else
                setDiscussionLike([]);
        }

        getDiscussionLikes();
    }, [discussions, discussionId, user]);

    // Get posts
    useEffect(() => {
        getSetPosts(setPosts, discussionId);
    }, [discussionId]);

    // Get post likes
    useEffect(() => {
        getSetPostLikes(setPostLikes, posts, user);
    }, [posts, user]);

    const updateLike = async (elem, liked) => {
        if (!user || !discussionLike.length)
            discussionLike([]);
        
        let like = discussionLike[0];
        if (like.like === liked)
            liked = 0;
        like.like = liked;
        setDiscussionLikes([like]);

        const data = {
            like: liked
        };

        try {
            await HttpClient().post("/api/likes/discussion/" + like.id, data);
        } catch (e) {
            console.log(e);
        }
    };
    
    const deleteDiscussion = async (elem) => {
        const data = {
            discussionId: discussion._id
        };

        try {
            await HttpClient().post("/api/discussion/delete", data);
            setDiscussion(null);
        } catch (e) {
            console.log(e);
        }
    };

    const callUpdateLikes = async (elem, liked) => {
        if (elem.hasOwnProperty("title"))
            updateLikes(elem, liked, discussionLikes, setDiscussionLikes, user);
        else
            updateLikes(elem, liked, postLikes, setPostLikes, user);
    };

    const callDeleteDiscussionPost = async (elem) => {
        if (elem.hasOwnProperty("title"))
            deleteDiscussionPost(elem, discussions, setDiscussions);
        else
            deleteDiscussionPost(elem, posts, setPosts);
    };

    const onSubmit = async event => {
        let _error = false;
        setBodyError(false);

        if (!body) {
            setBodyError(true);
            _error = true;
        }
        
        if (_error) {
            event.preventDefault();
            return 0;
        }

        const data = {
            content: body,
            discussionId: discussion._id
        };

        try {
            await HttpClient().post("/api/post/create", data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Page>
            {error404 ? (
                <div>
                    Error404
                </div>
            ) : (
                <>
                    <Route exact path="/category/:categoryTitle">
                        <ForumContainer>
                            <ForumInnerContainer>
                                {discussions && discussions.length > 0 && discussions.map((discussion_elem, index) => (
                                    <ForumDiscussion
                                        key={index}
                                        categoryTitle={category.title}
                                        index={index}
                                        discussion={discussion_elem}
                                        like={(discussionLikes !== undefined && discussionLikes.length > index) ? discussionLikes[index].like : 0}
                                        onLikeClick={callUpdateLikes}
                                        onDeleteClick={callDeleteDiscussionPost}
                                    />
                                ))}
                            </ForumInnerContainer>
                        </ForumContainer>
                    </Route>
                    <Route path="/category/:categoryTitle/:discussionId">
                        {discussion && (
                            <DiscussionContainer>
                                <ScrollToTopCTA showBellow={200} />
                                <h1>{discussion.title}</h1>
                                <PostContent
                                    index={-1}
                                    post={discussion}
                                    like={((discussionLike !== undefined && discussionLike.length) ? discussionLike[0].like : 0)}
                                    onLikeClick={updateLike}
                                    onDeleteClick={deleteDiscussion}
                                />
                                <h2>{posts.length} Posts</h2>
                                {posts && posts.length > 0 && posts.map((post, index) => (
                                    <PostContent
                                        key={index}
                                        index={index}
                                        post={post}
                                        like={((postLikes !== undefined && postLikes.length > index) ? postLikes[index].like : 0)}
                                        onLikeClick={callUpdateLikes}
                                        onDeleteClick={callDeleteDiscussionPost}
                                    />
                                ))}
                                {user && (
                                    <form onSubmit={onSubmit}>
                                        <h2>Your post</h2>
                                        <ContentEditor passValue={body} handleChange={setBody} errorCheck={bodyError} />
                                        <ContentRenderer passValue={body} />
                                        <SubmitPost type="submit" value="Submit your post" />
                                    </form>
                                )}
                            </DiscussionContainer>
                        )}
                    </Route>
                </>
            )}
        </Page>
    )
}

export default Category;