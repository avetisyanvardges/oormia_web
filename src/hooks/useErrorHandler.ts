import {isEmpty} from 'lodash';
import {useEffect} from 'react';

const useErrorHandler = ({errors, formik}: any) => {
    /**  on errors handler handler  */
    const onErrorsHandler = () => {
        if(!isEmpty(errors)) {
            const error =  Object.keys(errors).reduce((acc: any, key: any) => {
                acc[key] = errors[key][0];
                return acc;
            }, {})
            formik.setErrors(error)
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onErrorsHandler, [errors]);
}

export default useErrorHandler;