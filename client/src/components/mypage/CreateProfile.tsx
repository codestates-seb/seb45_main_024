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
import DropDownTag from "./DropDownTag";

const WARNING = "주의: 이미 생성된 태그를 클릭하면 태그가 삭제됩니다.";

const CreateProfile: FC = () => {
  // edit 클릭하면 get으로 기술 스택 정보도 받아와야. -> Techtag 컴포넌트로 분리
  // post로 보내는 api call도 있음. req body 구조 알아야.

  const [softInput, setSoftInput] = useState("");
  const [hardInput, setHardInput] = useState("");
  // const [projInput, setProjInput] = useState("");
  // const [techInput, setTechInput] = useState(""); -> 이거 우짤건지 정해야 함.
  const [softTags, setSoftTags] = useState<string[]>([]);
  const [hardTags, setHardTags] = useState<string[]>([]);
  // const [projTags, setProjTags] = useState<string[]>([]);
  const softInputRef = useRef(softInput);
  const hardInputRef = useRef(hardInput);
  softInputRef.current = softInput;
  hardInputRef.current = hardInput;

  const softTagsRef = useRef(softTags);
  const hardTagsRef = useRef(hardTags);
  softTagsRef.current = softTags;
  hardTagsRef.current = hardTags;

  // 엔터 키 누르는거 하나로 사용할 수 있는 방법 없을까?
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

  const softTagDeleteHandler = (id: number) => {
    const updatedTags = softTags.filter((_, index) => index !== id);
    setSoftTags(updatedTags);
  };
  const hardTagDeleteHandler = (id: number) => {
    const updatedTags = hardTags.filter((_, index) => index !== id);
    setHardTags(updatedTags);
  };

  useEffect(() => {
    window.addEventListener("keyup", handleSoftEnterPress);
    return () => window.removeEventListener("keyup", handleSoftEnterPress);
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleHardEnterPress);
    return () => window.removeEventListener("keyup", handleHardEnterPress);
  }, []);

  return (
    <form className={classes.createForm}>
      <section className={classes.formItem}>
        <TitleLine title={ProfileCats.BIO} />
        <QuillEditor />
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
        {/* <PlusBtn /> */}
        {/* {softTags.map((softTag, index) => (
          <SoftTag
            key={index}
            techName={softTag}
            id={index}
            onDelete={tagDeleteHandler}
          />
        ))} */}
        <PlusBtn>{/* <TechInput />이나 하드스킬 태그 재활용 */}</PlusBtn>
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
          <DropDownTag
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
        <PlusBtn>
          <Addproj />
        </PlusBtn>
      </section>
    </form>
  );
};

export default CreateProfile;
