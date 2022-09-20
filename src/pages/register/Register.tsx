import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import "./register.scss";
import "../../index.scss";

import LogoImg from "../../assets/images/logo.png";
import LogoSmallBottomImg from "../../assets/images/Logo-small-bottom.png";
import { useRegister } from "./hooks/useRegister";
import { UserRegisterRequest } from "../../ultils/interfaces/UserInterface";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [registerSuccess, register] = useRegister();
    const [formInputs, setFormInputs] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { email, password, username, confirmPassword } = formInputs;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Password and confirm password are not match');
        } else {
            const userRegisterRequest = {
                username,
                password,
                email
            }

            register(userRegisterRequest as UserRegisterRequest);
        }
    }

    return (
        <div themebg-pattern="theme1">
            <div className="login-block">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <form
                                className="md-float-material form-material"
                                onSubmit={onSubmit}
                            >
                                <div className="text-center">
                                    {/* <img src={LogoImg} alt="logo.png" /> */}
                                </div>
                                <div className="auth-box card">
                                    <div className="card-block">
                                        <div className="row mb-3">
                                            <div className="col-md-12">
                                                <h3 className="text-center txt-primary">Sign up</h3>
                                            </div>
                                        </div>
                                        <div className="shared-input-container">
                                            <input
                                                type="text"
                                                name="username"
                                                className="input-field"
                                                placeholder="User name"
                                                onChange={handleChange}
                                                required
                                            />
                                            <span className="label">Username</span>
                                        </div>
                                        <div className="shared-input-container">
                                            <input
                                                type="email"
                                                name="email"
                                                className="input-field"
                                                placeholder="Email"
                                                onChange={handleChange}
                                                required
                                            />
                                            <span className="label">Email Address</span>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="shared-input-container">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="input-field"
                                                        placeholder="Password"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <span className="label">Password</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="shared-input-container">
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        className="input-field"
                                                        placeholder="Confirm Password"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <span className="label">Confirm Password</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <button
                                                    className="btn btn-primary mb-2 btn-sign-up"
                                                >
                                                    Sign up
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginBottom: '20px', marginTop: '10px', cursor: 'pointer' }}>
                                            <div className="d-flex justify-content-center links">
                                                Have an account?&nbsp; <a onClick={() => navigate('/login')} className="ml-2">Log In</a>
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
    );
};

export default Register;
