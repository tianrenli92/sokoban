import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Game from "./components/Game";

function App() {
    return (
        <Router>
            <div className="container">
                <h2>Sokoban</h2>
                <Switch>
                    <Route exact path="/" render={() => (<Redirect to="/0"/>)}/>
                    <Route exact path='/:level' component={Game}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
