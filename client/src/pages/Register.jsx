import {useState, React} from 'react';

import {
  Button,
  FormGroup,
  InputGroup,
  Divider,
  Callout
} from "@blueprintjs/core";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if(password !== passwordConf){
      console.log()
      setError("Passwords do not match")
      setIsSubmitting(false);
      return
    }
  
    fetch("/api/auth/signup", {
        method:"POST",
        body: JSON.stringify({username, email, password}),
        headers: { "Content-Type":"application/json"}
    }).then(async response => {
        console.log(">>>>> ", response)
        console.log(response.body.username)
        
        if(!response.ok){
            if(response.status === 400) setError("Missing credentials")
            else if(response.status === 404) setError("Invalid email and/or password")
            else setError("Something went wrong! :<")
        }else{
            const data = await response.json()
            console.log(data.token) //save this token in a global state
            navigate("/")
        }
    }).catch(error => {
        setError(error.message || "Something went wrong! :<")
    }).finally(() => setIsSubmitting(false))
  };
  return (
    <>
      {error && <Callout>{error}</Callout>}
      <form className="auth-form" onSubmit={formSubmitHandler}>
        <FormGroup label="Username" labelFor="username">
          <InputGroup
            id="username"
            placeholder="Enter your name"
            type="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            id="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            id="password"
            placeholder="Enter your Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         </FormGroup>
        <FormGroup label="Passwordconf" labelFor="passwordconf">
          <InputGroup
            id="confirmpassword"
            placeholder="Enter your Password again"
            type="password"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />
        </FormGroup>
        <Button
          type="submit"
          text="Sign Up"
          intent="primary"
          loading={isSubmitting}
        />
        <Divider />
        <Link to="/forgot">Forgot Password?</Link>
      </form>
    </>
  )
}

export default Register