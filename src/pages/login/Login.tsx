import React, { useState, useEffect, FormEvent } from 'react';
import { UserRequest } from '../../ultils/interfaces/UserInterface';
import { useLogin } from './hooks/useLogin';
import './login.scss';
import '../../index.scss';

import LogoImg from '../../assets/images/logo.png';
import LogoSmallBottomImg from '../../assets/images/Logo-small-bottom.png';
import { useNavigate } from 'react-router-dom';
import userService from '../../ultils/userService';

const Login = () => {
    const [loginSuccess, login] = useLogin();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const navigate = useNavigate();

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userRequest = {
            username,
            password
        }

        login(userRequest as UserRequest)
    }

    useEffect(() => {
        if (loginSuccess) {
            navigate('/product');
        }
    }, [loginSuccess])

    return (
        <div themebg-pattern="theme1">
            <div className="login-block">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <form className="md-float-material form-material" onSubmit={onSubmit}>
                                <div className="text-center">
                                    {/* <img src={LogoImg} alt="logo.png"></img> */}
                                </div>
                                <div className="auth-box card">
                                    <div className="card-block">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3 className="text-center">Sign In</h3>
                                            </div>
                                        </div>
                                        <div className="shared-input-container">
                                            <input
                                                type="text"
                                                name="user-name"
                                                className="input-field"
                                                placeholder="Enter Username"
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                            <span className="label">Username</span>
                                        </div>
                                        <div className="shared-input-container">
                                            <input
                                                type={isShowPassword ? "text" : "password"}
                                                name="password"
                                                className="input-field"
                                                placeholder="Enter Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <span className="label">Password</span>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12 d-flex">
                                                <div className="checkbox-fade" style={{ cursor: 'pointer' }}>
                                                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                        onClick={() => setIsShowPassword(!isShowPassword)}>
                                                        <input
                                                            type="checkbox"
                                                            checked={isShowPassword}
                                                        />
                                                        <span className="text-remember-me">Show password</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <button
                                                    className="btn btn-primary mb-2 btn-sign-in"
                                                >
                                                    Sign in
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginBottom: '20px', marginTop: '10px', cursor: 'pointer' }}>
                                            <div className="d-flex justify-content-center links">
                                                Don't have an account?&nbsp; <a onClick={() => navigate('/register')} className="ml-2">Sign Up</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login