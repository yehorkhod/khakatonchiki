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
import { CreateQuestPage } from './pages/CreateQuestPage/CreateQuestPage';
import { NeedToRegister } from './pages/NeedToRegister/NeedToRegister';
import { PreviewQuestPage } from './pages/PreviewQuestPage/PreviewQuestPage';
import { DoQuestPage } from './pages/DoQuestPage/DoQuestPage';
import { AboutUsPage } from './pages/AboutUsPage/AboutUsPage';
import { QuestResultPage } from './pages/QuestResultPage/QuestResultPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor, store } from './app/store';
// import { Provider } from 'react-redux';

export const Root = () => (
  <StrictMode>
    <UserIdProvider>
      {/* <Provider store={store}> */}
      {/* <PersistGate
          loading={null}
          persistor={persistor}
        > */}
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
              path="/about-us"
              element={<AboutUsPage />}
            />
            <Route
              path="/register"
              element={<RegisterPage />}
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route element={<NeedToRegister />}>
              <Route
                path="/profile/:id"
                element={<ProfilePage />}
              />
              <Route
                path="/create-quest"
                element={<CreateQuestPage />}
              />
              <Route
                path="/quest/:id"
                element={<PreviewQuestPage />}
              />
              <Route
                path="/quest/:id/task"
                element={<DoQuestPage />}
              />
              <Route
                path="/quest/:id/result"
                element={<QuestResultPage />}
              />
            </Route>
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </Router>
      {/* </PersistGate>
      </Provider> */}
    </UserIdProvider>
  </StrictMode>
);
