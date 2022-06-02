import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


class EditorConvertToHTML extends Component {  /* class: 61 part-1 */
    state = {
        editorState: EditorState.createEmpty(),
    }

    onEditorStateChange = (editorState) => {
        this.setState({
        editorState,
        });
        // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        localStorage.setItem("text",draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };

    render() {
        const { editorState } = this.state;
        return (
        <div>
            <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            />
            {/* <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            /> */}
        </div>
        );
    }
}

export default EditorConvertToHTML