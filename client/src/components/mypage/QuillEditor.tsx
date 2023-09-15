import { FC, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
}

const QuillEditor: FC<QuillEditorProps> = ({ onChange, initialValue }) => {
  const [value, setValue] = useState(initialValue || "");

  const changeHandler = (value: string) => {
    setValue(value);
    onChange(value);
  };

  return (
    <>
      <ReactQuill theme="snow" value={initialValue} onChange={changeHandler} />
    </>
  );
};

export default QuillEditor;
