import classes from "./UserList.module.css";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";
import { ReactComponent as SearchSvg } from "../../assets/icons/search.svg";

const UserList = () => {
  return (
    <>
      <ActionButton>카드 작성하기</ActionButton>
      <SearchInput placeholder="제목, 키워드 등을 검색해보세요.">
        <SearchSvg stroke="var(--color-gray-4)" />
      </SearchInput>
      {/* <div>
        <div>필터영역</div>
        <div>검색창</div>
      </div> */}
      <div>{/* <Card /> */}</div>
      {/* <div>pagination</div> */}
    </>
  );
};

export default UserList;
