import { createAsyncThunk } from "@reduxjs/toolkit";
import authInstance from "../../../utility/authInstance";

interface reqPostCommentsType {
  content: string;
  isApply: boolean;
  memberBoardId: string;
}

interface reqEditCommentsType {
  content: string;
  acceptType: number;
}

export interface editCommentParamsType {
  targetId: number;
  data: reqEditCommentsType[];
}

/** GET 모든 댓글 조회 */
const getComments = createAsyncThunk("comment/get", async () => {
  const response = await authInstance.get("replys");

  return response.data;
});

/** POST 댓글 작성 */
const addComment = createAsyncThunk(
  "comment/add",
  async (data: reqPostCommentsType) => {
    const response = await authInstance.post("replys", data);

    return response.data;
  },
);

/** PATCH 댓글 수정 */
const editComment = createAsyncThunk(
  "comment/edit",
  async ({ targetId, data }: editCommentParamsType) => {
    const response = await authInstance.patch(`replys/${targetId}`, data);
    return response.data;
  },
);

/** DELETE 댓글 삭제 */
const removeComment = createAsyncThunk(
  "comment/remove",
  async (targetId: number) => {
    await authInstance.delete(`replys/${targetId}`);

    return targetId;
  },
);

export { getComments, addComment, editComment, removeComment };
