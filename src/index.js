import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import PostIndex from './components/posts_index';
import PostsNew from './components/post_new';
import PostShow from './components/post_show';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    	<h1>Redux/React Blog App</h1>
    		<Switch>
          <Route path="/posts/new" component={ PostsNew } />
          <Route path="/posts/:id" component={ PostShow } />
		    	<Route path="/" component={ PostIndex } />
	    	</Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
