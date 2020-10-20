import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {Link} from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://material-ui.com/">
        Butter & Grace
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const formValidation = (e) => {
    e.preventDefault();

    if (firstName === "") {
      setValidatedFirstName(true);
    } else {
      setValidatedFirstName(false);
    }
    if (lastName === "") {
      setValidatedLastName(true);
    } else {
      setValidatedLastName(false);
    }
    if (email === "") {
      setValidatedEmail(true);
    } else {
      setValidatedEmail(false);
    }
    if (password === "") {
      setValidatedPassword(true);
    } else {
      setValidatedPassword(false);
    }
    if (verifiedPassword === "") {
      return setValidatedVerifiedPassword(true);
    } else {
      setValidatedVerifiedPassword(false);
    }

    const validated_email = new RegExp(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    ).test(email);
    if (!validated_email) {
      return setValidatedEmail(!NotvalidatedEmail);
    }
    if (password.length < 5) {
      return setValidatedPassword(!NotvalidatedPassword);
    }

    if (password !== verifiedPassword) {
      return setValidatedVerifiedPassword(!NotvalidatedVerifiedPassword);
    }

    if (firstName !== "" && lastName !== "") {
      userSignUp(email, firstName, lastName, password, verifiedPassword);
    }
  };

  const userSignUp = (
    userEmail,
    userName,
    userLastName,
    password,
    verifiedPassword
  ) => {
    const data = new FormData();
    data.append("email", userEmail);
    data.append("firstName", userName);
    data.append("lastName", userLastName);
    data.append("password", password);
    data.append("verifiedPassword", verifiedPassword);

    const url = "/api/user-register";

    axios
      .post(url, data)
      .then((response) => {
        alert(response.data.msg);
      })
      .catch((error) => {
        const { msg } = error.response;
        alert(error.response.data.msg);
      });
  };

  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifyPassword] = useState("");

  const [NotvalidatedEmail, setValidatedEmail] = useState(false);
  const [NotvalidatedLastName, setValidatedLastName] = useState(false);
  const [NotvalidatedFirstName, setValidatedFirstName] = useState(false);
  const [NotvalidatedPassword, setValidatedPassword] = useState(false);
  const [NotvalidatedVerifiedPassword, setValidatedVerifiedPassword] = useState(
    false
  );
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required={true}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
              {NotvalidatedFirstName ? (
                <h6 className="form__error">*First Name is required</h6>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
              {NotvalidatedLastName ? (
                <h6 className="form__error">*Last Name is required</h6>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {NotvalidatedEmail ? (
                <h6 className="form__error">*Enter a valid email</h6>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {NotvalidatedPassword ? (
                <h6 className="form__error">
                  *Password must have atleast 5 characters
                </h6>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                name="password"
                label="Verify Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setVerifyPassword(e.target.value)}
              />
              {NotvalidatedVerifiedPassword ? (
                <h6 className="form__error">*Password Does not match</h6>
              ) : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={formValidation}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/user-signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
