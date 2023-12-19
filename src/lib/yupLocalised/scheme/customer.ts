import yup from 'lib/yupLocalised';
import {MAX_REGION_INPUT_LENGTH} from "constants/globals";

const validationSchema = yup.object().shape({
    first_name: yup.string().max(MAX_REGION_INPUT_LENGTH, `Առավելագույնը ${MAX_REGION_INPUT_LENGTH} նիշ`).required(),
    last_name: yup.string().max(MAX_REGION_INPUT_LENGTH, `Առավելագույնը ${MAX_REGION_INPUT_LENGTH} նիշ`).required(),
    phone: yup.number()
        .typeError('Մուտքագրեք թվանշան')
        .required(),
    address: yup.string(),
    region_id: yup.string().required(),
    community_id: yup.string().required(),
});

export default validationSchema;
