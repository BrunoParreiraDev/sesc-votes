import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import { app } from "services/FirebaseConfig";
import { getFirestore, collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

function Form({ onSend }) {
  const db = getFirestore(app);
  const [formData, setFormData] = useState({
    name: "",
    slogan: "",
    class: "",
    image: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    const fetchClassInfo = async () => {
      if (formData.class) {
        const classesDocRef = doc(db, "classes", formData.class);
        const classesDoc = await getDoc(classesDocRef);

        if (classesDoc.exists()) {
          const finished = classesDoc.data().finished;
          if (finished) {
            Swal.fire(
              "Oops!",
              `Parece que a eleição da turma ${formData.class} já foi finalizada.`
            );
            setFormData((prevData) => ({ ...prevData, class: "" }));
          }
        } else {
          console.warn("No such document!");
        }
      }
    };

    fetchClassInfo();
  }, [formData.class, db]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          setFormData({ ...formData, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  async function getNextId() {
    const counterDocRef = doc(collection(db, "candidates"), "counter");

    try {
      const counterDoc = await getDoc(counterDocRef);

      if (counterDoc.exists()) {
        const currentId = counterDoc.data().id;
        const nextId = currentId + 1;
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

    const candidateData = {
      ...formData,
      votes: 0,
      id: await getNextId(),
    };

    setFormData({ name: "", slogan: "", class: "", image: "" });

    try {
      await onSend(candidateData);
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Candidato cadastrado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao cadastrar candidato:", error);
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
        <label htmlFor="avatar-input">
          <Avatar
            id="preview-avatar"
            sx={{ width: 120, height: 120, margin: "0 auto 20px", cursor: "pointer" }}
            alt="Candidate Photo"
            src={formData.image}
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
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <MKInput
                fullWidth
                placeholder="Slogan"
                id="slogan"
                variant="outlined"
                required
                value={formData.slogan}
                onChange={handleInputChange}
              />
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
              <MKButton type="submit" fullWidth variant="gradient" color="info">
                Adicionar Candidato
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
