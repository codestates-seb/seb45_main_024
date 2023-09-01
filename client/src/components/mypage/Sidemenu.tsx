import { FC } from "react";
import { useDispatch } from "react-redux";
import { changeMenu } from "../../redux/menuSlice";

// menu 클릭 시에 state 변경
const SideMenu:FC = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <div>프로필 박스</div>
            <div>
                <ul>
                    <li onClick={()=> dispatch(changeMenu('Summary'))}>Summary</li>
                    <li onClick={()=> dispatch(changeMenu('Profile'))}>Profile</li>
                    <li onClick={()=> dispatch(changeMenu('Review'))}>Peer Review</li>
                </ul>
            </div>
            <a>회원탈퇴</a>
        </div>
    ) 
}
export default SideMenu;