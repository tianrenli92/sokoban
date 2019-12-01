import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Game from "./components/Game";
import Main from "./components/Main";

function App() {
    return (
        <Router>
            <div>
                <h2>Sokoban</h2>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path='/:level' component={Game}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
