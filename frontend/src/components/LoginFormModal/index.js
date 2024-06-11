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
        <div className='logInModal'>
            <h1 className='heading'>Log In</h1>
            <form onSubmit={handleSubmit}>
                {errors.credential && (
                    <em className='errors'>{errors.credential}</em>
                )}
                <label className='subheading'>
                    Username or Email<br/>
                    <input
                        className='normal'
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    /><br/>
                </label>
                <label className='subheading'>
                    Password<br/>
                    <input
                        className='normal'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br/>
                </label>
                <button className='logInButton' type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
                <div className='demoUser'><a className='demoUser' href="#" onClick={handleDemo}>Demo User</a></div>
            </form>
        </div>
    );
}

export default LoginFormModal;
