import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {clearDataReducer} from "state/data/actions";

const useMount = (callback?: () => void) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearDataReducer());
        callback && callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useMount;