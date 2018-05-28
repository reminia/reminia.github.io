import React, { Component } from 'react';
import Post from './post.js';
import { schema, issuesUri, parseTitle, parseDate } from './util.js';
import { Link } from 'react-router-dom'

class Posts extends Component {

    prev
    next
    constructor(props) {
        super(props)
        this.state = { posts: [], routeChanged: false }
    }

    componentWillReceiveProps(nextProps) {
        const routeChanged = nextProps.location !== this.props.location
        if (routeChanged) {
            this.id = this.resolveId(nextProps.location)
            this.fetchData()
        }
    }

    resolveId(location) {
        return parseInt(location.pathname.split('/').pop())
    }

    fetchData() {
        if (!this.id) this.id = 1
        fetch(issuesUri(this.id))
            .then(resp => {
                const link = resp.headers.get('link')
                this.prev = undefined
                this.next = undefined

                link.trim().split(',').forEach(item => {
                    const splits = item.split(";")
                    const url = splits[0].slice(1, -1)
                    const ref = splits[1]
                    if (ref.includes("prev")) {
                        this.prev = url
                    }
                    if (ref.includes("next")) {
                        this.next = url
                    }
                })
                return resp.json()
            })
            .then(data => {
                const posts = data
                    .filter(item => item.state === 'open')
                    .map(item => {
                        const { labels, title } = parseTitle(item.title)
                        return {
                            id: item.number,
                            title: title,
                            labels: labels,
                            url: item.html_url,
                            date: parseDate(item.created_at)
                        }
                    })
                this.setState({ posts: posts })
            })
    }

    componentDidMount() {
        this.id = this.resolveId(this.props.location)
        this.fetchData()
    }

    render() {
        const posts = this.state.posts.map(post => <Post post={post} />)
        let prev, next
        if (this.prev) {
            prev = <i class="fa fa-long-arrow-left prev" aria-hidden="true"><Link to={'/page/' + (this.id - 1)}>prev</Link></i>
        }
        if (this.next) {
            next = <Link to={'/page/' + (this.id + 1)} className="next">next<i class="fa fa-long-arrow-right black" aria-hidden="true" /></Link>
        }
        const navigate = <div className="posts-navigate"> {prev} {next} </div>
        posts.push(navigate)
        return (
            <div class="content">{posts}</div>
        )
    }
}

export default Posts