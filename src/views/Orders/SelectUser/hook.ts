import {FormikProps} from 'formik';
import {useEffect, useMemo, useState} from 'react';
import {isEmpty} from 'lodash';
import {useDispatch} from 'react-redux';
import {fetchCustomerByUpdateRequest} from 'state/customers/actions';
import useMount from 'hooks/useMount';
import useTypedSelector from 'hooks/useTypedSelector';
import {createCustomerEndpoint, updateCustomerEndpoint} from 'state/customers/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';
import useErrorHandler from 'hooks/useErrorHandler';

function useContainer(title: string, formik: FormikProps<any>, id?: string) {
    const dispatch = useDispatch();
    const {endpoint: updateEndpoint} = updateCustomerEndpoint(id || '');
    const {endpoint: createEndpoint} = createCustomerEndpoint;
    const {isLoading: updateLoading, error: updateError} = useParametricSelector(updateEndpoint);
    const {isLoading: createLoading, error: createError} = useParametricSelector(createEndpoint);
    const [selectedRegion, setSelectedRegion] = useState<any>(0);
    const {customerByUpdate} = useTypedSelector(({customers}) => customers);

    /** error handler  */
    useErrorHandler({errors: {...createError?.error, ...updateError?.error}, formik});

    /** on change is company  */
    const onChangeIsCompany = ({target: value}: any) => {
        formik.setFieldValue(`${title.toLowerCase()}.is_company`, value.checked ? 1 : 0);
    };

    /** open modal for select region  */
    const onSelectRegionHandler = (id: string | number) => {
        if (!id){
            formik.setFieldValue(`${title.toLowerCase()}.region_id`, '')
            setSelectedRegion('');
            return;
        }
        setSelectedRegion(id);
        formik.setFieldValue(`${title.toLowerCase()}.region_id`, String(id))
    };

    /** open modal for select community  */
    const onSelectCommunityHandler = (id: string | number) => {
        if (!id){
            formik.setFieldValue(`${title.toLowerCase()}.community_id`, '')
            return;
        }
        formik.setFieldValue(`${title.toLowerCase()}.community_id`, String(id))
    };

    /** select courier  */
    const onSelectCourierHandler = (id: string | number) => {
        if (!id){
            formik.setFieldValue(`${title.toLowerCase()}_courier_id`, '')
            return;
        }
        formik.setFieldValue(`${title.toLowerCase()}_courier_id`, String(id))
    };

    /** select customer  */
    const onSelectCustomerHandler = (customerType: string, customer: any) => {
        if (isEmpty(customer)) {
            formik.setValues({
                ...formik.values,
                [`${title.toLowerCase()}`]: {...customer, region: null, region_id: '', community_id: '', phone: '374'},
                [`${customerType}_id`]: '',
            });
            return;
        }

        onSelectRegionHandler(customer?.region?.id)
        onSelectCommunityHandler(customer?.community?.id)
        formik.setValues({
            ...formik.values,
            [`${title.toLowerCase()}`]: {
                ...customer,
                region: null,
                region_id: customer?.region?.id || '',
                community_id: customer?.community?.id || '',
            },
            [`${customerType}_id`]: String(customer.id),
        });
    };

    /**  onUpdateHandler  */
    const onUpdateHandler = () => {
        if (!id || isEmpty(customerByUpdate)) return;
        setSelectedRegion(0);
        if (customerByUpdate?.region) setSelectedRegion(+customerByUpdate.region.id);

        formik.setValues({
            ...formik.values,
            [`${title.toLowerCase()}`]: {
                first_name: customerByUpdate.first_name || '',
                last_name: customerByUpdate.last_name || '',
                phone: customerByUpdate.phone || '',
                address: customerByUpdate.address || '',
                is_company: customerByUpdate.is_company ? 1 : 0,
                region_id: String(customerByUpdate?.region?.id) || '',
                community_id: String(customerByUpdate?.community?.id) || '',
                // @ts-ignore
                courier_id: String(customerByUpdate?.[`${title.toLowerCase()}_courier`]?.id) || '',
            },
            // @ts-ignore
            [`${title.toLowerCase()}_courier_id`]: String(customerByUpdate?.[`${title.toLowerCase()}_courier`]?.id) || ''
        })
    };

    const selectedValues = useMemo(() => {
        const {region_id, community_id } = formik.values[`${title.toLowerCase()}`];

        const courier_id  = formik.values[`${title.toLowerCase()}_courier`]?.id;
        return {
            region_id,
            community_id,
            courier_id,
        }
    }, [formik.values]);

    /**  on params update handler  */
    const onMountHandler = () => {
        formik.resetForm();
        setSelectedRegion(0)
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
        loading: updateLoading || createLoading,
        onChangeIsCompany,
        onSelectCommunityHandler,
        onSelectCourierHandler,
        onSelectRegionHandler,
        onSelectCustomerHandler,
        selectedRegion,
        selectedValues,
    }
}

export default useContainer;
