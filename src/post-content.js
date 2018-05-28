import React, { Component } from 'react'
import { issueUri, gaRecord, parseTitle } from './util.js'
import marked from 'marked'
import 'github-markdown-css'
import hljs from 'highlight.js'

class PostContent extends Component {

    state = { content: "" }
    title = ""

    componentDidMount() {
        const path = window.location.pathname
        const id = path.split('/').pop()
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        });
        fetch(issueUri + id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(resp => { return resp.json() })
            .then(issue => {
                this.title = parseTitle(issue.title).title
                this.url = issue.html_url
                gaRecord(this.title)
                let htmlContent = marked(issue.body)
                const div = <div class="markdown-body" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
                this.setState({ content: div })
            })
    }

    render() {
        return (
            <div class="content post-content">
                <div class="content-title">
                    {this.title + " "}
                    <a href={this.url}>
                        <i class="fa fa-external-link" aria-hidden="true"></i>
                    </a>
                </div>
                {this.state.content}
            </div>
        )
    }
}

export default PostContent