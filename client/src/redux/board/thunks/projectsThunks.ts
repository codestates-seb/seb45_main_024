import { createAsyncThunk } from "@reduxjs/toolkit";
import commonInstance from "../../../utility/commonInstance";
import authInstance from "../../../utility/authInstance";
import { ProjectListDataType } from "../../../model/boardTypes";

interface reqDataType {
  title: string;
  content: string;
  status: string;
  position: string;
  startDate: string;
  endDate: string;
}

interface editProjectParamsType {
  targetId: string;
  data: reqDataType;
}

/** GET 모든 프로젝트 조회 */
const fetchProjectList = createAsyncThunk("projectlist/fetch", async () => {
  const response = await commonInstance.get(`memberboards/?page=1`);

  return response.data.data;
});

/** GET 프로젝트 조회 */
const getProject = createAsyncThunk("project/get", async (targetId: string) => {
  const response = await commonInstance.get(`memberboards/${targetId}`);

  return response.data;
});

/** POST 프로젝트 작성 */
const addProject = createAsyncThunk(
  "project/add",
  async (data: reqDataType) => {
    const response = await authInstance.post("memberboards", data);

    return response.data;
  },
);

/** PATCH 프로젝트 수정 */
const editProject = createAsyncThunk(
  "project/edit",
  async ({ targetId, data }: editProjectParamsType) => {
    const response = await authInstance.patch(`memberboards/${targetId}`, data);

    return response.data;
  },
);

/** DELETE 프로젝트 삭제 */
const removeProject = createAsyncThunk(
  "project/remove",
  async (projectCard: ProjectListDataType) => {
    await authInstance.delete(`memberboards/${projectCard.memberBoardId}`);

    return projectCard;
  },
);

export { fetchProjectList, getProject, addProject, editProject, removeProject };
