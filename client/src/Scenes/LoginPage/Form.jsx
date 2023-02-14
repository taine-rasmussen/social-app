import EditOutlinedIcon from '@mui/icons-material/EditOutlinedIcon'
import { useNavigate } from 'react-router-dom'
import { useDisptach } from 'react-redux'
import { Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { 
  Box, 
  Button, 
  TestField, 
  useMediaQuery, 
  Typography, 
  useTheme 
} from '@mui/material'
import { setLogin } from 'state';
import DropZone from 'react-dropzone';
import FlexBetween from 'Components/FlexBetween'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
  picture: yup.string().required('required')
})

const Form = () => {
  return (
    <Box>
      
    </Box>
  )
}

export default Form
