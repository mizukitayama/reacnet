import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";

//indicates type of data inside store
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;