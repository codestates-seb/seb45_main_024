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

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <>
      <ReactQuill
        className="ql-container ql-snow"
        theme="snow"
        style={{ height: "100px", border: "none" }}
        value={initialValue ? initialValue : value}
        placeholder="자신을 잘 표현할 수 있는 자기소개를 부탁드려요!
        + 경력사항 기재 시에는 회사명, 직군, 재직기간을 작성해주세요!"
        onChange={changeHandler}
        modules={modules}
        formats={formats}
      />
    </>
  );
};

export default QuillEditor;
