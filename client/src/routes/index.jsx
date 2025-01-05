import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import RegisterAuthComponent from "../components/auth/register";
import LoginAuthComponent from "../components/auth/login";
import MainLayout from "../layouts/main";
import MainComponent from "../components/main";
import MyDriveMainComponent from "../components/main/myDrive";
import SharedWithMeMainComponent from "../components/main/sharedWithMe";
import FileAddComponent from "../components/main/myDrive/fileAdd";
import FileViewComponent from "../components/main/myDrive/fileView";
import AuthMiddleware from "../middleware/auth";
import VerifyEmailAuthComponent from "../components/auth/verifyEmail";
import SharedFileViewComponent from "../components/main/sharedWithMe/sharedFileView";
import UsersComponent from "../components/main/users";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<LoginAuthComponent />} />
          <Route path="register" element={<RegisterAuthComponent />} />
          <Route path="verify-email" element={<VerifyEmailAuthComponent />} />
        </Route>

        {/* MAIN */}
        <Route path="/" element={<AuthMiddleware />}>
          <Route path="/" element={<MainLayout />}>
            {/* Dashboard */}
            <Route index element={<MainComponent />} />

            {/* My Drive */}
            <Route path="/my-drive">
              <Route index element={<MyDriveMainComponent />} />
              <Route path="upload" element={<FileAddComponent />} />
              <Route path=":fileId" element={<FileViewComponent />} />
            </Route>

            {/* Shared with me */}
            <Route path="/shared-with-me">
              <Route index element={<SharedWithMeMainComponent />} />
              <Route path=":fileId" element={<SharedFileViewComponent />} />
            </Route>

            {/* Users */}
            <Route path="/users">
              <Route index element={<UsersComponent />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
