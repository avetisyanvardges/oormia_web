import yup from 'lib/yupLocalised';

const validationSchema = yup.object().shape({
    sender: yup.object().shape({
        first_name: yup.string().required(),
        // last_name: yup.string().required(),
        // phone: yup.string().required(),
        // address: yup.string().required(),
        // is_company: yup.number().required(),
        // region_id: yup.number().required(),
        // community_id: yup.number().required(),
    }),
    // recipient: yup.object().shape({
    //     first_name: yup.string().required(),
    //     last_name: yup.string().required(),
    //     phone: yup.string().required(),
    //     address: yup.string().required(),
    //     is_company: yup.string().required(),
    //     region_id: yup.string().required(),
    //     community_id: yup.string().required(),
    // }),
    // payment_type: yup.string().required(),
    // cost: yup.number().required(),
    // is_return: yup.number().required(),
    // delivery_date: yup.string().required(),
    status: yup.string().required(),
    // recipient_id: yup.string().required(),
    description: yup.string().required(),
    // from_id: yup.string().required(),
    // to_id: yup.string().required(),
    // sender_id: yup.string().required(),

});

export default validationSchema;
