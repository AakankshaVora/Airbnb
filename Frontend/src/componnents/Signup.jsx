import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.secondary + 90};
`;

const Signup = () => {
  return (
    <Container>
      <div>
        <Title>Welcome to Airbnb</Title>
        <Span>Sign up to create an account</Span>
      </div>
      <div style={{display: "flex", gap: "20px", flexDirection: "column"}}>
        <TextInput label="Full Name" placeholder="Enter Your Name"></TextInput>
        <TextInput label="Email Address" placeholder="Enter Your Email"></TextInput>
        <TextInput label="Password" placeholder="Enter Your Password" password></TextInput>
        <Button text="Sign Up"></Button>
      </div>
    </Container>
  )
};

export default Signup;
