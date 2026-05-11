'use client';

import { Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Link,
  CircularProgress,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useLoginForm, useRegisterForm, useForgotPasswordForm } from './useAuthForm';

// #region Login Form Component
export const LoginForm = () => {
  const { control, errors, isLoading, handleSubmit } = useLoginForm();

  return (
    <Box
      className="min-h-screen flex items-center justify-center"
      sx={{ backgroundColor: 'background.default', p: 3 }}
    >
      <Card sx={{ maxWidth: 420, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to your account to continue
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email Address"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      autoComplete="email"
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
                      type="password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      autoComplete="current-password"
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Box className="flex items-center justify-between">
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={!!field.value} size="small" />}
                        label={<Typography variant="body2">Remember me</Typography>}
                      />
                    )}
                  />
                  <Link href="/forgot-password" variant="body2" underline="hover">
                    Forgot password?
                  </Link>
                </Box>
              </Grid>
              <Grid size={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Grid>
              <Grid size={12}>
                <Typography variant="body2">
                  {"Don't have an account? "}
                  <Link href="/register" underline="hover">
                    Create one
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
// #endregion

// #region Register Form Component
export const RegisterForm = () => {
  const { control, errors, isLoading, handleSubmit } = useRegisterForm();

  return (
    <Box
      className="min-h-screen flex items-center justify-center"
      sx={{ backgroundColor: 'background.default', p: 3 }}
    >
      <Card sx={{ maxWidth: 480, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Register to access the analytics dashboard
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="First Name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Last Name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email Address"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
                      type="password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </Grid>
              <Grid size={12}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link href="/login" underline="hover">
                    Sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
// #endregion

// #region Forgot Password Form Component
export const ForgotPasswordForm = () => {
  const { control, errors, isLoading, handleSubmit } = useForgotPasswordForm();

  return (
    <Box
      className="min-h-screen flex items-center justify-center"
      sx={{ backgroundColor: 'background.default', p: 3 }}
    >
      <Card sx={{ maxWidth: 420, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Forgot Password
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            Enter your email address and we will send you an OTP to reset your password.
          </Alert>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email Address"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
                >
                  {isLoading ? 'Sending...' : 'Send Reset OTP'}
                </Button>
              </Grid>
              <Grid size={12}>
                <Typography variant="body2">
                  <Link href="/login" underline="hover">
                    Back to Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
// #endregion
