import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { UserListDataType } from "../../model/boardTypes";
import CardEditor from "../../components/userlist/CardEditor";

const EditCard = () => {
  const navigate = useNavigate();
  const { usercardId } = useParams() as { usercardId: string };

  const userCardList = useAppSelector(state => state.users.data);

  const [originCard, setOriginCard] = useState<UserListDataType>();

  useEffect(() => {
    const targetCard = userCardList.find(
      card => card.teamBoardId === +usercardId,
    );
    if (targetCard) {
      setOriginCard(targetCard);
    } else {
      alert("존재하지 않는 카드입니다.");
      navigate("/userlist", { replace: true });
    }
  }, [usercardId, userCardList]);

  return (
    <>{originCard && <CardEditor type="EDIT_CARD" originCard={originCard} />}</>
  );
};

export default EditCard;
