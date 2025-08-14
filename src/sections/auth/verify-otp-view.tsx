import { useState, useCallback, useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export function VerifyOtpView() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = useCallback((index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

             // Move to next input if value is entered
       if (value && index < 3) {
         inputRefs.current[index + 1]?.focus();
       }
    }
  }, [otp]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [otp]);

     const handleVerifyOtp = useCallback(() => {
     const otpString = otp.join('');
     if (otpString.length === 4) {
       // Here you would typically make an API call to verify the OTP
       console.log('OTP to verify:', otpString);
       // Navigate to signin page after successful verification
       router.push('/');
     }
   }, [otp, router]);

  const handleResendOtp = useCallback(() => {
    // Here you would typically make an API call to resend OTP
    console.log('Resend OTP clicked');
  }, []);

  const handleSignInClick = useCallback(() => {
    router.push('/');
  }, [router]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const renderOtpInputs = (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        mb: 3,
        width: '100%',
      }}
    >
      {otp.map((digit, index) => (
        <TextField
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleOtpChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center', fontSize: '1.2rem' },
          }}
          sx={{
            width: 60,
            '& .MuiInputBase-root': {
              height: 60,
            },
          }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />
      ))}
    </Box>
  );

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          mb: 3,
          textAlign: 'center',
          width: '100%',
        }}
      >
        We've sent a verification code to your email
      </Typography>

      {renderOtpInputs}

             <Button
         fullWidth
         size="large"
         type="submit"
         color="inherit"
         variant="contained"
         onClick={handleVerifyOtp}
         disabled={otp.join('').length !== 4}
       >
         Verify
       </Button>
    </Box>
  );

  return (
    <>
             <Box
         sx={{
           gap: 1.5,
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           mb: 5,
         }}
       >
         <Typography variant="h5">Verify OTP</Typography>
       </Box>
             {renderForm}
       <Box
         sx={{
           mt: 3,
           textAlign: 'center',
         }}
       >
         <Typography
           variant="body2"
           sx={{
             color: 'text.secondary',
             mb: 2,
           }}
         >
           Didn't receive the code?
           <Link variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }} onClick={handleResendOtp}>
             Resend
           </Link>
         </Typography>
         <Typography
           variant="body2"
           sx={{
             color: 'text.secondary',
           }}
         >
           Back to
           <Link variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }} onClick={handleSignInClick}>
             Sign in
           </Link>
         </Typography>
       </Box>
    </>
  );
}
