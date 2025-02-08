import { StrictMode } from 'react';
import { App } from './App';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { QuestsPage } from './pages/QuestsPage/QuestsPage';
import { RightsPage } from './pages/RightsPage/RightsPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPaage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { UserIdProvider } from './context/UserIdProvider';

export const Root = () => (
  <StrictMode>
    <UserIdProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<App />}
          >
            <Route
              index
              element={<HomePage />}
            />
            <Route
              path="home"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
            <Route
              path="/quests"
              element={<QuestsPage />}
            />
            <Route
              path="/rights"
              element={<RightsPage />}
            />
            <Route
              path="/contacts"
              element={<ContactsPage />}
            />
            <Route
              path="/register"
              element={<RegisterPage />}
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/profile/:id"
              element={<ProfilePage />}
            />
          </Route>
        </Routes>
      </Router>
    </UserIdProvider>
  </StrictMode>
);
