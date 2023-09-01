import { FC } from "react";
import SideMenu from "../../components/mypage/Sidemenu";

// sidemenu에서 설정한 메뉴 상태에 따라서 main에 보여줄 컴포넌트 변경
const Mypage:FC = () => {
    return (
        <div>
            <SideMenu />
            <main>
                {/* <Summary /> */} 
                {/* <Profile /> */}
                {/* <Review /> */}
            </main>
        </div>
    )
}

export default Mypage;  