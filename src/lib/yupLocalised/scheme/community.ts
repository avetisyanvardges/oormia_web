import yup from 'lib/yupLocalised';
import {MAX_REGION_INPUT_LENGTH} from "constants/globals";

const validationSchema = yup.object().shape({
    community_am: yup.string().max(MAX_REGION_INPUT_LENGTH, `Առավելագույնը ${MAX_REGION_INPUT_LENGTH} նիշ`).required(),
    community_ru: yup.string().max(MAX_REGION_INPUT_LENGTH, `Առավելագույնը ${MAX_REGION_INPUT_LENGTH} նիշ`).required(),
    community_en: yup.string().max(MAX_REGION_INPUT_LENGTH, `Առավելագույնը ${MAX_REGION_INPUT_LENGTH} նիշ`).required(),
    region_id: yup.string().required(),
});

export default validationSchema;
