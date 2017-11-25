import React, { Component } from 'react';
import './post.css'
import PostContent from './post-content.js'

import { Link } from 'react-router-dom'


class Post extends Component {
    render() {
        const post = this.props.post
        let label = null
        if (post.label) {
            label = <span class="badge badge-label">{post.label}</span>
        }
        let path = "/posts/" + post.id
        return (
            <div class="post">
                <div class="title">
                    <Link to={{
                        pathname: path,
                        state: { title: post.title }
                    }}>{post.title}</Link>
                    {label}
                    <span class="date float-xs-right">
                        <i class="fa fa-calendar" aria-hidden="true"></i> {post.date}
                    </span>
                </div>
            </div>
        )

    }
}

export default Post