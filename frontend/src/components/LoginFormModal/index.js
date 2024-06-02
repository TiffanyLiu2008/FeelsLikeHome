import "./LoginForm.css";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";

function LoginFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const handleDemo = (e) => {
        setCredential("EmmaSmith");
        setPassword("password");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .then(history.push('/'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };
    return (
        <div>
            <p className='logInHeading'>Log In</p>
            <form onSubmit={handleSubmit}>
                {errors.credential && (
                    <p className='errors'>{errors.credential}</p>
                )}
                <div>
                <label className='logInNormal'>
                    Username or Email<br/>
                    <input
                        className='logInNormal'
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    /><br/>
                </label>
                <label className='logInNormal'>
                    Password<br/>
                    <input
                        className='logInNormal'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br/>
                </label>
                </div>
                <button className='logInButton' type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
                <button className='logInButton' type='submit' onClick={handleDemo}>Log in as Demo User</button>
            </form>
        </div>
    );
}

export default LoginFormModal;
