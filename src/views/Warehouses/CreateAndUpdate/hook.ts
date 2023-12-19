import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import {isEmpty} from 'lodash';
import {useDispatch} from 'react-redux';
import validationSchema from 'lib/yupLocalised/scheme/warehouse';
import {createWarehouse, fetchWarehouseByUpdateRequest, updateWarehouse} from 'state/warehouses/actions';
import useMount from 'hooks/useMount';
import useTypedSelector from 'hooks/useTypedSelector';
import {showModal} from 'state/modals/actions';
import {createWarehouseEndpoint, updateWarehouseEndpoint} from 'state/warehouses/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';
import {fetchRegionByIdRequest, fetchRegionByIdSuccess} from 'state/regions/actions';
import useErrorHandler from 'hooks/useErrorHandler';

interface ISelectedRegion { region?: string, id?: number}

function useContainer() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {endpoint: updateEndpoint} = updateWarehouseEndpoint(id || '');
    const {endpoint: createEndpoint} = createWarehouseEndpoint;
    const {isLoading: updateLoading, error: updateError} = useParametricSelector(updateEndpoint);
    const {isLoading: createLoading, error: createError} = useParametricSelector(createEndpoint);
    const {warehousesByUpdate} = useTypedSelector(({warehouses}) => warehouses);
    const {regionById} = useTypedSelector(({regions}) => regions);

    /**  Formik handleSubmit  */
    const onSubmit = (values: any) => {
        if (id) {
            dispatch(updateWarehouse({id, warehouse: values}));
        } else {
            dispatch(createWarehouse(values));
        }
    };

    /**  Formik initialization  */
    const formik = useFormik({
        initialValues: {
            warehouse_am: '',
            warehouse_ru: '',
            warehouse_en: '',
            open_at: '',
            close_at: '',
            address: '',
            code: '',
            region_id: '',
        },
        validationSchema,
        onSubmit,
    });

    /** error handler  */
    useErrorHandler({errors: {...createError?.error, ...updateError?.error}, formik});

    /** open modal for select region  */
    const onSelectRegionHandler = (region: ISelectedRegion) => {
        if (isEmpty(region)) return;
        dispatch(fetchRegionByIdRequest(String(region?.id)));
    };

    /** open modal for select region  */
    const openSelectRegionModal = (): void => {
        dispatch(showModal({
            modalType: 'SELECT_REGION_MODAL',
            modalProps: {
                onSelectHandler: onSelectRegionHandler,
                selectedRegionId: regionById.id,
            }
        }))
    };

    /**  onUpdateHandler  */
    const onUpdateHandler = () => {
        if (!id || isEmpty(warehousesByUpdate)) return;
        if(warehousesByUpdate?.region_id) dispatch(fetchRegionByIdRequest(warehousesByUpdate.region_id));
        formik.setValues({ ...formik.values, ...warehousesByUpdate })
    };

    /**  on params update handler  */
    const onMountHandler = () => {
        formik.resetForm();
        dispatch(fetchRegionByIdSuccess({}));
        if (!id) return;
        dispatch(fetchWarehouseByUpdateRequest(id));
    };

    /**  on region update handler  */
    const onRegionUpdateHandler = () => {
        if(isEmpty(regionById)) return;
        formik.setFieldValue('region_id', String(regionById?.id));
    };

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMount(onMountHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [warehousesByUpdate]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onRegionUpdateHandler, [regionById]);

    return {
        id,
        formik,
        openSelectRegionModal,
        regionById,
        loading: updateLoading || createLoading,
    }
}

export default useContainer;
