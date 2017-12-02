import React, { Component } from 'react';
import Post from './post.js';
import { schema, userGists } from './api.js';

class Posts extends Component {

    constructor(props) {
        super(props)
        this.state = { posts: [] }
    }

    componentDidMount() {
        fetch(userGists)
            .then(resp => { return resp.json() })
            .then(data => {
                const posts = data.map(item => {
                    const { label, title } = this.parseDescription(item.description)
                    return {
                        id: item.id,
                        title: title,
                        label: label,
                        url: item.html_url,
                        date: this.parseDate(item.updated_at)
                    }
                })
                this.setState({ posts: posts })
            })
    }

    parseDate(aDate) {
        const arr = aDate.split("T")
        return arr[0] + " " + arr[1].slice(0, -1)
    }

    // parse desc to label and title
    // word starts with # is label
    parseDescription(desc) {
        const arr = desc.trim().split(/\s+/)
        const labels = arr.filter(a => a.startsWith("#"))
        const title = arr.filter(a => !a.startsWith("#"))

        return {
            label: labels.length > 0 ? labels[0] : "",
            title: title.join(" ")
        }
    }


    render() {
        const posts = this.state.posts.map(post => <Post post={post} />)
        return (
            <div class="content">{posts}</div>
        )
    }
}

export default Posts