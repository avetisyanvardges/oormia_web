import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import useTypedSelector from "hooks/useTypedSelector";
import useMount from "hooks/useMount";
import {useDispatch} from "react-redux";
import useQueryParams from "hooks/useQueryParams";
import TableOperations from "views/shared/TableOperations";
import {deleteParcel, fetchParcelRequest, sendParcelRequest} from "state/parcel/actions";
import {IParcel, ParcelTypes} from "state/parcel/types";
import {fetchParcelsEndpoint} from "state/parcel/endpoints";
import useParametricSelector from "hooks/useParametricSelector";
import {Button, Checkbox, DatePicker} from 'antd';
import moment from "moment";
import ArrowLeft from "../../assets/svg/ArrowLeft";
import ArrowRight from "../../assets/svg/ArrowRight";
import {isEmpty} from "lodash";

function useContainer({edit, remove, send, parcelReceived}: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {page, params, handleChangeParams} = useQueryParams();
    const {endpoint: getParcelEndpoint} = fetchParcelsEndpoint;
    const {parcel, parcelMeta} = useTypedSelector(({parcels}) => parcels);
    const {isLoading: isFetchingParcel} = useParametricSelector(getParcelEndpoint);
    const [archiveFilter, setArchiveFilter] = useState<boolean>(false);
    const [filterCreatedDate, setFilterCreatedDate] = useState('');

    const handleSendParcel = (event:any,id: string) => {
        event.stopPropagation()
        dispatch(sendParcelRequest({params, id}));
    }

    const handleReceivedParcel = (event:any, id: string) => {
        event.stopPropagation()
        dispatch({type: ParcelTypes.RECEIVED_PARCEL_REQUEST, payload: {params, id}});
    }

    const handleCreateParcel = () => {
        navigate(`/parcel/create`);
    }

    const handleUpdateParcel = ({id, event}: { id: number, event?: any }) => {
        navigate(`/parcel/update/${id}`);
    }

    const handleDeleteParcel = ({event, id}: any) => {
        event.stopPropagation()
        dispatch(deleteParcel({params, id}))
    };

    useEffect(() => {
        if (archiveFilter) {
            setFilterCreatedDate('')
        } else {
            setFilterCreatedDate(moment(new Date()).format('YYYY-MM-DD'))
        }
    }, [archiveFilter])

    const onUpdateHandler = () => {
        // @ts-ignore
        params.archive = archiveFilter ? 1 : 0

        if (!isEmpty(filterCreatedDate)) {
            // @ts-ignore
            params.created_at = filterCreatedDate
        }

        dispatch(fetchParcelRequest(params));
    }

    const onMountHandler = () => {
        dispatch(fetchParcelRequest(params));
    }

    useEffect(onUpdateHandler, [page, archiveFilter, filterCreatedDate]);
    useMount(onMountHandler);

    const columns = useMemo(() => (
        [
            {
                title: 'Parcel name',
                dataIndex: 'name',
                width: '30%',
            },
            {
                title: () => (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        Created date
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <span style={{marginTop: 15, marginRight: 5}}
                              onClick={() => setFilterCreatedDate(moment(filterCreatedDate).add(-1, 'days').format('YYYY-MM-DD'))}>
                            <ArrowLeft/>
                        </span>
                            <DatePicker
                                style={{marginTop: 10}}
                                // @ts-ignore
                                onClick={(e) => e.stopPropagation()}
                                // @ts-ignore
                                value={filterCreatedDate ? (moment(filterCreatedDate, 'YYYY-MM-DD')) : ''}
                                onChange={((e: any) => {
                                    handleChangeParams(1)
                                    setFilterCreatedDate(e ? moment(e).format('YYYY-MM-DD') : '')
                                })}
                            />
                            <span style={{marginTop: 15, marginLeft: 5}}
                                  onClick={() => setFilterCreatedDate(moment(filterCreatedDate).add(1, 'days').format('YYYY-MM-DD'))}>
                            <ArrowRight/>
                        </span>
                        </div>
                    </div>
                ),
                dataIndex: 'created_at',
                width: '30%',
                render:(_: any, record: IParcel) => moment(record.created_at).format('YYYY-MM-DD')
            },
            {
                title: () => <div style={{display: 'flex', flexDirection: 'column'}}>
                    Operations
                    <div className='check-box-content'>
                        <span style={{marginRight: 20}}>Archive</span>
                        <Checkbox
                            value={!!archiveFilter}
                            checked={!!archiveFilter}
                            className='check-box'
                            onChange={() => setArchiveFilter(!archiveFilter)}
                        />
                    </div>
                </div>,
                width: '50%',
                dataIndex: 'operation',
                render: (_: any, record: IParcel) => {
                    if (!archiveFilter) {
                        return (
                            <div style={{display: 'flex'}}>
                                <TableOperations
                                    isEdit={edit}
                                    isDelete={remove}
                                    record={record}
                                    handleEdit={handleUpdateParcel}
                                    handleDelete={handleDeleteParcel}
                                />
                                {send && record?.status === 'in-process' ?
                                    <Button
                                        style={{background: '#5BC852', color: 'white'}}
                                        onClick={(event) => handleSendParcel(event, String(record.id))}>
                                        Send
                                    </Button> :
                                    parcelReceived && record?.status === 'send' ?
                                        <Button style={{background: 'blue', color: 'white'}}
                                                onClick={(event) => handleReceivedParcel(event, String(record.id))}>Receive</Button> :
                                        <span>Received</span>
                                }
                            </div>
                        )
                    }
                },
            },
        ]
    ), [parcel]);

    return {handleCreateParcel, parcel, parcelMeta, columns, isFetchingParcel, params, page, handleChangeParams,
        handleUpdateParcel};
}

export default useContainer;
