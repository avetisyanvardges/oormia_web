import {useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import {useDispatch} from 'react-redux';
import validationSchema from 'lib/yupLocalised/scheme/community';
import {createCommunity, fetchCommunityByIdRequest, updateCommunity} from 'state/regions/actions';
import useMount from 'hooks/useMount';
import useTypedSelector from 'hooks/useTypedSelector';
import {showModal} from 'state/modals/actions';
import {IUpdateAndCreateCommunity} from "state/regions/types";
import {createCommunityEndpoint, updateCommunityEndpoint} from 'state/regions/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';

interface ISelectedRegion { region?: string, id?: number }

function useContainer() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {endpoint: updateEndpoint} = updateCommunityEndpoint(id || '');
    const {endpoint: createEndpoint} = createCommunityEndpoint;
    const {isLoading: updateLoading} = useParametricSelector(updateEndpoint);
    const {isLoading: createLoading} = useParametricSelector(createEndpoint);
    const [selectedRegion, setSelectedRegion] = useState<ISelectedRegion>({});
    const { communityById } = useTypedSelector(({regions}) => regions);

    /**  Formik handleSubmit  */
    const onSubmit = (values: IUpdateAndCreateCommunity) => {
        if(id) {
            dispatch(updateCommunity({community: values, id}))
        } else {
            dispatch(createCommunity(values));
        }
    };

    /**  Formik initialization  */
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            community_am: '',
            community_ru: '',
            community_en: '',
            region_id: '',
        },
        validationSchema,
        onSubmit,
    });

    /** open modal for select region  */
    const onSelectHandler = (region: ISelectedRegion) => {
        setSelectedRegion(region);
        if(isEmpty(region)) return;
        formik.setValues({
            ...formik.values,
            region_id: String(region.id),
        })
    };

    /** open modal for select region  */
    const openSelectRegionModal = () => {
        dispatch(showModal({
            modalType: 'SELECT_REGION_MODAL',
            modalProps: {
                onSelectHandler,
                selectedRegionId: selectedRegion?.id,
            }
        }))
    };

    /**  onCommunityUpdateHandler  */
    const onCommunityUpdateHandler = () => {
        if(!id || isEmpty(communityById)) return;
        const { community_am, community_ru, community_en, region } = communityById;
        setSelectedRegion(region);
        formik.setValues({community_am, community_ru, community_en, region_id: region?.id});
    };

    /**  on params update handler  */
    const onMountHandler = () => {
        formik.resetForm();
        if(!id) return;
        dispatch(fetchCommunityByIdRequest(id));
    };

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMount(onMountHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onCommunityUpdateHandler, [communityById]);

    return {
        id,
        formik,
        openSelectRegionModal,
        selectedRegion,
        loading: updateLoading || createLoading,
    }
}

export default useContainer;
