/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function SelfHosted() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [valuesToInterpolate, setValuesToInterpolate] = useState({
    tenant_name: "John Doe",
    date: new Date(),
    property_name: "Mwabe House"
  })
  return (
    <>
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        licenseKey='gpl'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue='<p>Create your tenant agreement document here.</p>'
        init={{
          height: 500,
          width: 1000,
          menubar: false,
          setup: (editor)=>{
            const interpolateValues = (content) => {
              return content.replace(/\{(\w+)\}/g, (match, p1) => valuesToInterpolate[p1] || match);
            }
            editor.ui.registry.addButton('preview', {
              text: 'Preview',
              onAction: () => {
                const content = editor.getContent();
                const interpolatedContent = interpolateValues(content);
                const previewWindow = window.open("", "_blank", "width=800, height=600");
                previewWindow.document.write(interpolatedContent);
                previewWindow.document.close();
                console.log("actually ran")
              }
            })
          },
          plugins: [
            'anchor', 'preview', 'autolink', 'charmap', 'codesample', 'image', 'link', 
            'lists', 'searchreplace', 'table', 'wordcount', 'help'
          ],
          toolbar: 'preview undo redo | blocks fontfamily fontsize | ' +
            'bold italic underline forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat charmap | help | link table image',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}