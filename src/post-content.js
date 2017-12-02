import React, { Component } from 'react';
import { gistUri } from './api.js';
import showdown from 'showdown'
import 'github-markdown-css'

class PostContent extends Component {

    
    match = this.props.match.params
    state = { content: "" }
    title = this.props.location.state.title
    componentDidMount() {
        console.log(this.props)
        fetch(gistUri + this.match.id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(resp => { return resp.json() })
            .then(gist => {
                const files = gist.files
                for (let file in files) {
                    let converter = new showdown.Converter()
                    let htmlContent = converter.makeHtml(files[file].content)
                    const div = <div class="markdown-body" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
                    this.setState({ content: div })
                }

            })
    }

    render() {
        return (
            <div class="content post-content">
                <div class="content-title"> {this.title} </div>
                {this.state.content}
            </div>
        )
    }
}

export default PostContent