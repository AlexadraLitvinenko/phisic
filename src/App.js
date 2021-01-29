import React from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import Header from './components/Header';
import Sections from './components/Sections';
import WorkBook from './components/WorkBook';
import Bottom from './components/Bottom';
import Check from './components/Check';
import About from './components/About';

function App() {

  return (
    <div>
        <Header />
        <Router history={useHistory()}>
          <Switch>
            <Route exact path="/">
              <Main/>
            </Route>
            <Route exact path="/about" component={About} />
            <Route exact path="/:sectionID" component={Sections} />
            <Route exact path="/:sectionNumber/workbook" render={(props) => <WorkBook {...props} />}/>
            <Route exact path="/:sectionNumber/check" render={(props) => <Check {...props} />}/>
          </Switch>
        </Router>
        <Bottom/>
    </div>
  );
}

export default App;
