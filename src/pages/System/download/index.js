import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import CenteredFooter from "layouts/utils/Footers/CenteredFooter";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";

function Download() {
  const downloadAppWindows = () => {
    const link = document.createElement("a");
    link.href = "https://sesc.netlify.app/sescWindows.exe";
    link.download = "sesc.exe";

    link.click();
  };

  const downloadAppIOS = () => {
    // const link = document.createElement("a");
    // link.href = "https://sesc.netlify.app/sescIOS.zip";
    // link.download = "sesc.zip";

    // link.click();
    Swal.fire("Ops, algo deu errado!", `A verção para IOS está em desenvolvimento!`, "warning");
  };

  const downloadAppLinux = () => {
    // const link = document.createElement("a");
    // link.href = "https://sesc.netlify.app/sescLinux.zip";
    // link.download = "sesc.zip";

    // link.click();
    Swal.fire("Ops, algo deu errado!", `A verção para Linux está em desenvolvimento!`, "warning");
  };

  return (
    <>
      <Container>
        <Grid container justifyContent="center" pt={13}>
          <Grid item xs={12}>
            <MKBox
              sx={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                textAlign: "center",
              }}
              variant="gradient"
              borderRadius="10px"
              p={10}
            >
              <MKTypography color="dark" variant="h2" mb={5}>
                Instalar Aplicativo Desktop
              </MKTypography>
              <Grid item xs={12}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} md={4}>
                    <MKBox
                      sx={{ padding: "20px", textAlign: "center" }}
                      bgColor="dark"
                      variant="gradient"
                      borderRadius="10px"
                      p={10}
                      mb={10}
                    >
                      <Icon style={{ color: "white", fontSize: 40 }}>windows</Icon>
                      <MKTypography variant="h4" style={{ color: "white" }} gutterBottom>
                        Instalar para Windows
                      </MKTypography>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={12}>
                          <MKButton
                            size="small"
                            fullWidth
                            variant="gradient"
                            color="info"
                            onClick={downloadAppWindows}
                          >
                            <MKTypography
                              variant="h5"
                              style={{
                                color: "white",
                              }}
                              gutterBottom
                            >
                              Instalar
                            </MKTypography>
                          </MKButton>
                        </Grid>
                      </Grid>
                    </MKBox>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MKBox
                      sx={{ padding: "20px", textAlign: "center" }}
                      bgColor="dark"
                      variant="gradient"
                      borderRadius="10px"
                      p={10}
                      mb={10}
                    >
                      <Icon style={{ color: "white", fontSize: 40 }}>apple</Icon>
                      <MKTypography variant="h4" style={{ color: "white" }} gutterBottom>
                        Instalar para IOS
                      </MKTypography>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={12}>
                          <MKButton
                            size="small"
                            fullWidth
                            variant="gradient"
                            color="info"
                            onClick={downloadAppIOS}
                          >
                            <MKTypography
                              variant="h5"
                              style={{
                                color: "white",
                              }}
                              gutterBottom
                            >
                              Instalar
                            </MKTypography>
                          </MKButton>
                        </Grid>
                      </Grid>
                    </MKBox>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MKBox
                      sx={{ padding: "20px", textAlign: "center" }}
                      bgColor="dark"
                      variant="gradient"
                      borderRadius="10px"
                      p={10}
                      mb={10}
                    >
                      <Icon style={{ color: "white", fontSize: 40 }}>computer</Icon>
                      <MKTypography variant="h4" style={{ color: "white" }} gutterBottom>
                        Instalar para Linux
                      </MKTypography>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={12}>
                          <MKButton
                            size="small"
                            fullWidth
                            variant="gradient"
                            color="info"
                            onClick={downloadAppLinux}
                          >
                            <MKTypography
                              variant="h5"
                              style={{
                                color: "white",
                              }}
                              gutterBottom
                            >
                              Instalar
                            </MKTypography>
                          </MKButton>
                        </Grid>
                      </Grid>
                    </MKBox>
                  </Grid>
                </Grid>
              </Grid>
            </MKBox>
          </Grid>
        </Grid>
        <Container>
          <MKBox pt={6} px={1} mt={6}>
            <CenteredFooter />
          </MKBox>
        </Container>
      </Container>
    </>
  );
}

export default Download;
