/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { url } from "../urls";
import { Editor } from "@tinymce/tinymce-react";
import "./selfHosted.css"
import _ from 'lodash'
export default function SelfHosted() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const navigate = useNavigate();
  const downloadDocument = async () => {
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

      //send this to backend  for conversion then returned to frontend
      // we will interpolate before we send
      console.log(`The HTML will be sent to backend: ${contentHtml}`)
    }
  };
  const [valuesToInterpolate, setValuesToInterpolate] = useState({
    tenant_name: "John Doe",
    date_today: new Date().toDateString(),
    property_name: "Mwabe House",
    unit: "DE3",
    landlord_signature: "<img src='https://imgbly.com/ib/l9yTdKPPRE.png' width='40' height='13' alt='landlordSignature'>",
  });
  const [validVariables, setValidVariables] = useState(['tenant_name','date_today', 'property_name','unit', 'landlord_signature'])
  const [defaultText, setDefaultText] = useState(
    "<div><div>Hello {tenant_name}. I want to welcome you to my property {property_name}.</div><br><div>Signed,</div><br><div>ALM Properties,</div><div>{landlord_signature}</div><br><div>{date_today}</div></div>"
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
            menubar: false,
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
              'image'
            ],
            toolbar:
              'previewCustom download undo redo | blocks fontfamily fontsize | ' +
              'bold italic underline forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat charmap | help | link table image',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
        <div className="card">
          <h5>Valid Variables</h5>
          <ul>
            {validVariables.map( (variable, index)=> (
              <li key={index}><code>{variable}</code></li>
            ))}
          </ul>
          <br />
          <button onClick={()=>{navigate(url.tenantEdit)}}>Go To Tenant</button>
        </div>
      </div>
      <button className="save-button" onClick={log}>Save Template (Check Console Log)</button>
    </div>
  );
}
