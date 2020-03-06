import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import tree from "../assets/tree.png";
import { fetchRegistration } from "../actions/signinAction";
import "../components/SignIn/Signin.scss";
import Particles from "react-particles-js";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#64b5f6"
    },
    secondary: {
      main: "#000",
      contrastText: "#ffcc00"
    }
  }
});

export default function SignUp(props) {
  const classes = useStyles();

  const [account, setAccount] = useState({
    email: "",
    username: "",
    password1: "",
    password2: ""
  });

  const handleChange = event => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };
  const dispatch = useDispatch();
  // const signIn = useSelector(state => state.signInReducer)
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(fetchRegistration(account, props.history));
  };
  const particleOpt = {
    particles: {
      number: {
        value: 130,
        density: {
          enable: true,
          value_area: 1000
        }
      }
    }
  };

  // const particleOpt = {
  //   particles: {
  //     number: {
  //       value: 160,
  //       density: {
  //         enable: false
  //       }
  //     },
  //     size: {
  //       value: 3,
  //       random: true,
  //       anim: {
  //         speed: 4,
  //         size_min: 0.3
  //       }
  //     },
  //     line_linked: {
  //       enable: false
  //     },
  //     move: {
  //       random: true,
  //       speed: 1,
  //       direction: "top",
  //       out_mode: "out"
  //     }
  //   },
  //   interactivity: {
  //     events: {
  //       onhover: {
  //         enable: true,
  //         mode: "bubble"
  //       },
  //       onclick: {
  //         enable: true,
  //         mode: "repulse"
  //       }
  //     },
  //     modes: {
  //       bubble: {
  //         distance: 250,
  //         duration: 2,
  //         size: 0,
  //         opacity: 0
  //       },
  //       repulse: {
  //         distance: 400,
  //         duration: 4
  //       }
  //     }
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
      <Particles params={particleOpt} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}> */}
          {/* <LockOutlinedIcon /> */}
          <img src={tree} alt="tree" />
          {/* </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password1"
                  label="Password1"
                  type="password"
                  id="password1"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Password2"
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/" variant="body2" className="singInLink">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}
