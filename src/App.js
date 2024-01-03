import './App.css';
import React from 'react';
import {BrowserRouter as Routes, Link, Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
<Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/getall" component={Getall} exact />
        <Route path="/getid" component={Getid} exact />
        <Route path="/post" component={Post} exact />
        <Route path="/put" component={Put} exact />
        <Route path="/delete" component={Delete} exact />
      </Switch>
    </Router>
  );
}

export default App;
