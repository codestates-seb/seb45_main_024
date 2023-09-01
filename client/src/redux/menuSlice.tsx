import { createSlice } from "@reduxjs/toolkit";

// store, configureCreate 내에 설정 아직 안함
export const menuSlice = createSlice({ 
    name: "menu",
    initialState: { selectedMenu : "Summary" },
    reducers: {
        changeMenu: (state, action) => {
            state.selectedMenu = action.payload;
        },
    },
});

export const { changeMenu } = menuSlice.actions;