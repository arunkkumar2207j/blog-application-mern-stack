import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, styled } from "@mui/material";
import { API } from "../../services/api.js";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.5);
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: white;
  border-radius: 2px;
  height: 48px;
`;

const SignUpButton = styled(Button)`
  text-transform: none;
  background: $fff;
  color: #2874f0;
  border-radius: 2px;
  height: 48px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const signupInitialValue = {
  name: "",
  username: "",
  password: ""
}

const loginInitialValue = {
  username: "",
  password: ""
}

function Login({isUserAuthenticated}) {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValue)
  const [login, setLogin] = useState(loginInitialValue)
  const [error, setError] = useState("")
  const { setAccount } = useContext(DataContext)
  const navigate = useNavigate()

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup")
  }
  const onInputChange = (e) => {
    setSignup({...signup, [e.target.name]:e.target.value})
  }
  const onValueChange = (e) => {
    setLogin({...login, [e.target.name]: e.target.value})
  }
  const signupUser = async () => {
    const response = await API.userSignup(signup)
    if(response.isSuccess) {
     setSignup(signupInitialValue)
     toggleAccount('login')
    } else {
      setError("Something went wrong")
    }
  }
  const loginUser = async () => {
    const response = await API.userLogin(login)
    if(response.isSuccess) {
      setError("")
      sessionStorage.setItem("accessToken", `Bearer ${response.data.accessToken}`)
      sessionStorage.setItem("refreshToken", `Bearer ${response.data.refreshToken}`)
      setAccount({name:response.data.name, username: response.data.username})
      isUserAuthenticated(true);
      navigate("/")
     } else {
       setError("Something went wrong")
     }
  }
  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login image"></Image>
        {account === "signup" ? (
          <Wrapper>
            <TextField variant="standard" label="enter name" name="name" onChange={(e) => onInputChange(e)} />
            <TextField variant="standard" label="enter username" name="username" onChange={(e) => onInputChange(e)} />
            <TextField variant="standard" label="enter password" name="password" onChange={(e) => onInputChange(e)} />
            {error && <Error>{error}</Error>}
            <SignUpButton onClick={() => signupUser()}>Signup</SignUpButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton onClick={() => toggleSignup()} variant="contained">Login</LoginButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField variant="standard" label="enter username" value={login.username} name="username"  onChange={(e) => onValueChange(e)}/>
            <TextField variant="standard" label="enter password" value={login.password} name="password"  onChange={(e) => onValueChange(e)}/>
            {error && <Error>{error}</Error>}
            <LoginButton onClick={() => loginUser()} variant="contained">Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignUpButton onClick={() => toggleSignup()}>Create an Account</SignUpButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
}

export default Login;
