import useTypedSelector from "hooks/useTypedSelector";

function useContainer() {
    const { currentAdmin } = useTypedSelector(({admins}) => admins);

    return { currentAdmin }
}

export default useContainer;