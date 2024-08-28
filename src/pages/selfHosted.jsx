import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function SelfHosted() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        licenseKey='gpl'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue='<p>This is the initial content of the editor.</p>'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'anchor', 'preview', 'autolink', 'charmap', 'codesample', 'image', 'link', 
            'lists', 'searchreplace', 'table', 'wordcount', 'checklist', 'casechange', 
            'export', 'pageembed', 'linkchecker', 'a11ychecker', 'tinymcespellchecker', 
            'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 
            'advtemplate', 'mentions', 'tinycomments', 'tableofcontents', 'mergetags', 
            'autocorrect', 'typography', 'inlinecss'
          ],
          toolbar: 'preview undo redo | blocks fontfamily fontsize | ' +
            'bold italic underline forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat charmap | help | link table mergetagsimage| | spellcheckdialog a11ycheck typography |',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}