import {useIntl} from "react-intl";


export const useTranslate = (key) => {
    const { formatMessage } = useIntl();


    return formatMessage({id: key})
}
