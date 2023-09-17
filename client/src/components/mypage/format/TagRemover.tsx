import { FC } from "react";
// import DOMPurify from "dompurify";

interface Props {
  content: string;
}
const TagRemover: FC<Props> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
  // return (
  //   <div
  //     style={{
  //       whiteSpace: "normal",
  //     }}
  //     dangerouslySetInnerHTML={{
  //       __html: DOMPurify.sanitize(String(content)),
  //     }}
  //   />
  // );
};

export default TagRemover;
