import React, { Component } from 'react';
import Posts from './posts.js';
import PostContent from './post-content.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

export class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <div className="posts-header"><Link to="/page/1">Posts</Link></div>
          <Route path="/page/:id" component={Posts} />
          <Route path="/posts/:id" component={PostContent} />
          <Route exact path="/" component={Posts}  />
        </div>
      </Router>
    )
  }
}

export default withRouter((App));
