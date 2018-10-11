import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers'
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import Login from './components/Login';
import Header from './routes/Header';
import Loader from './components/Loader';
import Authenticated from './components/Authenticated';
import NoteDetail from './components/NoteDetail';
import NoteEdit from './components/NoteEdit';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Loader>
        <div>
          <Switch>
            <Route path="/login" component={Login} exact={true} />
            <Redirect from="/logout" to="/" />
            <Authenticated>
              <Header />
              <Route path="/" component={App} exact={true} />
              <Route path="/:id" component={NoteDetail} exact={true} />
              <Route path="/:id/edit" component={NoteEdit} exact={true}></Route>
            </Authenticated>
          </Switch>
        </div>
      </Loader>
      
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
