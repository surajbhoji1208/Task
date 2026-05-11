'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useOtpVerifyForm } from '@/src/modules/auth/authForm/useAuthForm';

// #region OTP Verify Page Content
const OtpVerifyContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const otpType = searchParams.get('type') || 'LOGIN';
  const { control, errors, isLoading, handleSubmit } = useOtpVerifyForm(email, otpType);

  return (
    <Box
      className="min-h-screen flex items-center justify-center"
      sx={{ backgroundColor: 'background.default', p: 3 }}
    >
      <Card sx={{ maxWidth: 420, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Verify OTP
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            Enter the 6-digit OTP sent to{' '}
            <strong>{email}</strong>
          </Alert>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Controller
                  name="otp"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Enter OTP"
                      placeholder="123456"
                      slotProps={{ htmlInput: { maxLength: 6, style: { textAlign: 'center', letterSpacing: 8, fontSize: 24 } } }}
                      error={!!errors.otp}
                      helperText={errors.otp?.message}
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
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
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

export default function OtpVerifyPage() {
  return (
    <Suspense fallback={<Box className="min-h-screen flex items-center justify-center"><CircularProgress /></Box>}>
      <OtpVerifyContent />
    </Suspense>
  );
}
