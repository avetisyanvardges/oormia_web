import {useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import {useDispatch} from 'react-redux';
import validationSchema from 'lib/yupLocalised/scheme/customer';
import {createCustomer, fetchCustomerByUpdateRequest, updateCustomer} from 'state/customers/actions';
import useMount from 'hooks/useMount';
import useTypedSelector from 'hooks/useTypedSelector';
import {showModal} from 'state/modals/actions';
import {createCustomerEndpoint, updateCustomerEndpoint} from 'state/customers/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';
import useErrorHandler from '../../../hooks/useErrorHandler';

interface ISelectedRegion { region?: string, id?: number}

interface ISelectedCommunity {community?: string,id?: number}

function useContainer() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {endpoint: updateEndpoint} = updateCustomerEndpoint(id || '');
    const {endpoint: createEndpoint} = createCustomerEndpoint;
    const {isLoading: updateLoading, error: updateError} = useParametricSelector(updateEndpoint);
    const {isLoading: createLoading, error: createError} = useParametricSelector(createEndpoint);
    const [selectedRegion, setSelectedRegion] = useState<ISelectedRegion>({});
    const [selectedCommunity, setSelectedCommunity] = useState<ISelectedCommunity>({});
    const {customerByUpdate} = useTypedSelector(({customers}) => customers);

    /**  Formik handleSubmit  */
    const onSubmit = (values: any) => {
        if (id) {
            dispatch(updateCustomer({id, customer: values}));
        } else {
            dispatch(createCustomer(values));
        }
    };

    /**  Formik initialization  */
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            phone: '',
            region_id: '',
            community_id: '',
            address: '',
            is_company: 0,
        },
        validationSchema,
        onSubmit,
    });

    /** error handler  */
    useErrorHandler({errors: {...createError?.error, ...updateError?.error}, formik});

    /** on change is company  */
    const onChangeIsCompany = ({target: value}: any) => {
        formik.setFieldValue('is_company', value.checked ? 1 : 0);
    };

    /** open modal for select region  */
    const onSelectRegionHandler = (region: ISelectedRegion) => {
        setSelectedRegion(region);
        if (isEmpty(region)) return;
        formik.setFieldValue('region_id', String(region.id))
    };

    /** open modal for select community  */
    const onSelectCommunityHandler = (community: ISelectedCommunity) => {
        setSelectedCommunity(community);
        if (isEmpty(community)) return;
        formik.setFieldValue('community_id', String(community?.id))
    };

    /** open modal for select region  */
    const openSelectRegionModal = (): void => {
        dispatch(showModal({
            modalType: 'SELECT_REGION_MODAL',
            modalProps: {
                onSelectHandler: onSelectRegionHandler,
                selectedRegionId: selectedRegion?.id,
            }
        }))
    };

    /** open modal for select community  */
    const openSelectCommunityModal = (): void => {
        dispatch(showModal({
            modalType: 'SELECT_COMMUNITY_MODAL',
            modalProps: {
                onSelectHandler: onSelectCommunityHandler,
                selectedCommunityId: selectedCommunity?.id,
                selectedRegionId: selectedRegion?.id,
            }
        }))
    };

    /**  onUpdateHandler  */
    const onUpdateHandler = () => {
        if (!id || isEmpty(customerByUpdate)) return;
        setSelectedCommunity({});
        setSelectedRegion({});
        if(customerByUpdate?.region) setSelectedRegion(customerByUpdate.region);
        if(customerByUpdate?.community) setSelectedCommunity(customerByUpdate.community);

        formik.setValues({
            ...formik.values,
            first_name: customerByUpdate.first_name || '',
            last_name: customerByUpdate.last_name || '',
            phone: customerByUpdate.phone || '',
            address: customerByUpdate.address || '',
            is_company: customerByUpdate.is_company ? 1 : 0,
            region_id: String(customerByUpdate?.region?.id) || '',
            community_id: String(customerByUpdate?.community?.id) || '',
        })
    };

    /**  on params update handler  */
    const onMountHandler = () => {
        formik.resetForm();
        if (!id) return;
        dispatch(fetchCustomerByUpdateRequest(id));
    };

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMount(onMountHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [customerByUpdate]);

    return {
        id,
        formik,
        openSelectRegionModal,
        openSelectCommunityModal,
        selectedRegion,
        selectedCommunity,
        loading: updateLoading || createLoading,
        onChangeIsCompany,
    }
}

export default useContainer;
