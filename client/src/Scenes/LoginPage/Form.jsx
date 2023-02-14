import EditOutlinedIcon from '@mui/icons-material/EditOutlinedIcon';
import { useNavigate } from 'react-router-dom';
import { useDisptach } from 'react-redux';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { 
  Box, 
  Button, 
  TestField, 
  useMediaQuery, 
  Typography, 
  useTheme 
} from '@mui/material';
import { setLogin } from 'state';
import DropZone from 'react-dropzone';
import FlexBetween from 'Components/FlexBetween';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
  picture: yup.string().required('required')
});

const loginSchema = yup.object().shappe({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
};

const initialValueLogin = {
  email: '',
  password: ''
};



const Form = () => {
  const [pageType, setPageType] = useState('login');
  const { paletter } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';


  const handleFormSubmit = async (values, onSubmitProps) => {}

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValueLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      
    </Formik>
  )
}

export default Form
