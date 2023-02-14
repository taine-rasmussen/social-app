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
import Dropzone from 'react-dropzone';
import FlexBetween from 'Components/FlexBetween';
import { isAllOf } from "@reduxjs/toolkit";

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


  const register = async (values, onSubmitProps) => {
    // Send form info with image
    const formData = new FormData()
    for(let value in values){
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name)
    const saveUserResponse = await fetch(
      'http://localhost:3001/auth/register',
      {
        method: 'POST',
        body: formData
      }
    );
    const savedUser = await saveUserResponse.json();
    onSubmitProps.resetForm();
    if(savedUser){
      setPageType('login');
    };
  };

  const login = async (values, onSubmitProps) => {
     const loggedInResponse = await fetch(
      'http://localhost:3001/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      }
    );
    const loggedIn = await loggedInResponse.json()
    onSubmitProps.resetForm();
    if(loggedIn){
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        })
      );
      navigate('/home')
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if(isLogin) await login(values, onSubmitProps);
    if(isRegister) await register(values, onSubmitProps);
  }

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
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
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
                <TextField
                  label='Loaction'
                  onBlur={handleBlur}
                  onChnage={handleChange}
                  value={values.loaction}
                  name='loaction'
                  error={Boolean(touched.loaction) && Boolean(errors.loaction)}
                  helpText={touched.loaction && errors.loaction}
                  sx={{ gridColumn: 'span 4'}}
                />
                <TextField
                  label='Occupation'
                  onBlur={handleBlur}
                  onChnage={handleChange}
                  value={values.occupation}
                  name='occupation'
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helpText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: 'span 4'}}
                />
                <Box
                  gridColumn='span 4'
                  border={`1px solid ${paletter.netrual.medium}`}
                  borderRadius='5px'
                  p='1rem'
                >
                  <Dropzone
                    acceptFiles='.jpg,.jpeg,.png'
                    multiple={false}
                    onDrop={(accecptedFiles) => 
                      setFieldValue('picture', accecptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps}) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${paletter.primary.main}`}
                        p='1rem'
                        sx={{ '&:hover': {cursor: 'pointer' }}}
                      >
                        <input {...getInputProps()} />
                        {!values.picture? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label='Email'
              onBlur={handleBlur}
              onChnage={handleChange}
              value={values.email}
              name='email'
              error={Boolean(touched.email) && Boolean(errors.email)}
              helpText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4'}}
            />
            <TextField
              label='Password'
              type='hidden'
              onBlur={handleBlur}
              onChnage={handleChange}
              value={values.password}
              name='password'
              error={Boolean(touched.password) && Boolean(errors.password)}
              helpText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4'}}
            />
          </Box>
          {/* Buttons */}
          <Box>
            <Button
              fullWidth
              type='submit'
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: paletter.primary.main,
                color: paletter.background.alt,
                '&:hover': { color: paletter.primary.main }
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
              <Typography
                onClick={() => {
                  setPageType(isLogin ? 'register' : 'login')
                  resetFrom()
                }}
                sx={{
                  textDecoration: 'underline',
                  color: paletter.primary.main,
                  '&:hover': {
                    cursor: 'pointer',
                    color: paletter.primary.light
                  },
                }}
              >
                {isLogin 
                  ? "Don't have an account? Sign up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form
