import yup from 'lib/yupLocalised';
import {MAX_REGION_INPUT_LENGTH} from "constants/globals";

const validationSchema = yup.object().shape({
    name: yup.string().max(MAX_REGION_INPUT_LENGTH, `Առավելագույնը ${MAX_REGION_INPUT_LENGTH} նիշ`).required(),
});

export default validationSchema;
