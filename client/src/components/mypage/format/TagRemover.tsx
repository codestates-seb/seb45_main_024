import { FC } from "react";

interface Props {
  content: string;
}
const TagRemover: FC<Props> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default TagRemover;
