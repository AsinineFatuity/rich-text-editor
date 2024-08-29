/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function SelfHosted() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [valuesToInterpolate, setValuesToInterpolate] = useState({
    tenant_name: "John Doe",
    date: new Date().toDateString(),
    property_name: "Mwabe House",
    unit: "DE3",
  });
  const [defaultText, setDefaultText] = useState("<div><div>Hello {tenant_name}. I want to welcome you to my property {property_name}.</div><br><div>Signed,</div><br><div>ALM Properties,</div><br><div>{date}</div></div>")
  return (
    <>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={defaultText}
        init={{
          height: 500,
          width: 1000,
          menubar: true,
          statusbar:false,
          promotion:false,
          setup: (editor) => {
            const interpolateValues = (content) => {
              let interpolatedContent = content.replace(
                /\{(\w+)\}/g,
                (match, p1) => valuesToInterpolate[p1] || match
              );
              return interpolatedContent
            };
            editor.ui.registry.addButton("previewCustom", {
              text: "Preview",
              icon: "preview",
              onAction: () => {
                const content = editor.getContent();
                const interpolatedContent = interpolateValues(content);
                const previewWindow = window.open(
                  "",
                  "_blank",
                  "width=800, height=600"
                );
                previewWindow.document.write(interpolatedContent);
                previewWindow.document.close();
              },
            });
          },
          plugins: [
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "image",
            "link",
            "lists",
            "searchreplace",
            "table",
            "wordcount",
            "help",
          ],
          toolbar:
            "previewCustom undo redo | blocks fontfamily fontsize | " +
            "bold italic underline forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat charmap | help | link table image",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Save Template</button>
    </>
  );
}
