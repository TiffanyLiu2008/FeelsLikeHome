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
        <div>
            <p className='heading'>Log In</p>
            <form onSubmit={handleSubmit}>
                {errors.credential && (
                    <p className='errors'>{errors.credential}</p>
                )}
                <div className='normal'>
                <label>
                    Username or Email<br/>
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    /><br/>
                </label>
                <label>
                    Password<br/>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br/>
                </label>
                </div>
                <button className='button' type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
                <button className='button' type='submit' onClick={handleDemo}>Log in as Demo User</button>
            </form>
        </div>
    );
}

export default LoginFormModal;
