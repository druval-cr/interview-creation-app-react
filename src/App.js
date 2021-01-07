import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux'

import store from './store/configureStore'
import InterviewIndex from './components/InterviewIndex/InterviewIndex'
import InterviewCreate from './components/InterviewCreate/InterviewCreate'
import InterviewEdit from './components/InterviewEdit/InterviewEdit'

import './App.css';

export const history = createBrowserHistory();

function App() {
  return (
    <Provider store = {store}>
    <div className="App">
        <Router>
            <Switch>
                <Route exact path = '/' component={InterviewIndex} />
                <Route path = '/create' component={InterviewCreate} />
                <Route path = '/edit/:id' component={InterviewEdit} />
            </Switch>
        </Router>
    </div>
    </Provider>
  );
}

export default App;
