import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import HttpClient from '../../services/HttpClient';
import Page from '../../components/Page';
import { ForumContainer, ForumInnerContainer } from '../../components/ForumComponents';
import ContentEditor from '../../components/ContentEditor';
import ContentRenderer from '../../components/ContentRenderer';
import { PostHeader, PostContent, HelpDiv, HelpPanel, HelpPanelStep, 
        DiscussionPanel, DiscussionCategory, DiscussionContent, Input, 
        SubmitDiscussion } from './PostElements';
import code_thinking from '../../images/code_thinking.svg';

const Post = () => {
    const location = useLocation();
    const history = useHistory();
    const [isInitiated, setIsInitiated] = useState([]);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");

    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const [tagsError, setTagsError] = useState(false);

    const getCategories = async () => {
        const {data} = await HttpClient().get("/api/category");
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        const _selected = new URLSearchParams(location.search).get("category");
        if (_selected) {
            setSelectedCategory(_selected);
        } else if (categories && categories.length) {
            setSelectedCategory(categories[0].title);
        }
        
        setIsInitiated(true);
    }, [location, categories])

    const onSubmit = async event => {
        event.preventDefault();

        let _error = false;
        setTitleError(false);
        setBodyError(false);
        setTagsError(false);

        if (!title) {
            setTitleError(true);
            _error = true;
        }
        if (!body) {
            setBodyError(true);
            _error = true;
        }

        let tags_array = tags.trim().split(" ").filter((elem) => elem !== "");

        if (!tags_array.length) {
            setTagsError(true);
            _error = true;
        }
        
        if (_error)
            return 0;

        let category = selectedCategory;
        if (category === "") {
            category = document.getElementById("category-selection").value;
            setSelectedCategory(category);
        }
        category = categories.find((element) => {
            return element.title === category;
        });

        if (!tags_array.find(elem => elem = category))
            tags_array.push(category);

        const data = {
            title: title,
            content: body,
            categoryId: category._id,
            tags: tags_array,
        };

        try {
            const response = await HttpClient().post("/api/discussion/create", data);
            history.push(`/category/${selectedCategory}/${response.data._id}`);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Page>
            { isInitiated && (
                <ForumContainer>
                    <ForumInnerContainer>
                        <PostHeader>
                            <h1>Start a discussion</h1>
                            <img src={code_thinking} alt="" />
                        </PostHeader>
                        <PostContent>
                            <HelpDiv>
                                <HelpPanel heading="Step 1: Draft your discussion">
                                    <h3>The community is here to help you with specific coding, algorithm, or language problems.<br />Avoid asking opinion-based questions.
                                    </h3>
                                    <HelpPanelStep heading="1. Summarize the discussion">
                                        <h3>lorem</h3>
                                    </HelpPanelStep>
                                    <HelpPanelStep heading="2. Describe the problem if there is any">
                                        <h3>lorem</h3>
                                    </HelpPanelStep>
                                    <HelpPanelStep heading="3. Show some code">
                                        <h3>lorem</h3>
                                    </HelpPanelStep>
                                </HelpPanel>
                            </HelpDiv>
                            <DiscussionPanel onSubmit={onSubmit} >
                                <DiscussionCategory id="category-selection" passedValue={selectedCategory}  handleChange={setSelectedCategory}>
                                    { categories.length > 0 && categories.map((category, index) => (
                                        <option key={index} value={category.title}>{category.title}</option>
                                    ))}
                                </DiscussionCategory>
                                <DiscussionContent>
                                    <h3>Title</h3>
                                    <h4>Be specific and concise. The title should provide a rough descritpion of the topic</h4>
                                    <Input value={title} onChange={e => setTitle(e.target.value)} 
                                    placeholder="e.g. What is the most optimal way to sort an array"                                 
                                    style= {{
                                        border: titleError ? "solid 1px var(--error-dark)" : "",
                                        background: titleError ? "var(--error-light)" : ""
                                    }}/>
                                    <h3>Body</h3>
                                    <h4>Include all the information someone would need to answer your question or join the discussion</h4>
                                    <ContentEditor passValue={body} handleChange={setBody} errorCheck={bodyError} />
                                    <ContentRenderer passValue={body} />
                                    <h3>Tags</h3>
                                    <h4>Add up to 7 tags to describe what the discussion is about (separated by whitespace)</h4>
                                    <Input value={tags} onChange={e => setTags(e.target.value)} 
                                    placeholder="e.g. c++ sorting optimization"
                                    style= {{
                                        border: tagsError ? "solid 1px var(--error-dark)" : "",
                                        background: tagsError ? "var(--error-light)" : ""
                                    }}/>
                                </DiscussionContent>
                                <SubmitDiscussion type="submit" value="Submit your discussion" />
                            </DiscussionPanel>
                        </PostContent>
                    </ForumInnerContainer>
                </ForumContainer>
            )}
        </Page>
    )
}

export default Post;
