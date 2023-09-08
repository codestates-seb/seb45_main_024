// 임시. 추후 types/index.ts 등으로 저장해놓으면 되나...? 모르겠음.

/* User List, Project List의 GET 요청의 Response data type */
// 뭔가.. interface를 많이 만들었지만 어떻게 써야할지를 모르겠네?! ㅎ-ㅎ

export interface UserListDataType {
  teamBoardId: number;
  title: string;
  position: string;
  keywords: string[];
  accountId: number;
  createdAt: string;
  modifiedAt: string;
}

export interface ProjectListDataType {
  memberBoardId: number;
  title: string;
  content: string;
  status: string;
  views: number;
  position: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  modifiedAt: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalpages: number;
}

export interface ApiResonse<T> {
  data: T[];
  pageInfo: PageInfo;
}

export type UserListResponse = ApiResonse<UserListDataType>;
export type ProjectListResponse = ApiResonse<ProjectListDataType>;
