import classes from "./UserList.module.css";
import ActionButton from "../../components/userlist,projectlist/ActionButton";
import SearchInput from "../../components/userlist,projectlist/SearchInput";

const UserList = () => {
  return (
    <>
      <ActionButton>카드 작성하기</ActionButton>
      <SearchInput />
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
