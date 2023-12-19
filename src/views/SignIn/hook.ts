import {useEffect} from 'react';
import {useFormik} from "formik";
import {useDispatch} from 'react-redux';
import validationSchema from "lib/yupLocalised/scheme/signIn";
import {signInRequest} from 'state/admins/actions';
import {signInEndpoint} from 'state/admins/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';

interface IonSubmitValues {
    email: string,
    password: string,
}

function useContainer() {
    const dispatch = useDispatch();
    const { endpoint } = signInEndpoint;
    const { isLoading, error } = useParametricSelector(endpoint);

    const onSubmit = (values: IonSubmitValues) => {
        dispatch(signInRequest(values));
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit,
    });

    const onUpdateRequestResponse = () => {
        if (!error) return;
        formik.setErrors({email: '', password: error.message})
    };

    useEffect(onUpdateRequestResponse, [error, formik]);

    return {
        formik,
        isLoading,
    }
}

export default useContainer;
