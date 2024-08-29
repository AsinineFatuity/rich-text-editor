/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./selfHosted.css"
export default function SelfHosted() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const downloadDocument = async () => {
    const htmlToDocx = await import('html-to-docx');
    if (editorRef.current) {
      const content = editorRef.current.getContent();

      // Wrap the content in a basic HTML template for Word
      const contentHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Document</title>
        </head>
        <body>
          ${content}
        </body>
        </html>
      `;

      // Convert HTML to .docx format
      const docxBlob = await htmlToDocx(contentHtml, null, {
        orientation: 'portrait',
        margins: { top: 720, right: 720, bottom: 720, left: 720 },
      });

      // Create a download link and trigger it
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(docxBlob);
      downloadLink.download = 'document.docx';
      downloadLink.click();
    }
  };
  const [valuesToInterpolate, setValuesToInterpolate] = useState({
    tenant_name: "John Doe",
    date: new Date().toDateString(),
    property_name: "Mwabe House",
    unit: "DE3",
  });
  const [defaultText, setDefaultText] = useState(
    "<div><div>Hello {tenant_name}. I want to welcome you to my property {property_name}.</div><br><div>Signed,</div><br><div>ALM Properties,</div><br><div>{date}</div></div>"
  );
  const interpolateValues = (content) => {
    let interpolatedContent = content.replace(
      /\{(\w+)\}/g,
      (match, p1) => valuesToInterpolate[p1] || match
    );
    return interpolatedContent;
  };
  return (
    <div className="container">
      <div className="main-content">
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue={defaultText}
          init={{
            height: 500,
            menubar: true,
            statusbar: false,
            promotion: false,
            setup: (editor) => {
              editor.ui.registry.addButton('previewCustom', {
                text: 'Preview',
                icon: 'preview',
                onAction: () => {
                  const content = editor.getContent();
                  const interpolatedContent = interpolateValues(content);
                  const previewWindow = window.open(
                    '',
                    '_blank',
                    'width=800,height=600'
                  );
                  previewWindow.document.write(interpolatedContent);
                  previewWindow.document.close();
                },
              });
              editor.ui.registry.addButton('download', {
                text: 'Download',
                onAction: downloadDocument,
              });
            },
            plugins: [
              'anchor',
              'autolink',
              'charmap',
              'codesample',
              'link',
              'lists',
              'searchreplace',
              'table',
              'wordcount',
              'help',
            ],
            toolbar:
              'previewCustom download undo redo | blocks fontfamily fontsize | ' +
              'bold italic underline forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat charmap | help | link table',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
        <div className="card">
          <h3>Variables</h3>
          <ul>
            <li>Variable 1</li>
            <li>Variable 2</li>
            <li>Variable 3</li>
          </ul>
        </div>
      </div>
      <button className="save-button" onClick={log}>Save Template</button>
    </div>
  );
}
