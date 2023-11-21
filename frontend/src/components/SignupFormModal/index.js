import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
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
        <div>
            <p className='heading'>Sign Up</p>
            <form onSubmit={handleSubmit}>
                <label className='normal'>
                    Email<br/>
                    <input className='normal'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.email && <p className='errors'>{errors.email}</p>}
                <label className='normal'>
                    Username<br/>
                    <input className='normal'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.username && <p className='errors'>{errors.username}</p>}
                <label className='normal'>
                    First Name<br/>
                    <input className='normal'
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.firstName && <p className='errors'>{errors.firstName}</p>}
                <label className='normal'>
                    Last Name<br/>
                    <input className='normal'
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.lastName && <p className='errors'>{errors.lastName}</p>}
                <label className='normal'>
                    Password<br/>
                    <input className='normal'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.password && <p className='errors'>{errors.password}</p>}
                <label className='normal'>
                    Confirm Password<br/>
                    <input className='normal'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    /><br/>
                </label>
                {errors.confirmPassword && (
                    <p className='errors'>{errors.confirmPassword}</p>
                )}
                <button className='signUpButton' type="submit" disabled={username.length < 4 || password.length < 6 || !email.length || !firstName.length || !lastName.length || !confirmPassword.length}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;
