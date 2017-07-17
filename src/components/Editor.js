import React,{Component} from 'react'
import PropTypes from 'prop-types'

import ReactQuill from 'react-quill'

class Editor extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    //func must accept a string as an argument
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired, //redux state
  }
  // constructor (props) {
  //   super(props)
  //   this.handleChange = this.props.handleChange
  // }
  handleChange = this.props.handleChange

  render () {
    return (
      <ReactQuill
        theme={'snow'}
        onChange={this.handleChange}
        value={this.props.value}
        modules={Editor.modules}
        formats={Editor.formats}
        placeholder={this.props.placeholder}
       />
     )
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }, { 'font': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
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
