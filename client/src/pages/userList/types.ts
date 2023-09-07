// 임시. 추후 types/index.ts 등으로 저장해놓으면 되나...? 모르겠음.

export interface CardType {
  teamBoardId: number;
  title: string;
  position: string;
  keywords: string[];
  accountId: number;
  createdAt: string;
  modifiedAt: string;
}
