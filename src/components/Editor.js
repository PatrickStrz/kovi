import React,{Component} from 'react'
import ReactQuill from 'react-quill'

// class Quill extends Component {
//   // constructor(props) {
//   //   super(props)
//   //   this.state = { text: '' }
//   // }
//   state = {text: ''}
//
//   handleChange(value) {
//     this.setState({ text: value })
//   }
//
//   render() {
//     return(
//     <div>
//       <ReactQuill theme="snow" />
//     </div>
//
//     )
//   }
// }
//
// export default Quill

/*
 * Simple editor component that takes placeholder text as a prop
 */
class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (html) {
  	this.setState({ editorHtml: html });
  }

  render () {
    console.log(this.props)
    return (
      <ReactQuill
        theme={'snow'}
        onChange={this.handleChange}
        value={this.state.editorHtml}
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

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: React.PropTypes.string,
}

/*
 * Render component on page
 */

 export default Editor
