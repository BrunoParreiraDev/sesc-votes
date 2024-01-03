import React, { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import { app } from "services/FirebaseConfig";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

function Form({ onSend }) {
  const db = getFirestore(app);
  const [formData, setFormData] = useState({
    teacher: "",
    title: "",
    description: "",
    class: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  async function getNextId() {
    const counterDocRef = doc(db, "homework", "counter");

    try {
      const counterDoc = await getDoc(counterDocRef);

      if (counterDoc.exists()) {
        const currentId = counterDoc.data().id;
        const nextId = currentId + 1;
        console.log(nextId);
        await updateDoc(counterDocRef, { id: nextId });
        return nextId;
      } else {
        await setDoc(counterDocRef, { id: 0 });
        return 0;
      }
    } catch (error) {
      console.error("Error getting next ID:", error);
      throw new Error("Error getting next ID");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const homeworkData = {
      ...formData,
      votes: 0,
      id: await getNextId(),
    };

    setFormData({
      teacher: "",
      title: "",
      description: "",
      class: "",
    });

    try {
      await onSend(homeworkData);
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Atividade para Casa cadastrada com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao cadastrar atividade:", error);
      Swal.fire(
        "Ops, algo deu errado!",
        `Não se preocupe, estamos cientes do problema e já estamos trabalhando para resolvê-lo. ${error}`,
        "warning"
      );
    }
  };

  return (
    <>
      <MKBox p={3} textAlign="center">
        <MKTypography color="dark" variant="h2" my={4}>
          Registrar Atividade para Casa
        </MKTypography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <select
                id="teacher"
                value={formData.teacher}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                }}
                required
              >
                <option value="" disabled>
                  Selecione o Professor
                </option>
                <option value="Roquenildo">Roquenildo</option>
                <option value="Eduardo">Eduardo</option>
                <option value="Neiriele">Neiriele</option>
                <option value="Diego">Diego</option>
                <option value="Yan">Yan</option>
                <option value="Andrea">Andrea</option>
                <option value="Kattiane">Kattiane</option>
                <option value="Fabia">Fabia</option>
              </select>
            </Grid>
            <Grid item xs={12}>
              <select
                id="class"
                value={formData.class}
                onChange={handleInputChange}
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
                <option value="7 (A)">7 (A)</option>
                <option value="7 (B)">7 (B)</option>
                <option value="8 (A)">8 (A)</option>
                <option value="8 (B)">8 (B)</option>
                <option value="9 (A)">9 (A)</option>
                <option value="9 (B)">9 (B)</option>
              </select>
            </Grid>
            <Grid item xs={12}>
              <MKInput
                fullWidth
                placeholder="Titulo"
                id="title"
                variant="outlined"
                required
                value={formData.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <MKInput
                fullWidth
                placeholder="Descrição"
                id="description"
                variant="outlined"
                required
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <MKButton type="submit" fullWidth variant="gradient" color="info">
                Adicionar atividade
              </MKButton>
            </Grid>
          </Grid>
        </form>
      </MKBox>
    </>
  );
}

Form.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default Form;
