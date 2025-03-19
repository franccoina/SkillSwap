"use client";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

interface ModalPasswordRecoveryProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  z-index: 1001;

  @media (max-width: 600px) {
    padding: 1rem;
    width: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #222;
`;

const FormLabel = styled.label`
  display: block;
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #000;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
`;

const ModalPasswordRecovery: React.FC<ModalPasswordRecoveryProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('https://skillswapriwi.azurewebsites.net/api/Auth/RequestEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${errorText}`);
      }

      const jsonResponse = await response.json();
      console.log('Correo enviado:', jsonResponse);
      toast.success('Correo enviado correctamente. Revisa tu bandeja de entrada.');
    } catch (error: unknown) {
      let errorMessage = 'Ocurrió un error desconocido.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(`Error al enviar correo: ${errorMessage}`);
    }
  };

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Recuperar contraseña</h2>
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="email-recovery">Ingresa tu correo electrónico:</FormLabel>
          <Input
            type="email"
            id="email-recovery"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton type="submit">
            ENVIAR
          </SubmitButton>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalPasswordRecovery;
