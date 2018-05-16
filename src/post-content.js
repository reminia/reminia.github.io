import React, { Component } from 'react'
import { issueUri, gaRecord } from './api.js'
import marked from 'marked'
import 'github-markdown-css'
import hljs from 'highlight.js'

class PostContent extends Component {

    match = this.props.match.params
    state = { content: "" }
    title = this.props.location.state.title
    url = this.props.location.state.url

    componentDidMount() {
        gaRecord(this.title)
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        });
        fetch(issueUri + this.match.id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(resp => { return resp.json() })
            .then(issue => {
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