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
import { Link, useNavigate } from "react-router-dom";
import AuthContainerPage from "./AuthContainerPage";
import { supabase } from "../../supabase/supabase";
import { useFormik } from "formik";
import * as yup from "yup";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // login with email
  const handleLoginWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formik.values.email,
      password: formik.values.password,
    });

    if (error) {
      console.log(error);
      setError("Email or Password wrong");
    } else {
      console.log(data);
      return navigate("/");
    }
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLoginWithEmail,
  });

  // login with oauth google
  const handleLoginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      console.log(data);
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
            Welcome Back 🖐
          </Typography>
          <Button
            onClick={handleLoginWithGoogle}
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
              <InputLabel sx={{ marginBottom: "8px" }}>Email</InputLabel>
              <TextField
                size="medium"
                placeholder="email@gmail.com"
                fullWidth
                type="email"
                onChange={formik.handleChange}
                name="email"
                error={Boolean(formik.errors.email || error)}
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
                onChange={formik.handleChange}
                name="password"
                error={Boolean(formik.errors.password || error)}
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
            <Box sx={{ color: "red" }}>{error && error}</Box>
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
            <Typography>Don't have an account?</Typography>
            <Typography>
              <Link
                to={"/register"}
                style={{ textDecoration: "none", color: "#5562B3" }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </AuthContainerPage>
  );
};

export default LoginPage;
