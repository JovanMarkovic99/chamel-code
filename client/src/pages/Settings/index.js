import React, { useState } from 'react';
import Page from '../../components/Page';
import HttpClient from '../../services/HttpClient';
import { uploadPhoto } from '../../utils/Utils';
import { SettingsContainer, SettingsContent, SettingsForm, Descriptor } from './SettingsElements';

const Settings = () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const callUploadPhoto = async event => {
        uploadPhoto(event.target.files[0]);
        window.location.reload();
    };

    const onSubmit = async event => {
        event.preventDefault();

        setPasswordError(false);

        if (!password || !newPassword || password === newPassword) {
            setPasswordError(true);
            return;
        }

        try {
            const data = {
                password: password,
                newPassword: newPassword
            };

            await HttpClient().post("/api/user/changePassword", data);
        } catch (e) {
            setPasswordError(true);
            console.log(e);
            return;
        }

        window.location.reload();
    };

    return (
        <Page>
            <SettingsContainer>
                <h1>User Settings</h1>
                <SettingsContent>
                    <SettingsForm onSubmit={onSubmit}>
                        <h2>Profile Information</h2>
                        <Descriptor>
                            <h2>Change password</h2>
                            <h3>Change your current password</h3>
                        </Descriptor>
                        <input type="password" placeholder="Current password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            style= {{
                                border: passwordError ? "solid 1px var(--error-dark)" : "",
                                background: passwordError ? "var(--error-light)" : ""
                            }}
                        />
                        <Descriptor>
                            <h3>Type in your new password</h3>
                        </Descriptor>
                        <input type="password" placeholder="New password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                            style= {{
                                border: passwordError ? "solid 1px var(--error-dark)" : "",
                                background: passwordError ? "var(--error-light)" : ""
                            }}
                        />
                        <input type="submit" value="Submit"/>
                    </SettingsForm>
                    <SettingsForm>
                        <h2>Images</h2>
                        <Descriptor>
                            <h2>Profile picture</h2>
                            <h3>Images must be .png format</h3>
                        </Descriptor>
                        <label>
                            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                            </svg>
                            <input type="file" onChange={callUploadPhoto}/>
                        </label>
                    </SettingsForm>
                </SettingsContent>
            </SettingsContainer>
        </Page>
    )
}

export default Settings;