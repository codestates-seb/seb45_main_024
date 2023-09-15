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
import { useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { ProfileState } from "../../redux/mypage/profileSlice";
import authInstance from "../../utility/authInstance";

interface ProfileFormData {
  accountId: number;
  coverLetter?: string;
  softSkills?: string[];
  hardSkills?: string[];
  projectDetails?: {
    projectTitle?: string;
    projectUrl?: string;
    imageUrl?: string;
  }[];
}

interface Props {
  setProfileFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
}

const WARNING = "주의: 이미 생성된 태그를 클릭하면 태그가 삭제됩니다.";

const CreateProfile: FC<Props> = ({ setProfileFormData }) => {
  const { id } = useParams<{ id: string }>();
  const { profileData } = useAppSelector(
    (state: { profile: ProfileState }) => state.profile
  );
  const [editorValue, setEditorValue] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [projectLink, setProjectLink] = useState<string>("");
  const [projectImage, setProjectImage] = useState<string>("");

  const editorChangeHandler = (value: string) => {
    setEditorValue(value);
  };

  // 이하 코드 리팩토링 필수!
  const [softInput, setSoftInput] = useState("");
  const [hardInput, setHardInput] = useState("");

  const [softTags, setSoftTags] = useState<string[]>([]);
  const [hardTags, setHardTags] = useState<string[]>([]);
  const [techTags, setTechTags] = useState<object[]>([]);
  const [projTags, setProjTags] = useState<string[]>([]);
  const [projSet, setProjSet] = useState<object[]>([]);

  // 초기값 설정
  useEffect(() => {
    if (profileData) {
      if (profileData.coverLetter) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(
          profileData.coverLetter,
          "text/html"
        );
        setEditorValue(doc.body.textContent || "");
      }
      setSoftTags((prevSoftTags) =>
        profileData.softSkills
          ? [...new Set([...prevSoftTags, ...profileData.softSkills])]
          : prevSoftTags
      );
      setHardTags((prevHardTags) =>
        profileData.hardSkills
          ? [...new Set([...prevHardTags, ...profileData.hardSkills])]
          : prevHardTags
      );
      setProjTags((prevProjectTags) =>
        profileData.projectDetails
          ? [
              ...new Set([
                ...prevProjectTags,
                ...profileData.projectDetails.map(
                  (project: any) => project.projectTitle
                ),
              ]),
            ]
          : prevProjectTags
      );
    }
  }, [profileData]);

  // 태그에서 마지막 한글자씩 추가되는 문제 해결
  const softInputRef = useRef(softInput);
  const hardInputRef = useRef(hardInput);
  softInputRef.current = softInput;
  hardInputRef.current = hardInput;

  const softTagsRef = useRef(softTags);
  const hardTagsRef = useRef(hardTags);

  softTagsRef.current = softTags;
  hardTagsRef.current = hardTags;

  // 엔터키 누르면 태그 추가
  const handleSoftEnterPress = (e: KeyboardEvent) => {
    if (e.code === "Enter" && softInputRef.current.length > 0) {
      setSoftTags([...softTagsRef.current, softInputRef.current]);
      setSoftInput("");
    }
  };
  const handleHardEnterPress = (e: KeyboardEvent) => {
    if (e.code === "Enter" && hardInputRef.current.length > 0) {
      setHardTags([...hardTagsRef.current, hardInputRef.current]);
      setHardInput("");
    }
  };

  // 태그 삭제
  const softTagDeleteHandler = (id: number) => {
    const updatedTags = softTags.filter((_, index) => index !== id);
    setSoftTags(updatedTags);
  };
  const hardTagDeleteHandler = (id: number) => {
    const updatedTags = hardTags.filter((_, index) => index !== id);
    setHardTags(updatedTags);
  };
  const projTagDeleteHandler = (id: number) => {
    const updatedTags = projTags.filter((_, index) => index !== id);
    setProjTags(updatedTags);
  };

  // keyup event 감지
  useEffect(() => {
    window.addEventListener("keyup", handleSoftEnterPress);
    return () => window.removeEventListener("keyup", handleSoftEnterPress);
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleHardEnterPress);
    return () => window.removeEventListener("keyup", handleHardEnterPress);
  }, []);

  // 리퀘스트 바디에 넣을 데이터
  useEffect(() => {
    setProfileFormData({
      accountId: Number(id),
      coverLetter: editorValue,
      softSkills: softTags,
      hardSkills: hardTags,
      projectDetails: projSet,
    });
  }, [editorValue, softTags, hardTags, projSet]);

  return (
    <form className={classes.createForm}>
      <section className={classes.formItem}>
        <TitleLine title={ProfileCats.BIO} />
        <QuillEditor
          onChange={editorChangeHandler}
          initialValue={editorValue}
        />
      </section>
      <section className={classes.formItem}>
        <TitleLine title={ProfileCats.TECH} />
        <div className={classes.helpTextContainer}>
          <p className={classes.helpText}>
            자신이 사용할 수 있는 기술 종류를 선택해주세요.
          </p>
          <p className={`${classes.helpText} ${classes.warning}`}>{WARNING}</p>
        </div>
        <TechTags techTags={techTags} setTechTags={setTechTags} />
        {/* {techTags.map((techTag, index) => (
          <SoftTag key={index} techName={techTag} id={index} />
        ))} */}
        {/* <PlusBtn>
          <HardInput input={techInput} setInput={setTechInput} />
        </PlusBtn> */}
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
            projSet={projSet}
            setProjSet={setProjSet}
          />
        </PlusBtn>
      </section>
    </form>
  );
};

export default CreateProfile;
