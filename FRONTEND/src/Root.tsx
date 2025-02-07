import { StrictMode } from 'react';
import { App } from './App';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { QuestsPage } from './pages/QuestsPage/QuestsPage';
import { RightsPage } from './pages/RightsPage/RightsPage';

export const Root = () => (
  <StrictMode>
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
          <Route path='/quests' element={<QuestsPage />} />
          <Route path='/rights' element={<RightsPage />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
