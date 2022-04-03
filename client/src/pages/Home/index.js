import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import HttpClient from "../../services/HttpClient";
import Page from '../../components/Page';
import {ForumContainer, ForumInnerContainer, ForumCategory, ForumCategoryAdd} from '../../components/ForumComponents';

const Home = () => {
    const history = useHistory();
    const {user} = useContext(AppContext);
    const [categories, setCategories] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryTitleError, setCategoryTitleError] = useState(false);
    const [categoryDesc, setCategoryDesc] = useState("");
    const [categoryDescError, setCategoryDescError] = useState(false);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const {data} = await HttpClient().get("/api/category");
        setCategories(data);
    };

    const onSubmit = async event => {
        event.preventDefault();

        let _error = false;
        setCategoryTitleError(false);
        setCategoryDescError(false);

        if (!categoryTitle) {
            setCategoryTitleError(true);
            _error = true;
        }
        if (!categoryDesc) {
            setCategoryDescError(true);
            _error = true;
        }
        
        if (_error)
            return 0;

        const data = {
            title: categoryTitle,
            description: categoryDesc
        };

        try {
            const response = await HttpClient().post("/api/category/create", data);
            history.push(`/category/${response.data.title}`);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Page>
            <ForumContainer>
                <ForumInnerContainer>
                    { user && user.role === "admin" && (
                        <ForumCategoryAdd onSubmit={ onSubmit }>
                            <h2>Title: </h2>
                            <input 
                                type="text"
                                style= {{
                                    border: categoryTitleError ? "solid 1px var(--error-dark)" : "",
                                    background: categoryTitleError ? "var(--error-light)" : ""
                                }}
                                value={ categoryTitle }
                                onChange={ e => setCategoryTitle(e.target.value) } 
                            />
                            <h2>Description: </h2>
                            <input 
                                type="text"
                                style= {{
                                    border: categoryDescError ? "solid 1px var(--error-dark)" : "",
                                    background: categoryDescError ? "var(--error-light)" : ""
                                }}
                                value={ categoryDesc }
                                onChange={ e => setCategoryDesc(e.target.value) } 
                            />
                            <button type="submit">
                                <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="#fff" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                </svg>
                            </button>
                        </ForumCategoryAdd>
                    )}
                    { categories.length > 0 && categories.map((category, index) => (
                        <ForumCategory key={index} to={`/category/${category.title}`} >
                            <h2>{category.title}</h2>
                            <h3>{category.description}</h3>
                        </ForumCategory>
                    ))}
                </ForumInnerContainer>
            </ForumContainer>
        </Page>
    )
}

export default Home
