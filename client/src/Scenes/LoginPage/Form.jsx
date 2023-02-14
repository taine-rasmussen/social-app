import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { 
  Box, 
  Button, 
  TestField, 
  useMediaQuery, 
  Typography, 
  useTheme, 
  TextField
} from '@mui/material';
import { setLogin } from 'State';
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

const loginSchema = yup.object().shape({
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
      {({
        values,
        errors,
        touched,
        resetFrom,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
      }) => (
        <form onSubmit={handleSubmit}>
          <Box 
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefiend : 'span 4' }
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label='First Name'
                  onBlur={handleBlur}
                  onChnage={handleChange}
                  value={values.firstName}
                  name='firstName'
                  error={Boolean(touched.firstName) && Boolean(errors.firstname)}
                  helpText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2'}}
                />
                <TextField
                  label='Last Name'
                  onBlur={handleBlur}
                  onChnage={handleChange}
                  value={values.lastName}
                  name='lastName'
                  error={Boolean(touched.lastName) && Boolean(errors.lastname)}
                  helpText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2'}}
                />
              </>
            )}
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form
