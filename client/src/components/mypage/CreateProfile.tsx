import { FC } from "react";
import TechTags from "./TechTags";

const WARNING = "주의: 이미 생성된 태그를 클릭하면 태그가 삭제됩니다.";

// 컴포넌트 분리 없이 작업 후 분리 예정

const CreateProfile: FC = () => {
  // edit 클릭하면 get으로 기술 스택 정보도 받아와야. -> Techtag 컴포넌트로 분리
  // post로 보내는 api call도 있음. req body 구조 알아야.

  return (
    <form>
      <div>
        <label>저는 이런 사람이에요.</label>
        <input
          type="textarea"
          placeholder="자신을 잘 표현할 수 있는 자기소개를 작성해주세요. 경력사항 기재 시에는 회사명, 직군, 재직기간을 포함해주세요."
        />
      </div>
      <div>
        <label>기술 스택</label>
        <div>
          <p>
            자신이 사용할 수 있는 기술 종류를 선택해주세요. 만약, 여기에 없다면
            더하기 버튼으로 클릭할 수 있습니다.
          </p>
          <p>{WARNING}</p>
        </div>
        <TechTags />
      </div>
      <div>
        <label>하드 스킬</label>
        <div>
          <p>
            더하기 버튼을 클릭하여 프로그래밍 기술 외에 내가 가지고 있는 하드
            스킬을 추가해주세요.
          </p>
          <p>{WARNING}</p>
        </div>
        <input />
      </div>
      <div>
        <label>소프트 스킬</label>
        <div>
          <p>
            더하기 버튼을 클릭하여 내가 가진 소프트 스킬 역량을 작성해주세요.
          </p>
          <p>{WARNING}</p>
        </div>
        <input />
      </div>
      <div>
        <label>참여한 프로젝트</label>
        <div>
          <p>
            더하기 버튼을 클릭하여 지금까지 내가 참여한 프로젝트를 입력할 수
            있습니다.
          </p>
          <p>{WARNING}</p>
        </div>
        <input />
      </div>
    </form>
  );
};

export default CreateProfile;
