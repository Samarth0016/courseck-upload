"use client";

import React, { useState } from "react";
import { Editor, EditorState, ContentState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css"; // Ensure Draft.js CSS is included for proper styling

interface MyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MyEditor: React.FC<MyEditorProps> = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(() =>
    value
      ? EditorState.createWithContent(
          ContentState.createFromText(value) // Initialize with existing value
        )
      : EditorState.createEmpty()
  );

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const plainText = state.getCurrentContent().getPlainText();
    onChange(plainText); // Update the form state with plain text
  };

  return (
    <div className="border rounded-md p-2 bg-white">
      {/* To-do Add more functionality */}
      <Editor editorState={editorState} onChange={handleEditorChange} />
    </div>
  );
};

export default MyEditor;
