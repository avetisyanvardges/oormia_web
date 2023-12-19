import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "state/store/rootReducer";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
