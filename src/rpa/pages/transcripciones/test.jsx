import React, { useState } from "react";
import { Typography, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled("div")`
  width: 300px;
  margin: 20px auto;
`;

const UploadArea = styled("div")`
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  background-color: ${({ fileSelected }) =>
    fileSelected ? "#e6f7ff" : "#f9f9f9"};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const DropText = styled("p")`
  color: #888;
  font-size: 16px;
`;

const FileName = styled("p")`
  font-size: 16px;
  font-weight: bold;
`;

const SendButton = styled(Button)`
  && {
    margin-top: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;

const SelectButton = styled(Button)`
  && {
    margin-top: 10px;
    background-color: #4caf50;
    color: #fff;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
`;

export const Transcripcion = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleSendClick = () => {
    if (selectedFile) {
      alert(
        `Archivo seleccionado: ${selectedFile.name}\nCorreo electrónico: ${email}`
      );
    } else {
      alert("No se ha seleccionado ningún archivo.");
    }
  };

  return (
    <Container>
      <TextField
        label="Correo Electrónico"
        variant="outlined"
        size="small"
        fullWidth
        value={email}
        onChange={handleEmailChange}
        style={{ marginBottom: "10px" }}
      />
      <UploadArea
        fileSelected={!!selectedFile}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <FileName>{selectedFile.name}</FileName>
        ) : (
          <DropText>Arrastra y suelta un archivo aquí</DropText>
        )}
      </UploadArea>
      <input
        type="file"
        accept=".txt,.pdf,.doc,.docx"
        onChange={handleFileSelect}
        hidden
      />
      <SelectButton component="label" variant="contained">
        Seleccionar Archivo
        <input
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleFileSelect}
          hidden
        />
      </SelectButton>
      <SendButton variant="contained" onClick={handleSendClick}>
        Enviar
      </SendButton>
    </Container>
  );
};