import axios from 'axios';
import HttpClient from '../services/HttpClient';

export const getSetDiscussions = async (setDiscussions, category_or_user, sort = (a, b)  => a.createdAt < b.createdAt ? 1 : -1, slice_num = 20, search_by_category = true) => {
    if (!category_or_user) {
        if (setDiscussions)
            setDiscussions([]);
        return [];
    }

    let _data
    if (search_by_category) {
        const { data } = await HttpClient().get("/api/discussion/" + category_or_user._id);
        _data = [...data];
    } else {
        const { data } = await HttpClient().get("/api/search/discussions?username=" + category_or_user);
        _data = [...data];
    }

    if (sort)
        _data.sort(sort);
    if (!slice_num && slice_num > 0)
       _data.splice(slice_num);
    if (setDiscussions)
        setDiscussions(_data);
    return _data;
};

export const getSetPosts = async (setPosts, discussion_id_or_user, sort = (a, b) => a.createdAt < b.createdAt ? 1 : -1, slice_num = 20, search_by_discussion_id = true) => {
    if (!discussion_id_or_user) {
        if (setPosts)
            setPosts([]);
        return [];
    }
    
    let _data;
    if (search_by_discussion_id) {
        const { data } = await HttpClient().get("/api/post/" + discussion_id_or_user);
        _data = [...data];
    } else {
        const { data } = await HttpClient().get("/api/search/posts?username=" + discussion_id_or_user);
        _data = [...data];
    }
    if (sort)
        _data.sort(sort);
    if (!slice_num && slice_num > 0)
        _data.splice(slice_num);
    if (setPosts)
        setPosts(_data);
    return _data;
};

export const getSetDiscussionLikes = async (setDiscussionLikes, discussions, user) => {
    if (!discussions || !discussions.length || !user) {
        if (setDiscussionLikes)
            setDiscussionLikes([]);
        return [];
    }

    const { data } = await HttpClient().get("/api/likes/discussion");

    let map = new Map();
    data.map((like) =>
        map.set(like.discussionId, like.like)
    );

    let likes = [];
    discussions.map((_discussion) => {
        if (map.has(_discussion._id))
            likes.push({ id: _discussion._id, like: map.get(_discussion._id) })
        else
            likes.push({ id: _discussion._id, like: 0 })
        return true;
    });

    if (setDiscussionLikes)
        setDiscussionLikes(likes);
    return likes;
};

export const getSetPostLikes = async (setPostLikes, posts, user) => {
    if (!posts || !posts.length || !user) {
        if (setPostLikes)
            setPostLikes([]);
        return [];
    }

    const { data } = await HttpClient().get("/api/likes/post");

    let map = new Map();
    data.map((like) =>
        map.set(like.postId, like.like)
    );

    let likes = [];
    posts.map((_post) => {
        if (map.has(_post._id))
            likes.push({ id: _post._id, like: map.get(_post._id) })
        else
            likes.push({ id: _post._id, like: 0 })
        return true;
    });

    if (setPostLikes)
        setPostLikes(likes);
    return likes;
};

export const updateLikes = async (elem, liked, likeArray, setLikeArray, user) => {
    if (!user || !likeArray.length || !elem)
        return false;

    let likes = [...likeArray];
    let i = likeArray.findIndex((e) => e.id === elem._id);
    let like = { ...likeArray[i] };
    if (like.like === liked)
        liked = 0;
    like.like = liked;
    likes[i] = like;
    setLikeArray(likes);

    const data = {
        like: liked
    };

    try {
        if (elem.hasOwnProperty("title"))
            await HttpClient().post("/api/likes/discussion/" + like.id, data);
        else
            await HttpClient().post("/api/likes/post/" + like.id, data);
    } catch (e) {
        console.log(e);
    }
};

export const deleteDiscussionPost = async (elem, array, setArray) => {
    let i = array.indexOf(elem);

    if (elem.hasOwnProperty("title")) {
        const data = {
            discussionId: elem._id
        };

        try {
            await HttpClient().post("/api/discussion/delete", data);
        } catch (e) {
            console.log(e);
            return false;
        }
    } else {
        const data = {
            postId: elem._id
        };

        try {
            await HttpClient().post("/api/post/delete", data);
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    let _array = [...array];
    _array.splice(i, 1);
    setArray(_array);
    return true;
};

export const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "content-type": "multipart/form-data"
        }
    };

    try {
        await axios.post("/api/user/upload", formData, config);
    } catch (e) {
        console.log(e);
    }
};