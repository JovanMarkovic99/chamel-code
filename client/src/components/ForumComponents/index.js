import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import ContentRenderer from '../ContentRenderer';
import DateAgo from '../../components/DateAgo';

export const ForumContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 10px;
`;

export const ForumInnerContainer = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1400px;
    margin: auto;
    margin-top: 20px;

    @media screen and (min-width: 850px) {
        padding: 0 50px;
    }
`;

export const ForumCategory = styled(LinkR)`
    position: relative;
    display: block;
    width: 100%;
    height: 120px;
    padding: 10px;
    margin-bottom: 20px;
    background-color: #167D47;
    background-color: var(--bg-primary);
    border: 2px solid rgba(112, 112, 112, 0.5);
    border: 2px solid var(--nav-border);
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    box-shadow: var(--hard-bottom-shadow);
    color: #FFF;
    color: var(--text-white);
    transition: border 0.2s ease-in-out;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0px;
        width: 100%;
        height: 40%;   
        background-color: #183A28;
        background-color: var(--bg-nav);
        border-radius: 8px 8px 0 0;
    }

    & > h2 {
        position: absolute;
        left: 17px;
        top: 7%;
        font-size: 23px;
        font-weight: 500;
        transition: font-weight 0.2s ease-in-out;
    }

    & > h3 {
        position: absolute;
        left: 18px;
        top: 48%;
        font-size: 16px;
        font-weight: 400;
        transition: font-weight 0.2s ease-in-out;
    }

    &:hover { 
        cursor: pointer;
        border: 2px solid rgba(0, 0, 0, 0.87);
        border: 2px solid var(--text-primary);

        & > h2 {
            font-weight: 600;
        }

        & > h3 {
            font-weight: 500;
        }
    }

    @media screen and (min-width: 1080px) {
        width: 80%;
        margin: 20px auto;
    }
`;

export const ForumCategoryAdd = styled.form`
    display: none;

    @media screen and (min-width: 650px) {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 50px;
        padding: 5px;
        margin: 20px 0;
        border: 2px solid rgba(112, 112, 112, 0.5);
        border: 2px solid var(--nav-border);
        border-radius: 10px;
        background-color: #167D47;
        background-color: var(--bg-primary);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        box-shadow: var(--hard-bottom-shadow);
    }

    & > h2 {
        font-size: 18px;
        font-weight: 400;
        color: #FFF;
        color: var(--text-white);
        margin: auto 10px;
    }
    
    & > input {
        height: 2.3em;
        width: 40%;
        background-color: #FAFAFA;
        background-color: var(--bg-white);
        border: 1px solid rgba(112, 112, 112, 0.5);
        border: 1px solid var(--nav-border);
        border-radius: 4px;
        margin-right: 10px;
    }

    & > input:nth-child(2) {
        width: 15%;
    }

    & > button {
        background: none;
        margin: auto 10px auto auto;

        & > svg {
            display: block;
            height: 35px;
            padding: 7px;
            margin: auto;
            transition: background-color 0.2s ease;

            &:hover {
                cursor: pointer;
                border-radius: 5px;
                background-color: rgba(232, 232, 232, 0.08);
                background-color: var(--faded-gray);
            }
        }
    }

    @media screen and (min-width: 1080px) {
        width: 80%;
        margin: 20px auto;
    }   
`;

const LikesSection = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 2px;
    width: 40px;
    height: 90px;
    padding: 10px 5px;
    margin-top: -4px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    color: #FFF;
    color: var(--text-white);
    z-index: 2;

    & > svg:first-child {
        transform: rotate(180deg);
    }

    & > svg {
        height: 28px;
        padding: 2px;
        margin: 0 auto;
        transition: color 0.2s;
        color: rgba(255, 255, 255, 0.7);
        color: var(--text-white-light);

        &:hover {
            cursor: pointer;
            color: #FFF;
            color: var(--text-white);
        }
    }

    &.liked > svg:first-child {
        color: #3ba55c;
        color: var(--text-tertiary);
    }

    &.disliked > svg:last-child {
        color: #3ba55c;
        color: var(--text-tertiary);
    }
`;

const ContentFade = styled.div`
    position: absolute;
    width: 100%;
    height: 60px;
    left: 40px;
    top: 235px;
    background: linear-gradient(to bottom, transparent, #167D47);
    background: linear-gradient(to bottom, transparent, var(--bg-primary));
    z-index: 2;
`;

const DiscussionFooter = styled.div`
    display: flex;
    width: 100%;
    margin-top: 15px;
    margin-bottom: -5px;
    color: rgba(255, 255, 255, 0.7);
    color: var(--text-white-light);
    z-index: 3;

    & > div {
        display: flex;
        padding: 5px;
        transition: background-color 0.2s ease-in-out;
        align-items: center;
        
        & > * {
            margin: 3px 5px 3px 6px;
        }

        & > svg {
            height: 24px;
        }

        & > span {
            font-size: 12px;
        }

        &:first-child:hover {
            background-color: rgba(232, 232, 232, 0.08);
            background-color: var(--faded-gray);
        }

        & > div {
            font-size: 14px;
            margin: 0;
            padding: 7px;
            min-width: 31px;
            color: #FFF;
            color: var(--text-white);
            border-radius: 12px;
            background-color: #3ba55c;
            background-color: var(--text-tertiary);
            text-align: center;
        }
    }
`;

const ForumDiscussionElement = ({ className, categoryTitle, index, discussion, like, onLikeClick, onDeleteClick }) => {
    const { user } = useContext(AppContext);

    return (
        <div className={className}>
            <p>Posted by <LinkR to={{ pathname: `/profile/${discussion.username}`, aboutProps: ""}}>{discussion.username}</LinkR> <DateAgo date={discussion.createdAt} /> ago</p>
            <LikesSection className={`${like === 1 ? "liked" : ""}${like === -1 ? "disliked" : ""}`}>
                    <svg onClick={() => { onLikeClick(discussion, 1 ); }} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" ></path>
                    </svg>
                    {discussion.numLikes}
                    <svg onClick={() => { onLikeClick(discussion, -1 )}} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                    </svg>
            </LikesSection>
            { user && (user.role === "moderator" || user.role === "admin") && (
                <svg onClick={() => { onDeleteClick(discussion); }} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                </svg>
            )}
            <LinkR to={{ pathname: `/category/${categoryTitle}/${discussion._id}`, aboutProps: "" }}  >
                <h1>{discussion.title}</h1>
                <ContentRenderer noLinks={true} passValue={discussion.content} />
                <ContentFade/>
                <DiscussionFooter>
                    <div>
                        <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm16 352c0 8.8-7.2 16-16 16H288l-12.8 9.6L208 428v-60H64c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h384c8.8 0 16 7.2 16 16v288z"></path>
                        </svg>
                        <span>{discussion.numPosts} Posts</span>
                    </div>
                    { discussion.tags.map((tag, index) => (
                        <div key={index} >
                            <div>
                                { tag }
                            </div>
                        </div>
                    ))}
                </DiscussionFooter>
            </LinkR>
        </div> 
    )
}


export const ForumDiscussion = styled(ForumDiscussionElement)`
    position: relative;
    width: 100%;
    margin-bottom: 20px;

    & > p {
        position: absolute;
        top: 12px;
        left: 52px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
        color: var(--text-white-light);
        z-index: 2;

        & > a {
            color: rgba(255, 255, 255, 0.7);
            color: var(--text-white-light);
            text-decoration: none;
        
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }

    & > a {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-height: 350px;
        padding: 5px;
        padding-left: 40px;
        background-color: #167D47;
        background-color: var(--bg-primary);
        border-radius: 10px;
        border: 2px solid rgba(112, 112, 112, 0.5);     
        border: 2px solid var(--nav-border);
        box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);      
        box-shadow: var(--google-shadow);
        color: #FFF;
        color: var(--text-white);
        text-decoration: none;  
        overflow: hidden;
        transition: border 0.2s ease-in-out;

        &: hover {
            cursor: pointer;
            border: 2px solid rgba(0, 0, 0, 0.87);
            border: 2px solid var(--text-primary);
        }

        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            height: 100%;
            border-radius: 8px 0 0 8px;
            background-color: #183A28;
            background-color: var(--bg-nav);
        }

        & > h1 {
            display: block;
            padding: 5px 8px;
            margin: 22px 0 10px;
            color: #FFF;
            color: var(--text-white);
            font-size: 22px;
        }
    }

    & > svg {
        position: absolute;
        width: 22px;
        padding: 2px;
        top: 8px;
        right: 8px;
        border-radius: 6px;
        color: rgba(255, 255, 255, 0.7);
        color: var(--text-white-light);
        z-index: 2;
        transition: color 0.2s ease-in-out;

        & > path {
            transform-origin: 50% 50%;
            transform: rotate(45deg);
        }
    
        &:hover {
            cursor: pointer;
            color: #d32f2f;
            color: var(--error-dark);
        }
    }

    @media screen and (min-width: 1080px) {
        width: 80%;
        margin: 20px auto;
    }
`;

const ForumPostElement = ({className, categoryTitle, post, like, onLikeClick, onDeleteClick}) => {
    const { user } = useContext(AppContext);

    return (
        <div className={className}>
            <div>
                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm16 352c0 8.8-7.2 16-16 16H288l-12.8 9.6L208 428v-60H64c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h384c8.8 0 16 7.2 16 16v288z"></path>
                </svg>
                <p>Posted by <LinkR to={{ pathname: `/profile/${post.username}`, aboutProps: ""}}>{post.username}</LinkR> <DateAgo date={post.createdAt} /> ago</p>
            </div>
            <LikesSection className={`${like === 1 ? "liked" : ""}${like === -1 ? "disliked" : ""}`}>
                <svg onClick={() => { onLikeClick(post, 1); }} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" ></path>
                </svg>
                {post.numLikes}
                <svg onClick={() => { onLikeClick(post, -1); }} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                </svg>
            </LikesSection>
            { user && (user.role === "moderator" || user.role === "admin") && (
                <svg onClick={() => { onDeleteClick(post); }} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                </svg>
            )}
            <LinkR to={{ pathname: `/category/${categoryTitle}/${post.discussionId}/${post._id}`, aboutProps: ""}}>
                <ContentRenderer noLinks={true} passValue={post.content} />
                <ContentFade/>
            </LinkR>
        </div>
    )
};

export const ForumPost = styled(ForumPostElement)`
    position: relative;
    width: 100%;
    margin-bottom: 20px;

    & > div:first-child {
        position: absolute;
        display: flex;
        align-items: center;
        height: 40px;
        left: 42px;
        top: 2px;
        z-index: 2;
        color: rgba(255, 255, 255, 0.7);
        color: var(--text-white-light);

        & > p {
            font-size: 12px;

            & > a {
                color: rgba(255, 255, 255, 0.7);
                color: var(--text-white-light);
                text-decoration: none;


                &:hover {
                    text-decoration: underline;
                }
            }
        }

        & > svg {
            height: 40px;
            padding: 8px;
            margin-right: 5px;
        }
    }

    & > a {
        position: relative;
        display: block;
        width: 100%;
        min-height: 170px;
        max-height: 350px;
        padding: 40px 5px 5px 40px;
        background-color: #167D47;
        background-color: var(--bg-primary);
        border-radius: 10px;
        border: 2px solid rgba(112, 112, 112, 0.5);     
        border: 2px solid var(--nav-border);
        box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);      
        box-shadow: var(--google-shadow);
        color: #FFF;
        color: var(--text-white);
        text-decoration: none;  
        overflow: hidden;
        transition: border 0.2s ease-in-out;

        &: hover {
            cursor: pointer;
            border: 2px solid rgba(0, 0, 0, 0.87);
            border: 2px solid var(--text-primary);
        }

        &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            border-radius-top-right: 8px;
            background-color: #183A28;
            background-color: var(--bg-nav);
        }

        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            height: 100%;
            border-radius: 8px 0 0 8px;
            background-color: #183A28;
            background-color: var(--bg-nav);
        }

        & > div:last-child {
            top: 290px;
        }
    }

    & > svg {
        position: absolute;
        width: 22px;
        padding: 2px;
        top: 8px;
        right: 8px;
        border-radius: 6px;
        color: rgba(255, 255, 255, 0.7);
        color: var(--text-white-light);
        z-index: 2;
        transition: color 0.2s ease-in-out;

        & > path {
            transform-origin: 50% 50%;
            transform: rotate(45deg);
        }
    
        &:hover {
            cursor: pointer;
            color: #d32f2f;
            color: var(--error-dark);
        }
    }

    @media screen and (min-width: 1080px) {
        width: 80%;
        margin: 20px auto;
    }
`;

export const DiscussionContainer = styled.div`
        width: 100%;
        height: 100%;
        min-height: 100vh;
        margin: 0 auto;
        padding: 15px;
        background-color: #167D47;
        background-color: var(--bg-primary);
        color: #FFF;
        color: var(--text-white);

        & > * {
            margin-bottom: 20px;
        }

        & > *:first-child {
            margin-top: 20px;
        }

        & > h1 {
            font-size: 27px;
            font-weight: 700;
        }

        & > h2, & > form > h2 {
            font-size: 20px;
            font-weight: 400;
            margin: 20px 0 40px;
        }

        @media screen and (min-width: 850px) {
            width: 80%;
        }

        @media screen and (min-width: 1080px) {
            width: 60%;
        }
`;

export const PostLike = styled(LikesSection)`
    width: 50px;
    top: 0;
    left: 0;
    padding: 15px 5px 0;

    & > svg {
        height: 32px;
        padding: 3px;
    }

    & > svg:first-child {
        margin-bottom: 5px;
    }

    & > svg:last-child {
        margin-top: 5px;
    }
`;

export const PostInfo = styled.div`
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 70px;
        margin: 16px 0;

        & > div:first-child {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(70px, auto));
            gap: 10px;
            grid-auto-rows: 48% 30px;
            min-width: 160px;
            height: 100%;
            padding: 5px;
            text-align: center;

            & > a {
                display: block;
                min-width: 31px;
                padding: 3px 7px;
                margin: auto;
                border-radius: 12px;
                color: #FFF;
                color: var(--text-white);
                background-color: #3ba55c;
                background-color: var(--text-tertiary);
                text-decoration: none;

                &:hover {
                    background-color: #183A28;         
                    background-color: var(--bg-nav);
                }
            }
        }

        & > div:last-child {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 160px;
            height: 100%;
            padding: 9px 7px;
            border-radius: 4px;
            background-color: #183A28;
            background-color: var(--bg-nav);

            & > span {
                color: rgba(255, 255, 255, 0.7);
                color: var(--text-white-light);
                font-size: 13px;
            }

            & > a {
                display: block;
                margin-right: auto;
                font-size: 14px;
                color: #167D47;
                color: var(--bg-primary);
                text-decoration: none;

                &:hover {
                    cursor: pointer;
                    color: #3ba55c;
                    color: var(--text-tertiary);
                }
            }

            @media screen and (min-width: 500px) {
                width: auto;
                width: initial;
                min-width: 160px;
            }
        }
`;

const PostContentElement = ({ className, index, post, like, onLikeClick, onDeleteClick }) => {
    const { user } = useContext(AppContext);

    return (
        <div className={className}>
            <PostLike className={`${like === 1 ? "liked" : ""}${like === -1 ? "disliked" : ""}`}>
                    <svg onClick={() => {onLikeClick(post, 1);}} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" ></path>
                    </svg>
                    {post.numLikes}
                    <svg onClick={() => {onLikeClick(post, -1);}} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                    </svg> 
            </PostLike>
            { user && (user.role === "moderator" || user.role === "admin") && (
                    <svg onClick={() => { onDeleteClick(post); }} aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                    </svg>
            )}
            <ContentRenderer passValue={post.content}/>
            <PostInfo>
                <div>
                    { post.tags && post.tags.map((tag, index) => (
                        <LinkR to={{ pathname: `/search/[${tag}]`, aboutPropr: ""}}key={index}>{tag}</LinkR>
                    ))}
                </div>
                <div>
                    <span>posted <DateAgo date={post.createdAt} /> ago<br/></span>
                    <LinkR to={{ pathname: `/profile/${post.username}`, aboutProps: ""}}>{post.username}</LinkR>
                </div>
            </PostInfo>
        </div>
    )
};

export const PostContent = styled(PostContentElement)`
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    padding-top: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.54);
    border-top: 1px solid var(--text-black-light);

    & > div:first-child {
        min-height: 100px;
    }

    & > svg {
        position: absolute;
        width: 24px;
        padding: 2px;
        top: 98px;
        left: 13px;
        border-radius: 6px;
        color: rgba(255, 255, 255, 0.7);
        color: var(--text-white-light);
        z-index: 2;
        transition: color 0.2s ease-in-out;

        & > path {
            transform-origin: 50% 50%;
            transform: rotate(45deg);
        }
    
        &:hover {
            cursor: pointer;
            color: #d32f2f;
            color: var(--error-dark);
        }
    }
`;