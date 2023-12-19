import * as yup from 'yup';

yup.setLocale({
    mixed: {
        required: `Պարտադիր լրացման դաշտ`,
    },
});

yup.string().test('len', 'Must be exactly 5 characters', val => val?.length === 5)

export default yup;
