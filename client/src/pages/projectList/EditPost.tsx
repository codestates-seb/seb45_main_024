import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectListDataType } from "../../model/boardTypes";
import { useAppSelector } from "../../redux/hooks";
import PostEditor from "../../components/projectlist/PostEditor";

const EditPost = () => {
  const navigate = useNavigate();

  const projectList = useAppSelector(state => state.projects.data);
  console.log("✅ PROJECT LIST", projectList);

  const { projectId } = useParams() as { projectId: string };

  const [originPost, setOriginPost] = useState<ProjectListDataType>();
  console.log("✅ ORIGIN POST", originPost);

  useEffect(() => {
    const targetPost = projectList.find(
      list => list.memberBoardId === +projectId,
    );

    if (targetPost) {
      setOriginPost(targetPost);
    } else {
      alert("존재하지 않는 게시글입니다.");
      navigate("/projectlist", { replace: true });
    }
  }, [projectId, projectList]);

  return (
    <>{originPost && <PostEditor isEdit={true} originPost={originPost} />}</>
  );
};

export default EditPost;
