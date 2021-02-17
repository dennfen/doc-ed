import { Switch, Route, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import BugTracker from './components/BugTracker/BugTracker';
import VisualGraph from './components/VisualGraph/VisualGraph';
import NavBar from './components/NavBar/NavBar';
import { AnimatePresence } from 'framer-motion';
import './App.scss';

const App = () => {
  const location = useLocation();

  return (
    <div className='app'>
      <NavBar />
      <AnimatePresence exitBeforeEnter key='app'>
        <Switch location={location} key={location.pathname}>
          <Route path='/' exact component={Dashboard} />
          <Route path='/bugtracker' component={BugTracker} />
          <Route path='/visualization' component={VisualGraph} />
        </Switch>
      </AnimatePresence>
      <div className='app__corner-triangle'></div>
    </div>
  );
}

export default App;