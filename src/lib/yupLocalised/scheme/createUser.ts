import yup from 'lib/yupLocalised';
import {MAX_INPUT_LENGTH, MAX_REGION_INPUT_LENGTH} from "constants/globals";

const validationSchema = yup.object().shape({
    first_name: yup.string().max(MAX_REGION_INPUT_LENGTH, `Առավելագույնը ${MAX_REGION_INPUT_LENGTH} նիշ`).required(),
    last_name: yup.string().max(MAX_REGION_INPUT_LENGTH, `Առավելագույնը ${MAX_REGION_INPUT_LENGTH} նիշ`).required(),
    phone: yup.number()
        .typeError('Մուտքագրեք թվանշան')
        .required(),
    address: yup.string(),
    role_id: yup.string().required(),
    region_id: yup.string().required(),
    community_id: yup.string().required(),
    email: yup.string().email('Էլ․ հասցեն վավեր չէ').required(),
    password: yup.string().max(MAX_INPUT_LENGTH, `գաղտնաբառը պետք է ունենա առավելագույնը ${MAX_INPUT_LENGTH} նիշ`).required(),
});

export default validationSchema;
