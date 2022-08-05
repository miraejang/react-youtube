import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Home from './screens/home';
import Watch from './screens/watch';
import styles from './App.module.css';
import Nav from './components/nav/nav';
import Results from './screens/results';
import Playlist from './screens/playlist';
import History from './screens/history';

function App({ youtube, authService }) {
  const [navOpen, setNavOpen] = useState(false);

  const clickNavBtn = () => {
    setNavOpen(!navOpen);
  };

  const formatDate = date => {
    const arr = date.split(/[-, T]/gi);
    const year = Number(arr[0]);
    const month = Number(arr[1]);
    const day = Number(arr[2]);
    return `${year}. ${month}. ${day}.`;
  };

  const formatNumber = number => {
    number = Number(number);
    if (number > 10000) return `${number / 10000}만`;
    return `${number.toLocaleString('en-IN')}`;
  };

  return (
    <div className={styles.youtube}>
      <Header authService={authService} clickNavBtn={clickNavBtn} />
      <div className={styles.content}>
        <div className={styles.container}>
          <Nav navOpen={navOpen} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  youtube={youtube}
                  formatDate={formatDate}
                  formatNumber={formatNumber}
                />
              }
            />
            <Route
              path="/watch/:id"
              element={
                <Watch
                  youtube={youtube}
                  formatDate={formatDate}
                  formatNumber={formatNumber}
                />
              }
            />
            <Route
              path="/results"
              element={
                <Results
                  youtube={youtube}
                  formatDate={formatDate}
                  formatNumber={formatNumber}
                />
              }
            />
            <Route path="/history" element={<History />} />
            <Route path="/playlist" element={<Playlist />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
