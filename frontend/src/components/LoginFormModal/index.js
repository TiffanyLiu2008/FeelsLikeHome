import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const handleDemo = (e) => {
        setCredential("Demo-lition");
        setPassword("password");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };
    return (
        // <div className='grid-container'>
        <div className>
            <h1 className='title'>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label className='usernameLabel'>
                    Username or Email
                    <input className='usernameInput'
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label className='passwordLabel'>
                    Password
                    <input className='passwordInput'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.credential && (
                    <p>{errors.credential}</p>
                )}
                <button className='login' type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
                <button className='demo' type='submit' onClick={handleDemo}>Log in as Demo User</button>
            </form>
        </div>
    );
}

export default LoginFormModal;
