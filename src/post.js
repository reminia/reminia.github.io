import React, { Component } from 'react';
import './post.css'
import PostContent from './post-content.js'

import { Link } from 'react-router-dom'

class Post extends Component {
    render() {
        const post = this.props.post
        let labels = post.labels.map(label => ( <span class="badge badge-label">{label}</span> ))
        let path = "/posts/" + post.id
        return (
            <div class="post">
                <div class="title">
                    <Link to={{
                        pathname: path,
                        state: { title: post.title }
                    }}>{post.title}</Link>
                    {labels}
                    <span class="date float-xs-right">
                        <i class="fa fa-calendar" aria-hidden="true"></i> {post.date}
                    </span>
                </div>
            </div>
        )

    }
}

export default Post