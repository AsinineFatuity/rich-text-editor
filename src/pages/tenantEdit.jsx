/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./selfHosted.css"
import _ from 'lodash'
export default function TenantEditDocument() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const [valuesToInterpolate, setValuesToInterpolate] = useState({
    tenant_name: "John Doe",
    today_date: new Date().toDateString(),
    property_name: "Mwabe House",
    unit: "DE3",
  });
  const [validVariables, setValidVariables] = useState(['tenant_name','today_date', 'property_name','unit'])
  const [defaultText, setDefaultText] = useState(
    "<div><div>Hello {tenant_name}. I want to welcome you to my property {property_name}.</div><br><div>Signed,</div><br><div>ALM Properties,</div><br><div>{today_date}</div></div>"
  );
  const interpolateValues = (content) => {
    let interpolatedContent = content.replace(
      /\{(\w+)\}/g,
      (match, p1) => valuesToInterpolate[p1] || match
    );
    return interpolatedContent;
  };

  const previewTenantDocument = () => {
    const content = editorRef.current.getContent();
    const interpolatedContent = interpolateValues(content);
    const previewWindow = window.open(
      '',
      '_blank',
      'width=800,height=600'
    );
    previewWindow.document.write(interpolatedContent);
    previewWindow.document.close();
  }
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
            readonly: true,
            setup: (editor) => {
              editor.on('init', () => {
                setTimeout(()=>{editor.mode.set('readonly')}, 10)
              });
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
          <h5>Valid Variables</h5>
          <ul>
            {validVariables.map( (variable, index)=> (
              <li key={index}><code>{variable}</code></li>
            ))}
          </ul>
        </div>
      </div>
      <form className="side-content">
        <h5>Enter The Following Values To Complete Document</h5>
        {validVariables.map((variable, index) => (
            <div key={index} className="form-group">
                <label htmlFor={variable}>{_.startCase(variable)}</label>&nbsp;
                <input
                type="text"
                id={variable}
                name={variable}
                value={valuesToInterpolate[variable]}
                onChange={(e) => {
                    setValuesToInterpolate({
                    ...valuesToInterpolate,
                    [variable]: e.target.value,
                    });
                }}
                />
            </div>
            ))}
      </form>
      <button className="save-button" onClick={previewTenantDocument}>Preview Document</button>
      <button className="save-button" onClick={log}>Save Template (Check Console Log)</button>
    </div>
  );
}
