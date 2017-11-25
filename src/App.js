import React, { Component } from 'react';
import Posts from './posts.js';
import PostContent from './post-content.js';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <div class="posts-header"><Link to="/">Posts</Link></div>
            <Route exact path="/" component={Posts} />
            <Route path="/posts/:id" component={PostContent} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
