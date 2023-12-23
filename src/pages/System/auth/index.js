import React, { useContext } from "react";
import { Grid, Card, Typography, Box } from "@mui/material";
import { AuthGoogleContext } from "contexts/authGoogle";
import { GoogleIcon } from "@mui/icons-material";

function SignInBasic() {
  const { signInGoogle } = useContext(AuthGoogleContext);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      zIndex={1}
      width="100%"
      minHeight="100vh"
      // ...rest of your styles
    >
      <Box px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <Box
                sx={{
                  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  borderRadius: "3px",
                  border: 0,
                  color: "white",
                  height: "48px",
                  padding: "0 30px",
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                }}
                onClick={() => signInGoogle()}
              >
                <GoogleIcon /> {/* Aqui vai o ícone do Google */}
                <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Entrar com o Google
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SignInBasic;
