import yup from 'lib/yupLocalised';
import {MAX_REGION_INPUT_LENGTH} from "constants/globals";

const validationSchema = yup.object().shape({
    warehouse_am: yup.string().max(MAX_REGION_INPUT_LENGTH, `Առավելագույնը ${MAX_REGION_INPUT_LENGTH} նիշ`).required(),
    warehouse_ru: yup.string().max(MAX_REGION_INPUT_LENGTH, `Առավելագույնը ${MAX_REGION_INPUT_LENGTH} նիշ`).required(),
    warehouse_en: yup.string().max(MAX_REGION_INPUT_LENGTH, `Առավելագույնը ${MAX_REGION_INPUT_LENGTH} նիշ`).required(),
    address: yup.string().required(),
    region_id: yup.string().required(),
    code: yup.string().required(),
    open_at: yup.string().required(),
    close_at: yup.string().required(),

});

export default validationSchema;
