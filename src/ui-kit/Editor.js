import React,{Component} from 'react'
import PropTypes from 'prop-types'
//components
import ReactQuill from 'react-quill'
import {MarkdownView} from 'ui-kit'

class Editor extends Component {
  static propTypes = {
    //func must accept a string as an argument:
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired, //redux state
  }

  handleChange = this.props.handleChange

  render () {
      // font-size: 16 below so that mobile iOS won't zoom (font-size => 14px)
    return (
      <ReactQuill
        theme={'snow'}
        onChange={this.handleChange}
        value={this.props.value}
        modules={Editor.modules}
        formats={Editor.formats}
        placeholder={this.props.placeholder}
       >
         <div style={{fontSize:16}}></div>
      </ReactQuill>
     )
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ 'header': [1, 2, false] },],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
  ]
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]


 export default Editor
