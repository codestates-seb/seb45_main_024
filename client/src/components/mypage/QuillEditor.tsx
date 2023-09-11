import { FC, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  onChange: (value: string) => void;
}

const QuillEditor: FC<QuillEditorProps> = ({ onChange }) => {
  const [value, setValue] = useState("");

  const changeHandler = (value: string) => {
    console.log(value);
    setValue(value);
    onChange(value);
  };

  return (
    <>
      <ReactQuill theme="snow" value={value} onChange={changeHandler} />
    </>
  );
};

export default QuillEditor;
