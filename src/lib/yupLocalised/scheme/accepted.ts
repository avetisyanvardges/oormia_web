import yup from 'lib/yupLocalised';

const validationSchema = yup.object().shape({
    sender_received_money: yup.number().required(),
    sender_paid_money: yup.number().required(),
});

export default validationSchema;
