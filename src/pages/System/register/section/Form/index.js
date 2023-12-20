/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import CenteredFooter from "layouts/utils/Footers/CenteredFooter";
import footerRoutes from "footer.routes";

// Integração com o Firebase (substitua pelas suas credenciais e métodos)
//const firebaseConfig = {};

function Form({ onSend }) {
  const [image, setImage] = useState("");
  // Variável para armazenar a classe selecionada no dropdown
  const [selectedClass, setSelectedClass] = useState("");

  // Função para lidar com as mudanças no dropdown de classe
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const candidateData = {
      name: document.getElementById("name").value,
      slogan: document.getElementById("slogan").value,
      class: document.getElementById("class").value,
      image: image,
    };
    onSend(candidateData);
    console.log("Dados do Candidato:", candidateData);
  };

  return (
    <>
      <Card>
        <MKBox p={3} textAlign="center">
          <label htmlFor="avatar-input">
            <Avatar
              id="preview-avatar"
              sx={{ width: 120, height: 120, margin: "0 auto 20px", cursor: "pointer" }}
              alt="Candidate Photo"
              src={image}
            />
          </label>
          <form onSubmit={handleSubmit}>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <MKInput
                  fullWidth
                  placeholder="Nome Completo"
                  id="name"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <MKInput fullWidth placeholder="Slogan" id="slogan" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <select
                  id="class"
                  value={selectedClass}
                  onChange={handleClassChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                  }}
                  required
                >
                  <option value="" disabled>
                    Selecione a Turma
                  </option>
                  <option value="7A">7 (A)</option>
                  <option value="7B">7 (B)</option>
                  <option value="8A">8 (A)</option>
                  <option value="8B">8 (B)</option>
                  <option value="9A">9 (A)</option>
                  <option value="9B">9 (B)</option>
                </select>
              </Grid>
              <Grid item xs={12}>
                <MKButton type="submit" fullWidth variant="gradient" color="info">
                  Adicionar Candidato
                </MKButton>
              </Grid>
            </Grid>
          </form>
        </MKBox>
      </Card>
      <MKBox p={3}>
        <CenteredFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Form;
