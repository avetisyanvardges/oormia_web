import {useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import {useDispatch} from 'react-redux';
import createValidationSchema from 'lib/yupLocalised/scheme/createUser';
import updateValidationSchema from 'lib/yupLocalised/scheme/updateUser';
import {createUser, fetchUserByUpdateRequest, updateUser} from 'state/admins/actions';
import useMount from 'hooks/useMount';
import useTypedSelector from 'hooks/useTypedSelector';
import {showModal} from 'state/modals/actions';
import {createUserEndpoint, updateUsersEndpoint} from 'state/admins/endpoints';
import useParametricSelector from 'hooks/useParametricSelector';
import useErrorHandler from 'hooks/useErrorHandler';

interface ISelectedRegion { region?: string, id?: number}

interface ISelectedCommunity {community?: string,id?: number}

interface ISelectedRole {name?: string,id?: string}

function useContainer() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {endpoint: updateEndpoint} = updateUsersEndpoint(id || '');
    const {endpoint: createEndpoint} = createUserEndpoint;
    const {isLoading: updateLoading, error: updateError} = useParametricSelector(updateEndpoint);
    const {isLoading: createLoading, error: createError} = useParametricSelector(createEndpoint);
    const [selectedRegion, setSelectedRegion] = useState<ISelectedRegion>({});
    const [selectedCommunity, setSelectedCommunity] = useState<ISelectedCommunity>({});
    const [selectedRole, setSelectedRole] = useState<ISelectedRole>({});
    const {userByUpdate} = useTypedSelector(({admins}) => admins);

    /**  Formik handleSubmit  */
    const onSubmit = (values: any) => {
        if (id) {
            delete values.email;
            delete values.password;
            dispatch(updateUser({id, user: values}));
        } else {
            dispatch(createUser(values));
        }
    };

    /**  Formik initialization  */
    const formik = useFormik({
        // enableReinitialize: true,
        initialValues: {
            email: '',
            password: '',
            role_id: '',
            firstName: '',
            lastName: '',
            phone: '',
            region_id: '',
            community_id: '',
            address: '',
            is_company: 0,
        },
        validationSchema: id ? updateValidationSchema : createValidationSchema,
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

    /** open modal for select role  */
    const onSelectRoleHandler = (role: any) => {
        setSelectedRole(role);
        if (isEmpty(role)) return;
        formik.setFieldValue('role_id', String(role?.id))
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

    /** open modal for select role  */
    const openSelectRoleModal = (): void => {
        dispatch(showModal({
            modalType: 'SELECT_ROLE_MODAL',
            modalProps: {
                onSelectHandler: onSelectRoleHandler,
                selectedRoleId: selectedRole?.id,
            }
        }))
    };

    /**  onUpdateHandler  */
    const onUpdateHandler = () => {
        if (!id || isEmpty(userByUpdate)) return;
        setSelectedCommunity({});
        setSelectedRole({});
        setSelectedRegion({});
        if(userByUpdate?.region) setSelectedRegion(userByUpdate.region);
        if(userByUpdate?.community) setSelectedCommunity(userByUpdate.community);
        if(!isEmpty(userByUpdate?.role)) setSelectedRole(userByUpdate.role?.[0] || {});

        formik.setValues({
            ...formik.values,
            firstName: userByUpdate.firstName || '',
            lastName: userByUpdate.lastName || '',
            phone: userByUpdate.phone || '',
            address: userByUpdate.address || '',
            is_company: userByUpdate.is_company ? 1 : 0,
            region_id: String(userByUpdate?.region?.id) || '',
            community_id: String(userByUpdate?.community?.id) || '',
            role_id: String(userByUpdate.role?.[0].id) || '',
        })
    };

    /**  on params update handler  */
    const onMountHandler = () => {
        formik.resetForm();
        if (!id) return;
        dispatch(fetchUserByUpdateRequest(id));
    };

    /**  Lifecycle  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMount(onMountHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onUpdateHandler, [userByUpdate]);


    return {
        id,
        formik,
        openSelectRegionModal,
        openSelectCommunityModal,
        openSelectRoleModal,
        selectedRegion,
        selectedCommunity,
        selectedRole,
        loading: updateLoading || createLoading,
        onChangeIsCompany,
    }
}

export default useContainer;
