import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GoogleImg from "../../assets/google.png";
import { Link } from "react-router-dom";
import AuthContainerPage from "./AuthContainerPage";
import { useFormik } from "formik";
import { supabase } from "../../supabase/supabase";
import * as yup from "yup";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleRegisterWithEmail = async (e) => {
    try {
      let { data, error } = await supabase.auth.signUp({
        email: formik.values.email,
        password: formik.values.password,
        options: {
          data: {
            name: formik.values.username,
          },
        },
      });

      console.log(data);
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = yup.object({
    username: yup.string().min(3).required("Username is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/,
        "Password should be at least 6 characters. Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};\\':\"|,.<>/?"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegisterWithEmail,
  });

  // login with oauth google
  const handleRegisterWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  // handle show and hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <AuthContainerPage>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Box padding={"20px"} width={"80%"}>
          <Typography
            sx={{
              marginBottom: "30px",
              fontSize: "30px",
              fontWeight: "bold",
              color: "#151515",
            }}
          >
            Lets Join With Us 😉
          </Typography>
          <Button
            onClick={handleRegisterWithGoogle}
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              paddingY: "8px",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            fullWidth
          >
            <img
              src={GoogleImg}
              alt="google logo"
              width={"30px"}
              style={{ marginRight: "10px" }}
            />{" "}
            Continue with Google
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginY: "20px",
            }}
          >
            <Box
              sx={{
                height: "1px",
                backgroundColor: "#D1D4D6",
                flexGrow: 1,
              }}
            ></Box>
            <Typography sx={{ paddingX: "20px" }}>or</Typography>
            <Box
              sx={{
                height: "1px",
                backgroundColor: "#D1D4D6",
                flexGrow: 1,
              }}
            ></Box>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ marginBottom: "20px" }}>
              <InputLabel sx={{ marginBottom: "8px" }}>Username</InputLabel>
              <TextField
                size="medium"
                placeholder="John Doe"
                fullWidth
                onChange={formik.handleChange}
                name="username"
                error={!!formik.errors.username}
                helperText={formik.errors.username}
              />
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <InputLabel sx={{ marginBottom: "8px" }}>Email</InputLabel>
              <TextField
                size="medium"
                placeholder="email@gmail.com"
                fullWidth
                type="email"
                onChange={formik.handleChange}
                name="email"
                error={!!formik.errors.email}
                helperText={formik.errors.email}
              />
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <InputLabel sx={{ marginBottom: "8px" }}>Password</InputLabel>
              <TextField
                size="medium"
                placeholder="******"
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={formik.handleChange}
                error={!!formik.errors.password}
                helperText={formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                paddingY: "10px",
                backgroundColor: "#5562B3",
                "&:hover": { backgroundColor: "#5562B3" },
              }}
            >
              Login
            </Button>
          </form>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginTop: "20px",
              columnGap: "5px",
            }}
          >
            <Typography>Already have an account?</Typography>
            <Typography>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#5562B3" }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </AuthContainerPage>
  );
};

export default RegisterPage;
