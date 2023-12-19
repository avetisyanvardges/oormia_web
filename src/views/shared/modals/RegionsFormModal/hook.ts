import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {isEmpty} from "lodash";
import validationSchema from "lib/yupLocalised/scheme/regions";
import {IRegion} from "state/regions/types";
import {IParams} from 'state/types';
import {createRegion, updateRegion} from "state/regions/actions";
import {createRegionEndpoint, updateRegionEndpoint} from "state/regions/endpoints";
import useParametricSelector from "hooks/useParametricSelector";

interface Props { region?: IRegion, params: IParams }

function useContainer({ region, params }: Props) {
    const dispatch = useDispatch();
    const { endpoint: createEndpoint } = createRegionEndpoint;
    const { endpoint: updateEndpoint } = updateRegionEndpoint(String(region?.id));
    const { isLoading: createLoading } = useParametricSelector(createEndpoint);
    const { isLoading: updateLoading } = useParametricSelector(updateEndpoint);

    const onSubmit = () => {
        if(isEmpty(region)) {
            dispatch(createRegion({ region: formik.values, params }))
        }else {
            dispatch(updateRegion({ region: {...region, ...formik.values}, params }))
        }
    }

    /**  Formik initialization  */
    const formik = useFormik({
        initialValues: { region_am: '', region_en: '', region_ru: '' },
        validationSchema,
        onSubmit,
    });

    /**  on form update handler  */
    const onUpdateHandler = () => {
        if(isEmpty(region)) return;

        formik.setValues({
            region_am: region?.region_am, region_en: region?.region_en, region_ru: region?.region_ru
        })
    };

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [region]);

    return {
        formik,
        onSubmit,
        loading: createLoading || updateLoading,
    }
}

export default useContainer;
