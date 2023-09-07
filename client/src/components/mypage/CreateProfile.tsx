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

const WARNING = "주의: 이미 생성된 태그를 클릭하면 태그가 삭제됩니다.";

const CreateProfile: FC = () => {
  // edit 클릭하면 get으로 기술 스택 정보도 받아와야. -> Techtag 컴포넌트로 분리
  // post로 보내는 api call도 있음. req body 구조 알아야.
  //SoftTag 생성.

  const [softInput, setSoftInput] = useState("");
  const [softTags, setSoftTags] = useState<string[]>([]);

  const softInputRef = useRef(softInput);
  softInputRef.current = softInput;

  const softTagsRef = useRef(softTags);
  softTagsRef.current = softTags;

  const handleEnterPress = (e: KeyboardEvent) => {
    if (e.code === "Enter" && softInputRef.current.length > 0) {
      console.log("hello", softInputRef.current);
      setSoftTags([...softTagsRef.current, softInputRef.current]);
      setSoftInput("");
    }
  };

  const tagDeleteHandler = (id: number) => {
    const updatedTags = softTags.filter((_, index) => index !== id);
    setSoftTags(updatedTags);
  };

  useEffect(() => {
    window.addEventListener("keyup", handleEnterPress);
    return () => window.removeEventListener("keyup", handleEnterPress);
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
        {/* <PlusBtn /> */}
      </section>
      <section className={classes.formItem}>
        <TitleLine title={ProfileCats.SOFT} />
        <div className={classes.helpTextContainer}>
          <p className={classes.helpText}>
            더하기 버튼을 클릭하여 내가 가진 소프트 스킬 역량을 작성해주세요.
          </p>
          <p className={`${classes.helpText} ${classes.warning}`}>{WARNING}</p>
        </div>
        {/* SoftSkill Tags Here! */}
        {softTags.map((softTag, index) => (
          <SoftTag
            key={index}
            techName={softTag}
            id={index}
            onDelete={tagDeleteHandler}
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
