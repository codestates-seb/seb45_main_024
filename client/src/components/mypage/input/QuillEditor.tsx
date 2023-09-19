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
      <ReactQuill
        theme="snow"
        style={{'height': '100px'}}
        value={initialValue ? initialValue : value}
        placeholder="자신을 잘 표현할 수 있는 자기소개를 부탁드려요!
        + 경력사항 기재 시에는 회사명, 직군, 재직기간을 작성해주세요!"
        onChange={changeHandler}
        modules={{
          toolbar: [["underline", "strike"], ["link"], ["clean"]],
        }}
        formats={{
          formats: ["underline", "strike", "link"],
        }}
      />
    </>
  );
};

export default QuillEditor;
