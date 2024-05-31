import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutRoot from "./layout/LayoutRoot";
import HomePage from "./pages/HomePage";
import { CssBaseline } from "@mui/material";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { UserProvider } from "./context/userContext";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<LayoutRoot />}>
            <Route index element={<HomePage />} />
            <Route path="c/:idPromptParent" element={<ChatPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
