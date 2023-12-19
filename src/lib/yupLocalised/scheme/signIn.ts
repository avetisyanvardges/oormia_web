import yup from 'lib/yupLocalised';
import {MAX_INPUT_LENGTH} from "constants/globals";

const validationSchema = yup.object().shape({
    email: yup.string().email('Էլ․ հասցեն վավեր չէ').required(),
    password: yup.string().max(MAX_INPUT_LENGTH, `գաղտնաբառը պետք է ունենա առավելագույնը ${MAX_INPUT_LENGTH} նիշ`).required(),
});

export default validationSchema;
