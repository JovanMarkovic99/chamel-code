import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import HttpClient from '../../services/HttpClient';
import AppContext from '../../context/AppContext';
import Page from '../../components/Page';
import { ForumContainer, ForumInnerContainer, ForumDiscussion } from '../../components/ForumComponents';

const Search = () => {
    const { user } = useContext(AppContext);
    const { searchString } = useParams();
    const history = useHistory();

    const [discussions, setDiscussions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [discussionLikes, setDiscussionLikes] = useState([]);

    // Do the search and grab the discussions
    useEffect(() => {
        const parseAndSearch = async () => {
            if (!history || !searchString)
                return;

            const regex = /(\[[^(\[\])]+\])|("[^"]+")|(user:[a-zA-Z0-9_-]+)|(likes:[0-9]+)/g;
            const content_search = searchString.trim().matchAll(regex);

            let user_restriction = "";
            let like_restriction = null;
            let tags = [];
            let key_words = [];

            for (const match of content_search) {
                let elem = match[0];

                if (elem.startsWith("user:")) {
                    user_restriction = elem.slice(5);
                } else if (elem.startsWith("likes:")) {
                    like_restriction = parseInt(elem.slice(6));
                } else if (elem[0] === "[") {
                    tags.push(elem.slice(1, elem.length - 1));
                } else {
                    key_words.push(elem.slice(1, elem.length - 1));
                }
            }

            // Exclusive user search test
            if (user_restriction.length && like_restriction === null && !tags.length && !key_words.length) {
                history.push("/profile/" + user_restriction);
            } else {
                try {
                    const { data } = await HttpClient().get("/api/search/querry?username=" + user_restriction
                        + "&numLikes=" + (like_restriction ? like_restriction.toString() : "")
                        + "&tags=" + encodeURIComponent(JSON.stringify(tags)));

                    let _data = [];
                    if (key_words.length) {
                        data.map((discussion, index) => {
                            let match = true;
                            for (let i = 0; i < key_words.length; i++)
                                if (!discussion.content.includes(key_words[i])) {
                                    match = false;
                                    break;
                                }
                            if (match)
                                _data.push(discussion);
                            return true;
                        })
                    } else if (data) {
                        _data = data;
                    }

                    setDiscussions(_data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).slice(0, 20));
                } catch (e) {
                    console.log(e);
                }
            }
        }

        parseAndSearch();
    }, [history, searchString])

    // Get the categories
    useEffect(() => {
        const getCategories = async () => {
            const { data } = await HttpClient().get("/api/category");

            let _categories = [];
            discussions.map((discussion, index) => {
                let cat = data.find(elem => elem._id === discussion.categoryId);
                _categories.push(cat.title);
                return true;
            });

            setCategories(_categories);
        }

        getCategories();
    }, [discussions])

    // Get discussion likes
    useEffect(() => {
        const getDiscussionLikes = async () => {
            if (!discussions.length || !user)
                return 0;

            const { data } = await HttpClient().get("/api/likes/discussion");

            let map = new Map();
            data.map((like, index) =>
                map.set(like.discussionId, like.like)
            );

            let likes = [];
            discussions.map((_discussion, index) => {
                if (map.has(_discussion._id))
                    likes.push({ id: _discussion._id, like: map.get(_discussion._id) })
                else
                    likes.push({ id: _discussion._id, like: 0 })
                return true;
            });

            setDiscussionLikes(likes);
        }

        getDiscussionLikes(0);
    }, [discussions, user])

    const updateLikes = async (index, liked) => {
        if (!user || !discussionLikes.length)
            return;

        let likes = [...discussionLikes];
        let like = { ...likes[index] };
        if (like.like === liked) {
            liked = 0;
        }
        like.like = liked;
        likes[index] = like;
        setDiscussionLikes(likes);

        const data = {
            like: like.like
        };

        try {
            await HttpClient().post("/api/likes/discussion/" + like.id, data);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteDiscussion = async (index) => {
        const data = {
            discussionId: discussions[index]._id
        };

        try {
            await HttpClient().post("/api/discussion/delete", data);
            let _discussions = [...discussions];
            _discussions.splice(index, 1);
            setDiscussions(_discussions);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Page>
            <ForumContainer>
                <ForumInnerContainer>
                    {discussions.length > 0 && discussions.map((discussion_elem, index) => (
                        <ForumDiscussion
                            key={index}
                            categoryTitle={categories[index]}
                            index={index}
                            discussion={discussion_elem}
                            like={(discussionLikes !== undefined && discussionLikes.length > index) ? discussionLikes[index].like : 0}
                            onLikeClick={updateLikes}
                            onDeleteClick={deleteDiscussion}
                        />
                    ))}
                </ForumInnerContainer>
            </ForumContainer>
        </Page>
    )
}

export default Search;