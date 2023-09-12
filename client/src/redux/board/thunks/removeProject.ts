import { createAsyncThunk } from "@reduxjs/toolkit";
import authInstance from "../../utility/authInstance";

import { ProjectListDataType } from "../../../model/boardTypes";

const removeProject = createAsyncThunk(
  "project/remove",
  async (projectCard: ProjectListDataType) => {
    await authInstance.delete(`memberboards/${projectCard.memberBoardId}`);

    return projectCard;
  },
);

export { removeProject };
