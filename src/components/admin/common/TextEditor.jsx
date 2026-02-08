import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TextEditor = ({ value, onChange, placeholder }) => {
  return (
    <div className="prose max-w-none custom-ckeditor">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          placeholder: placeholder || 'Write something here...',
          toolbar: {
            items: [
              'heading', '|',
              'bold', 'italic', 'link', '|',
              'bulletedList', 'numberedList', '|',
              'blockQuote', 'insertTable', 'mediaEmbed', '|',
              'undo', 'redo'
            ],
            shouldNotGroupWhenFull: true 
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default TextEditor;