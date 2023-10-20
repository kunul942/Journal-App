import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks/useForm";

import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";


//initialValue - useForm
const formInitialValue = {
  email: '',
  password:'',
  displayName: ''
}

//validations - useForm
const formValidations = {
   email: [ (value)=> value.includes('@'), 'email should have @'],
   password: [ (value)=> value.length >= 6, 'password should more than 6 letters'],
   displayName: [ (value)=> value.length >= 1, 'name is required']
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  //validar cuando se hace submit el formulario para las validaciones
  const [formSubmitted, setformSubmitted] = useState(false)

  const { status, errorMessage } = useSelector( state => state.auth )
  //bloquear button al registrarse
  const isCheckingAuth = useMemo( ()=> status === 'checking', [status] )


  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm( formInitialValue, formValidations )

  // console.log({displayNameValid, isFormValid, emailValid, passwordValid})

  const onSubmit = (e) =>{
    e.preventDefault()
    setformSubmitted(true)

    if( !isFormValid ) return

    dispatch( startCreatingUserWithEmailPassword( formState ) )
  }


  return (
    <AuthLayout title ="Register">
      
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster"> {/* animation */} 
        <Grid container>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Name" 
              type="text"
              placeholder="Name"
              fullWidth
              name="displayName"
              value={ displayName }  
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted  }
              helperText={ displayNameValid }  
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Email" 
              type="email" 
              placeholder="email@google.com"
              fullWidth
              name="email"
              value={ email }  
              onChange={ onInputChange }  
              error={ !!emailValid && formSubmitted }
              helperText={ emailValid } 
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Password" 
              type="password" 
              placeholder="Password"
              fullWidth
              name="password"
              value={ password }  
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }   
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >
            
            <Grid 
              item 
              xs={ 12 }
              display={ !!errorMessage ? '': 'none' }>
              <Alert severity="error" >{ errorMessage }</Alert>
            </Grid>

            <Grid item xs={ 12 }>
              <Button
                disabled={ isCheckingAuth } 
                type="submit"
                variant="contained" 
                fullWidth>
                Create Account
              </Button>
            </Grid>

           
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
            <Link component={ RouterLink } color="inherit" to="/auth/login">
              Sign-in
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>

  )
}
