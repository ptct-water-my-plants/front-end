import * as yup from 'yup'

const signUpSchema = yup.object().shape({
    username:yup.string().min(4, 'Username must be at least 4 characters long!').required('Username is required!'),
    email: yup.string().email('Must be a valid email!').required('Email is required!'),
    password: yup.string().min(8, 'Password must be at least 8 characters!').required('Password is required!')
})

export default signUpSchema