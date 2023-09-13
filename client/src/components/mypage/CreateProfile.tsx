import { FC, useState, useEffect, useRef } from "react";
import TechTags from "./TechTags";
import classes from "./CreateProfile.module.css";
import Addproj from "./Addproj";
import QuillEditor from "./QuillEditor";
import TitleLine from "./TitleLine";
import ProfileCats from "./ProfileCats";
import PlusBtn from "./PlusBtn";
import SoftInput from "./SoftInput";
import SoftTag from "./SoftTag";
import HardInput from "./HardInput";
// import DropDownTag from "./DropDownTag";
import { fetchProfileData } from "../../redux/mypage/profileSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";

const WARNING = "주의: 이미 생성된 태그를 클릭하면 태그가 삭제됩니다.";

const CreateProfile: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { profileData, status } = useAppSelector((state) => state.profile);
  const [editorValue, setEditorValue] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [projectLink, setProjectLink] = useState<string>("");
  const [projectImage, setProjectImage] = useState<string>("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfileData(id));
    }
  }, [dispatch]);

  const editorChangeHandler = (value: string) => {
    setEditorValue(value);
  };

  // 이하 코드 리팩토링 필수!
  const [softInput, setSoftInput] = useState("");
  const [hardInput, setHardInput] = useState("");
  const [techInput, setTechInput] = useState("");

  const [softTags, setSoftTags] = useState<string[]>([]);
  const [hardTags, setHardTags] = useState<string[]>([]);
  const [techTags, setTechTags] = useState<string[]>([]);
  const [projTags, setProjTags] = useState<string[]>([]);

  // 초기값 설정
  useEffect(() => {
    if (profileData) {
      setSoftTags(profileData.softSkills);
      setHardTags(profileData.hardSkills);
      const projectTags = profileData.projectDetails.map((proj, index) => ({
        projectName: proj.projectTitle,
        projectLink: proj.projectUrl,
        projectImage: proj.imageUrl,
      }));
      setProjTags(projectTags);
    }
  }, [profileData]);

  const softInputRef = useRef(softInput);
  const hardInputRef = useRef(hardInput);
  const techInputRef = useRef(techInput);
  softInputRef.current = softInput;
  hardInputRef.current = hardInput;
  techInputRef.current = techInput;

  const softTagsRef = useRef(softTags);
  const hardTagsRef = useRef(hardTags);
  const techTagsRef = useRef(techTags);
  softTagsRef.current = softTags;
  hardTagsRef.current = hardTags;
  techTagsRef.current = techTags;

  const handleSoftEnterPress = (e: KeyboardEvent) => {
    if (e.code === "Enter" && softInputRef.current.length > 0) {
      console.log("hello", softInputRef.current);
      setSoftTags([...softTagsRef.current, softInputRef.current]);
      setSoftInput("");
    }
  };

  const handleHardEnterPress = (e: KeyboardEvent) => {
    if (e.code === "Enter" && hardInputRef.current.length > 0) {
      console.log("hello", hardInputRef.current);
      setHardTags([...hardTagsRef.current, hardInputRef.current]);
      setHardInput("");
    }
  };
  const handleTechEnterPress = (e: KeyboardEvent) => {
    if (e.code === "Enter" && techInputRef.current.length > 0) {
      console.log("hello", techInputRef.current);
      setTechTags([...techTagsRef.current, techInputRef.current]);
      setTechInput("");
    }
  };

  const softTagDeleteHandler = (id: number) => {
    const updatedTags = softTags.filter((_, index) => index !== id);
    setSoftTags(updatedTags);
  };
  const hardTagDeleteHandler = (id: number) => {
    const updatedTags = hardTags.filter((_, index) => index !== id);
    setHardTags(updatedTags);
  };
  const techTagDeleteHandler = (id: number) => {
    const updatedTags = techTags.filter((_, index) => index !== id);
    setTechTags(updatedTags);
  };

  const projTagDeleteHandler = (id: number) => {
    const updatedTags = projTags.filter((_, index) => index !== id);
    setProjTags(updatedTags);
  };

  useEffect(() => {
    window.addEventListener("keyup", handleSoftEnterPress);
    return () => window.removeEventListener("keyup", handleSoftEnterPress);
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleHardEnterPress);
    return () => window.removeEventListener("keyup", handleHardEnterPress);
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleTechEnterPress);
    return () => window.removeEventListener("keyup", handleTechEnterPress);
  }, []);

  return (
    <form className={classes.createForm}>
      <section className={classes.formItem}>
        <TitleLine title={ProfileCats.BIO} />
        <QuillEditor
          onChange={editorChangeHandler}
          // 초기값 설정
          initialValue={profileData.coverLetter || ""}
        />
      </section>
      <section className={classes.formItem}>
        <TitleLine title={ProfileCats.TECH} />
        <div className={classes.helpTextContainer}>
          <p className={classes.helpText}>
            자신이 사용할 수 있는 기술 종류를 선택해주세요. 만약, 여기에 없다면
            더하기 버튼으로 클릭할 수 있습니다.
          </p>
          <p className={`${classes.helpText} ${classes.warning}`}>{WARNING}</p>
        </div>
        <TechTags />
        {techTags.map((techTag, index) => (
          <SoftTag
            key={index}
            techName={techTag}
            id={index}
            onDelete={techTagDeleteHandler}
          />
        ))}
        <PlusBtn>
          <HardInput input={techInput} setInput={setTechInput} />
        </PlusBtn>
      </section>
      <section className={classes.formItem}>
        <TitleLine title={ProfileCats.HARD} />
        <div className={classes.helpTextContainer}>
          <p className={classes.helpText}>
            더하기 버튼을 클릭하여 프로그래밍 기술 외에 내가 가지고 있는 하드
            스킬을 추가해주세요.
          </p>
          <p className={`${classes.helpText} ${classes.warning}`}>{WARNING}</p>
        </div>
        {hardTags.map((hardTag, index) => (
          // api 명세 바뀌면 수정 필요
          // <DropDownTag
          //   key={index}
          //   techName={hardTag}
          //   id={index}
          //   onDelete={hardTagDeleteHandler}
          // />
          <SoftTag
            key={index}
            techName={hardTag}
            id={index}
            onDelete={hardTagDeleteHandler}
          />
        ))}
        <PlusBtn>
          <HardInput input={hardInput} setInput={setHardInput} />
        </PlusBtn>
      </section>
      <section className={classes.formItem}>
        <TitleLine title={ProfileCats.SOFT} />
        <div className={classes.helpTextContainer}>
          <p className={classes.helpText}>
            더하기 버튼을 클릭하여 내가 가진 소프트 스킬 역량을 작성해주세요.
          </p>
          <p className={`${classes.helpText} ${classes.warning}`}>{WARNING}</p>
        </div>
        {softTags.map((softTag, index) => (
          <SoftTag
            key={index}
            techName={softTag}
            id={index}
            onDelete={softTagDeleteHandler}
          />
        ))}
        <PlusBtn>
          <SoftInput input={softInput} setInput={setSoftInput} />
        </PlusBtn>
      </section>
      <section className={classes.formItem}>
        <TitleLine title={ProfileCats.PROJ} />
        <div className={classes.helpTextContainer}>
          <p className={classes.helpText}>
            더하기 버튼을 클릭하여 지금까지 내가 참여한 프로젝트를 입력할 수
            있습니다.
          </p>
          <p className={`${classes.helpText} ${classes.warning}`}>{WARNING}</p>
        </div>
        {projTags.map((projTag, index) => (
          <SoftTag
            key={index}
            techName={projTag}
            id={index}
            onDelete={projTagDeleteHandler}
          />
        ))}
        <PlusBtn>
          <Addproj
            projectName={projectName}
            setProjectName={setProjectName}
            projectLink={projectLink}
            setProjectLink={setProjectLink}
            projectImage={projectImage}
            setProjectImage={setProjectImage}
            projTags={projTags}
            setProjTags={setProjTags}
          />
        </PlusBtn>
      </section>
    </form>
  );
};

export default CreateProfile;
