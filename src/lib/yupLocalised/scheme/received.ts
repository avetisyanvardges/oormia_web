import yup from 'lib/yupLocalised';

const validationSchema = yup.object().shape({
    recipient_received_money: yup.number().required(),
    recipient_paid_money: yup.number().required(),
});

export default validationSchema;
