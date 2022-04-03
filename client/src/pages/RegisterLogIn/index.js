// LogIn-Register page design ported from https://github.com/sefyudem/Sliding-Sign-In-Sign-Up-Form


import React, { useState, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import validator from 'validator';
import AppContext from '../../context/AppContext';
import HttpClient from '../../services/HttpClient';
import Page from '../../components/Page';
import FormError from './FormError';
import { Container, FormContainer, SignInUp, FormSignIn, Title, InputField, 
    Input, InputSubmit, FormSignUp, PanelContainer, Panel, PanelContent, PanelHeading, PanelParagraph, ButtonTransparent } from './FormElements.js';
import server_push_svg from '../../images/server_push.svg';
import experts_svg from '../../images/experts.svg';
import user_svg from '../../images/user.svg';
import './index.css';
import lock_svg from '../../images/lock.svg';
import envelope_svg from '../../images/envelope.svg';

const RegisterLogIn = () => {

    const startFormType = useLocation().pathname === "/auth/login" ? "log-in" : "sign-up";
    const [formType, setFormType] = useState(startFormType);

    const history = useHistory();

    const { setUser } = useContext(AppContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const toggle = () => {
        if (formType === "log-in")
        {
            setFormType("sign-up");
            history.push("/auth/register");
        }
        else
        {
            setFormType("log-in");
            history.push("/auth/login");
        }
        setUsername("");
        setEmail("");
        setPassword("");
        setErrors([]);
    };

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!username) 
            _errors.push("Username is required");
        if (username.toLowerCase().includes("chameleon"))
            _errors.push("Username cannot include the word 'Chameleon'");
        if (formType === "sign-up" && !validator.isEmail(email)) 
            _errors.push("Email format is invalid");
        if (!password)
            _errors.push("Password is required");
            
        let regex = /[a-zA-Z0-9_-]+$/; 
        if (!regex.test(username))
                _errors.push("Username can only contain a-z A-Z 0-9 _ -");
        
        if (_errors.length)
            return setErrors(_errors);

        if (formType === "sign-up")
        {
            const data = {
                username,
                email,
                password
            };

            try {
                await HttpClient().post("/api/user/register", data);
                toggle();
            } catch(e) {
                setErrors([e.response.data.message]);
            }

        }
        else
        {
            const data = {
                username,
                password
            };

            try {
                const response  = await HttpClient().post("/api/user/login", data);
                setUser(response.data.user);
                localStorage.setItem("token", response.data.token);
                history.push("/home");
            } catch (e) {
                setErrors([e.response.data.message]);
            }
        }
    }

    return (
        <Page>
            <Container className={ formType }>
                <FormContainer>
                    <SignInUp className="sign-in-up">
                        <FormSignIn onSubmit={ onSubmit } className="form-sign-in">
                            <Title>Sign in</Title>
                            <InputField>
                                <img className="input-icon" src= { user_svg } alt="User icon" />
                                <Input type="text" 
                                value={ username }
                                onChange={ e => setUsername(e.target.value) }
                                placeholder="Username" />
                            </InputField>
                            <InputField>
                                <img className="input-icon" src= { lock_svg } alt="Lock icon" />
                                <Input type="password"
                                value={ password }
                                onChange={ e => setPassword(e.target.value) }
                                placeholder="Password" />
                            </InputField>
                            <InputSubmit type="submit" value="Login" />
                            {!!errors.length && <FormError errors={ errors } />}
                        </FormSignIn>
                        <FormSignUp onSubmit={ onSubmit }  className="form-sign-up">
                            <Title>Sign up</Title>
                            <InputField>
                                <img className="input-icon" src= { user_svg } alt="User icon" />
                                <Input type="text" 
                                value={ username }
                                onChange={ e => setUsername(e.target.value) }
                                placeholder="Username" />
                            </InputField>
                            <InputField>
                                <img className="input-icon" src= { envelope_svg } alt="Enevelope icon" />
                                <Input type="text"
                                value={ email }
                                onChange={ e => setEmail(e.target.value) }
                                placeholder="Email" />
                            </InputField>
                            <InputField>
                                <img className="input-icon" src= { lock_svg } alt="Lock icon" />
                                <Input type="password"
                                value={ password }
                                onChange={ e => setPassword(e.target.value) }
                                placeholder="Password" />
                            </InputField>
                            <InputSubmit type="submit" value="Sign up" />
                            {!!errors.length && <FormError errors={ errors } />}
                        </FormSignUp>
                    </SignInUp>
                </FormContainer>
                <PanelContainer>
                    <Panel left className="panel-left"> 
                        <PanelContent className="panel-content">
                            <PanelHeading>New here?</PanelHeading>
                            <PanelParagraph>
                                Come and join us at ChamelCode. The right place for you.
                            </PanelParagraph>
                            <ButtonTransparent onClick={ toggle }>
                                Sign up
                            </ButtonTransparent>
                        </PanelContent>
                        <img className="panel-sign-in-svg panel-image" src={ server_push_svg } alt="Server push" />
                    </Panel>
                    <Panel className="panel-right">
                        <PanelContent className="panel-content">
                            <PanelHeading>One of us?</PanelHeading>
                            <PanelParagraph>
                                Come and join us at ChamelCode. The right place for you.
                            </PanelParagraph>
                            <ButtonTransparent onClick={ toggle }>
                                Log in
                            </ButtonTransparent>
                        </PanelContent>
                        <img className="panel-sign-up-svg panel-image" src={ experts_svg } alt="Experts" />
                    </Panel>
                </PanelContainer>
            </Container>
        </Page>
    )
}

export default RegisterLogIn
