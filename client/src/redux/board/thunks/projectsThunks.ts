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

interface QueryParamsType {
  currentSort?: string;
  currentPage: string;
  currentSize: string;
  currentFilter?: string;
  currentSearch?: string;
}

/** GET 모든 프로젝트 조회 */
const fetchProjectList = createAsyncThunk(
  "projectlist/fetch",
  async ({
    currentSort,
    currentPage,
    currentSize,
    currentFilter,
    currentSearch,
  }: QueryParamsType) => {
    const searchParamsPosition = `search?position=${currentFilter}`;
    const searchParamsTitle = `search?title=${currentSearch}`;

    // const url = `memberboards/${searchParams}&page=${currentPage}&size=${currentSize}`;

    let url = `memberboards/?page=${currentPage}&size=${currentSize}`;

    // 임시 조건문
    if (currentFilter === "" && currentSort === "view") {
      url = `memberboards/${currentSort}?page=${currentPage}&size=${currentSize}`;
    } else if (currentFilter !== "" && currentSort === "view") {
      url = `memberboards/${currentSort}/${searchParamsPosition}&page=${currentPage}&size=${currentSize}`;
    } else if (currentFilter !== "" && currentSort === "") {
      url = `memberboards/${searchParamsPosition}&page=${currentPage}&size=${currentSize}`;
    } else if (currentSearch !== "") {
      url = `memberboards/${searchParamsTitle}&page=${currentPage}&size=${currentSize}`;
    }

    const response = await commonInstance.get(url);
    // console.log("🚀🚀🚀", url);

    /**
     * 최신순 (기본) /memberboards/?page=1&size=8   /memberboards?page=1&size=8
     * 조회순       /memberboards/view?page=1&size=8
     * 포지션검색    /memberboards/search?position=백엔드&page=1&size=8
     * 제목검색     /memberboards/search?title=라우&page=1&size=8
     * 포지션+조회순 /memberboards/view/search?position=백엔드&page=1&size=8
     */

    const listData = response.data.data;
    const pageInfo = response.data.pageInfo;

    return { listData, pageInfo };
  },
);

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
