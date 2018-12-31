import React, { Component } from 'react';
import Posts from './posts.js';
import PostContent from './post-content.js';
import About from './about.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

export class App extends Component {

  render() {
    const style = { color: 'grey' };
    return (
      <Router>
        <div>
          <div className="posts-header"><Link to="/page/1">Posts</Link>
            <span style={style}> | </span>
            <Link to="/about" style={style}>About</Link>
          </div>
          <Route path="/page/:id" component={Posts} />
          <Route path="/posts/:id" component={PostContent} />
          <Route exact path="/" component={Posts} />
          <Route path="/about" component={About}> </Route>
        </div>
      </Router>
    )
  }
}

export default withRouter((App));
