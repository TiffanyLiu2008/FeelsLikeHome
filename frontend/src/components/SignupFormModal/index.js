import "./SignupForm.css";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";

function SignupFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(sessionActions.signup({email, username, firstName, lastName, password}))
                .then(closeModal)
                .then(history.push('/'))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };
    return (
        <div className='signUpModal'>
            <h1 className='heading'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label className='subheading'>
                    Email<br/>
                    <input className='normal'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.email && <em className='errors'>{errors.email}</em>}
                <label className='subheading'>
                    Username<br/>
                    <input className='normal'
                        type="text"
                        value={username}
                        placeholder="At least 4 characters"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.username && <em className='errors'>{errors.username}</em>}
                <label className='subheading'>
                    First Name<br/>
                    <input className='normal'
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.firstName && <em className='errors'>{errors.firstName}</em>}
                <label className='subheading'>
                    Last Name<br/>
                    <input className='normal'
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.lastName && <em className='errors'>{errors.lastName}</em>}
                <label className='subheading'>
                    Password<br/>
                    <input className='normal'
                        type="password"
                        value={password}
                        placeholder="At least 6 characters"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.password && <em className='errors'>{errors.password}</em>}
                <label className='subheading'>
                    Confirm Password<br/>
                    <input className='normal'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.confirmPassword && (
                    <em className='errors'>{errors.confirmPassword}</em>
                )}
                <button className='signUpButton' type="submit" disabled={username.length < 4 || password.length < 6 || !email.length || !firstName.length || !lastName.length || !confirmPassword.length}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;
