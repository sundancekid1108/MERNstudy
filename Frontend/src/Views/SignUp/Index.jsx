import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import {
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import * as userApi from "../../Api/UserApi/UserApi";
import styles from "./Styles";

const SignUp = (props) => {
  const { classes } = props;
  const form = useRef();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPassword2, setUserPassword2] = useState("");
  const [checkValue, setCheckValue] = useState(false);
  const [isValid, setIsValid] = useState("true");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [policyError, setPolicyError] = useState(false);

  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  const onChangeUserEmail = (e) => {
    const userEmail = e.target.value;
    setUserEmail(userEmail);
  };

  const onChangeUserName = (e) => {
    const userName = e.target.value;
    setUserName(userName);
  };

  const onChangeUserFirstName = (e) => {
    const userFirstName = e.target.value;
    setUserFirstName(userFirstName);
  };

  const onChangeUserLastName = (e) => {
    const userLastName = e.target.value;
    setUserLastName(userLastName);
  };

  const onChangeUserPassword = (e) => {
    const userPassword = e.target.value;
    setUserPassword(userPassword);
  };

  const onChangeUserPassword2 = (e) => {
    const userPassword = e.target.value;
    setUserPassword2(userPassword);
  };

  const onChangeCheckValue = async (e) => {
    if (checkValue === false) {
      setCheckValue(true);
    } else {
      setCheckValue(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (checkValue == false) {
      //Check 버튼 확인
      setIsLoading(false);
      setIsValid(true);
      setPolicyError("Check the Terms and Conditions");
    } else if (
      userEmail === "" ||
      userName === "" ||
      userFirstName === "" ||
      userLastName === "" ||
      userPassword === "" ||
      userPassword2 === ""
    ) {
      //빈칸 확인
      setIsLoading(false);
      setIsValid(true);
      setErrorMessage("Check the Empty Field");
    }
    const result = await userApi.userSignUp(
      userName,
      userEmail,
      userFirstName,
      userLastName,
      userPassword,
      userPassword2
    );
    // console.log("result : ", result);
    // 회원가입성공했을때 넘김
    if (result.status == 400) {
      setErrorMessage(result.data.response);
    } else {
      history.push("/signin");
    }
  };
  return (
    <>
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteWrapper} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h1">
                  Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                  they sold out High Life.
                </Typography>
                <div className={classes.person}>
                  <Typography className={classes.name} variant="body1">
                    Takamaru Ayako
                  </Typography>
                  <Typography className={classes.bio} variant="body2">
                    Manager at inVision
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton className={classes.backButton} onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form
                  className={classes.form}
                  ref={form}
                  onSubmit={handleSignUp}
                >
                  <Typography className={classes.title} variant="h2">
                    Create new account
                  </Typography>
                  <Typography className={classes.subtitle} variant="body1">
                    Use your Email to create new account
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Email"
                      name="email"
                      onChange={onChangeUserEmail}
                      type="text"
                      value={userEmail}
                      variant="outlined"
                      autoFocus
                    />

                    <TextField
                      className={classes.textField}
                      label="UserName"
                      name="username"
                      onChange={onChangeUserName}
                      type="text"
                      value={userName}
                      variant="outlined"
                    />

                    <TextField
                      className={classes.textField}
                      label="First name"
                      name="firstName"
                      onChange={onChangeUserFirstName}
                      type="text"
                      value={userFirstName}
                      variant="outlined"
                    />

                    <TextField
                      className={classes.textField}
                      label="Last name"
                      name="lastName"
                      onChange={onChangeUserLastName}
                      type="text"
                      value={userLastName}
                      variant="outlined"
                    />

                    <TextField
                      className={classes.textField}
                      label="Password"
                      onChange={onChangeUserPassword}
                      type="password"
                      value={userPassword}
                      variant="outlined"
                    />

                    <TextField
                      className={classes.textField}
                      label="Check your Password"
                      onChange={onChangeUserPassword2}
                      type="password"
                      value={userPassword2}
                      variant="outlined"
                    />

                    <div className={classes.policy}>
                      <Checkbox
                        checked={checkValue}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={onChangeCheckValue}
                      />
                      <Typography
                        className={classes.policyText}
                        variant="body1"
                      >
                        I have read the &nbsp;
                        <Link className={classes.policyUrl} to="#">
                          Terms and Conditions
                        </Link>
                        .
                      </Typography>
                    </div>
                    {policyError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {policyError}
                      </Typography>
                    )}
                  </div>
                  {errorMessage && (
                    <Typography
                      className={classes.errorMessage}
                      variant="body2"
                    >
                      {errorMessage}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signUpButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={handleSignUp}
                      size="large"
                      variant="contained"
                    >
                      Sign up now
                    </Button>
                  )}
                  <Typography className={classes.signIn} variant="body1">
                    Have an account?{" "}
                    <Link className={classes.signInUrl} to="/signin">
                      Sign In
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default withStyles(styles)(SignUp);
