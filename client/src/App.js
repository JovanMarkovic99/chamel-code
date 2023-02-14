import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AppContext from './context/AppContext';
import HttpClient from './services/HttpClient';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Index from './pages/Index/';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import RegisterLogIn from './pages/RegisterLogIn';
import Category from './pages/Category';
import Post from './pages/Post';
import Search from './pages/Search';
import Settings from './pages/Settings';

function App() {

  const [isInitiated, setIsInitiated] = useState(false);
  const [user, setUser] = useState(null);
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const { data } = await HttpClient().get("/api/user/init");
          setUser(data);
        } catch (e) {
          console.log(e);
          localStorage.setItem("token", null);
          setUser(null);
        }
      }

      const night_mode = localStorage.getItem("nightmode");
      setNightMode(night_mode === "true");

      setIsInitiated(true);
    };
    init();
  }, []);

  const logout = () => {
    localStorage.setItem("token", null);
    setUser(null);
  }

  const toggleNightMode = () => {
    localStorage.setItem("nightmode", !nightMode);
    setNightMode(!nightMode);
  }

  const DefaultContainer = () => {
    return (
      <>
        <ScrollToTop />
        <Navbar />
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/category/:categoryTitle/:discussionId?">
          <Category />
        </Route>
        <Route path="/create-post">
          {user ? <Post /> : <Redirect to="/auth/login" />}
        </Route>
        <Route path="/search/:searchString">
          <Search />
        </Route>
        <Route path="/settings">
          {user ? <Settings /> : <Redirect to="/auth/login" />}
        </Route>
      </>
    )
  }

  return (
    <>
      {isInitiated && (
        <AppContext.Provider value={{ user, setUser, logout, nightMode, toggleNightMode }}>
          <div id="theme-selector" className={`${nightMode ? 'night-mode' : ''}`}>
            <Router>
              <Switch>
                <Route path="/auth/register">
                  {!user ? <RegisterLogIn /> : <Redirect to="/home" />}
                </Route>
                <Route path="/auth/login">
                  {!user ? <RegisterLogIn /> : <Redirect to="/home" />}
                </Route>
                <Route component={DefaultContainer} />
              </Switch>
            </Router>
          </div>
        </AppContext.Provider>
      )}
    </>
  );
}

export default App;
