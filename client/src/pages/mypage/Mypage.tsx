import { FC } from "react";
import SideMenu from "../../components/mypage/Sidemenu";
import Review from "../../components/mypage/Review";
import Profile from "../../components/mypage/Profile";
import Summary from "../../components/mypage/Summary";
import { useSelector } from "react-redux";

// sidemenu에서 설정한 메뉴 상태에 따라서 main에 보여줄 컴포넌트 변경
const Mypage:FC = () => {
    const selectedMenu = useSelector((state:any) => state.menu.value);
    // 아직 state type 설정 안함.
    
    return (
        <div>
            <SideMenu />
            <main>
                {selectedMenu ==='Summary' && <Summary />}
                {selectedMenu ==='Profile' && <Profile />}
                {selectedMenu ==='Review' && <Review />}
            </main>
        </div>
    )
}

export default Mypage;  