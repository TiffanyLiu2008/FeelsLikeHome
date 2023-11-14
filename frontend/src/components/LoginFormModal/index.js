import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                console.log(data.message);
                if (data && data.message) {
                    setErrors(data.message);
                }
            });
    };

    const handleDemo = (e) => {
        setCredential("Demo-lition");
        setPassword("password");
    };

    return (
        <div className='grid-container'>
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
                <button className='demo' type='submit' onClick={handleDemo}>Demo User</button>
            </form>
        </div>
    );
}

export default LoginFormModal;
