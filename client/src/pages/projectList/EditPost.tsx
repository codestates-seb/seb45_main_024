import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { ProjectListDataType } from "../../model/boardTypes";
import PostEditor from "../../components/projectlist/PostEditor";

const EditPost = () => {
  const navigate = useNavigate();

  const projectList = useAppSelector(state => state.projects.data);

  const { id } = useParams();
  const paramId = parseInt(id);

  const [originPost, setOriginPost] = useState<ProjectListDataType>();
  console.log(originPost);

  useEffect(() => {
    const targetPost = projectList.find(list => list.memberBoardId === paramId);
    if (targetPost) {
      setOriginPost(targetPost);
    } else {
      alert("존재하지 않는 게시글입니다.");
      navigate("/projectlist", { replace: true });
    }
  }, [paramId, projectList]);

  return (
    <>{originPost && <PostEditor isEdit={true} originPost={originPost} />}</>
  );
};

export default EditPost;
