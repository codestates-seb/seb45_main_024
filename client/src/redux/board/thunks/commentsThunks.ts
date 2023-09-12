import { createAsyncThunk } from "@reduxjs/toolkit";
import authInstance from "../../../utility/authInstance";

interface reqCommentsType {
  content: string;
  isApply?: boolean;
}

interface editCommentParamsType {
  targetId: string;
  data: reqCommentsType;
}

/** GET 모든 댓글 조회 */
// ❓ 해당 게시글의 댓글인지, 모든 게시글의 댓글인지 확인 필요
const getComments = createAsyncThunk("comment/get", async () => {
  const response = await authInstance.get("replys");

  return response.data;
});

/** POST 댓글 작성 */
const addComment = createAsyncThunk(
  "comment/add",
  async (data: reqCommentsType) => {
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
  async targetComment => {
    // await authInstance.delete(`replys/${targetComment.replyId}`);
    // ? 확인해보기

    return targetComment;
  },
);

export { getComments, addComment, editComment, removeComment };
