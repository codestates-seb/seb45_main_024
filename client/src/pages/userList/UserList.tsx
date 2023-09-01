import classes from "./UserList.module.css";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import KewordTag from "../../components/userlist,projectlist/KewordTag";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";
import { ReactComponent as CancelSvg } from "../../assets/icons/cancel.svg";

const UserList = () => {
  return (
    <>
      <ActionButton>카드 작성하기</ActionButton>
      <SearchInput placeholder="제목, 키워드 등을 검색해보세요.">
        <SearchSvg stroke="var(--color-gray-4)" />
      </SearchInput>

      {/* 키워드 태그에는 하드코딩된 값이 아니라 입력값이 들어가야 함 */}
      <KewordTag text="포트폴리오">
        <CancelSvg stroke="var(--color-main)" />
      </KewordTag>
    </>
  );
};

export default UserList;
