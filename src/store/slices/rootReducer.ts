import { combineReducers } from "redux";
import user from "./user/user.slice";
import setting from "./setting/setting.slice";

const combinedReducer = combineReducers({
   user,
   setting,
});

export const rootReducer = (state: any, action: any) => {
   // RESET STORE (all slice) TO INIT
   if (action.type === "userSlice/RESET_USER") state = undefined;
   return combinedReducer(state, action);
};
