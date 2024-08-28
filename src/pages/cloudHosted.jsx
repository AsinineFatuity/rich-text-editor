import { Editor } from '@tinymce/tinymce-react';
export default function CloudHosted() {
  return (
    <Editor
      apiKey='d43hhoqmvddydtyrsce769ptcb1sj3fgs4jis64fwxlq67xg'
      init={{
        selector: 'textarea',
        plugins: 'anchor preview autolink charmap codesample image link lists searchreplace table wordcount checklist casechange export pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents  mergetags autocorrect typography inlinecss',
        toolbar: 'preview undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}

// Hello {tenant_name}. I want to welcome you to my property {property_name}.

// Signed,

// ALM Properties,

// {date}