import { createAsyncThunk } from "@reduxjs/toolkit";
import commonInstance from "../../../utility/commonInstance";
import authInstance from "../../../utility/authInstance";
import { UserListDataType } from "../../../model/boardTypes";

interface reqDataType {
  title: string;
  position: string;
  keywords: string[];
  techTagIdList: number[];
}

interface editCardParamsType {
  targetId: string;
  data: reqDataType;
}

interface QueryParamsType {
  currentPage: string;
  currentSize: string;
  currentFilter: string;
  currentSearch: string;
}

/** GET 모든 카드 조회 */
const fetchUserCardList = createAsyncThunk(
  "userlist/fetch",
  async ({
    currentPage,
    currentSize,
    currentFilter,
    currentSearch,
  }: QueryParamsType) => {
    const url = `teamboards/search?page=${currentPage}&size=${currentSize}&title=${currentSearch}&position=${currentFilter}`;

    const response = await commonInstance.get(url);
    // console.log("🚀🚀🚀", url);

    const listData = response.data.data;
    const pageInfo = response.data.pageInfo;

    return { listData, pageInfo };
  },
);

/** GET 카드 조회 */
// ❓ 사용 여부 확인 및 테스트 필요
const getUserCard = createAsyncThunk(
  "usercard/get",
  async (targetId: number) => {
    const response = await authInstance.get(`teamboards/${targetId}`);

    return response.data;
  },
);

/** POST 카드 작성 */
const addUserCard = createAsyncThunk(
  "usercard/add",
  async (data: reqDataType) => {
    const response = await authInstance.post("teamboards", data);

    return response.data;
  },
);

/** PATCH 카드 수정 */
const editUserCard = createAsyncThunk(
  "usercard/edit",
  async ({ targetId, data }: editCardParamsType) => {
    const response = await authInstance.patch(`teamboards/${targetId}`, data);

    return response.data;
  },
);

/** DELETE 카드 삭제 */
const removeUserCard = createAsyncThunk(
  "usercard/remove",
  async (usercard: UserListDataType) => {
    await authInstance.delete(`teamboards/${usercard.teamBoardId}`);

    return usercard;
  },
);

export {
  fetchUserCardList,
  getUserCard,
  addUserCard,
  editUserCard,
  removeUserCard,
};
