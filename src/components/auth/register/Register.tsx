'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../app/redux/slices/authSlice';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../../app/redux/store';
import InputAuth from "../../../components/ui/inputs/InputAuth"
import { DivUserData, DivUserInput, DivUserTitle } from "./RegisterStyling"
import Label from "../../ui/labels/LabelAuth";
import Select from "../../ui/selects/SelectRegister";
import TextArea from "../../ui/textAreas/TextAreaRegister";
import ButtonSingUp from '../../ui/buttons/ButtonSingUp';

//Syled
import { FormWrapper } from '../login/LoginStyling';
import { Container } from '../login/LoginStyling';
import { Title } from '../login/LoginStyling';
import { DivButtonLogin } from '../login/LoginStyling';
import { DivButtonSingUp } from './RegisterStyling';
import { Form } from './RegisterStyling';

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    age: "",
    image: "",
    phoneNumber: "",
    email: "",
    password: "",
    jobTitle: "",
    description: "",
    linkedIn: "",
    behance: "",
    github: "",
    createdAt: ""
  });

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(0); // Controla la vista actual del carrusel

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el select
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // Manejar el textarea
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSkills(event.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación básica de campos
    if (!form.email || !form.name || !form.password || !form.lastName || !form.age || !form.description || !form.jobTitle) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    try {
      await dispatch(registerUser(form)).unwrap();
      toast.success('Registro exitoso!');
    } catch (err: any) {
      if (err?.message) {
        toast.error(`Registro fallido: ${err.message}`);
      } else {
        toast.error('Registro fallido. Inténtalo de nuevo.');
      }
    }
  };

  // Renderizar el input actual basado en la vista
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
            <div>
              <Title>Registro</Title>
              <Label text="Email" htmlFor='email' />
              <InputAuth
                type="email"
                id="email" 
                name="email"
                placeholder="Escribe tu email..."
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
              <Label text="Contraseña" htmlFor='password' />
              <InputAuth
                type="password"
                id="password" 
                name="password"
                placeholder="Escribe tu contraseña..."
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
        );
      case 1:
        return (
          <DivUserData>
            <DivUserTitle>
              <Title>Tus datos</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="name" text="Nombre*" />
              <InputAuth
                type="text"
                id="name" 
                name="name"
                placeholder="Escribe tu nombre..."
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="given-name"
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="lastName" text="Apellidos*" />
              <InputAuth
                type="text"
                id="lastName" 
                name="lastName"
                placeholder="Escribe tus apellidos..."
                value={form.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
              />
            </DivUserInput>
          </DivUserData>
        );
      case 2:
        return (
          <DivUserData>
            <DivUserTitle>
              <Title>Tus datos</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="age" text="Edad" />
              <InputAuth
                type="text"
                id="age" 
                name="age"
                placeholder="Escribe tu edad..."
                value={form.age}
                onChange={handleChange}
                required
                autoComplete="age" 
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="image" text="Foto de Perfil" />
              <InputAuth
                type="text"
                id="image" 
                name="image"
                placeholder="Escribe la URL de tu Imagen..."
                value={form.image}
                onChange={handleChange}
                autoComplete="url"
              />
            </DivUserInput>
          </DivUserData>
        );
      case 3:
        return (
          <DivUserData>
            <DivUserTitle>
              <Title>Tus habilidades</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="area" text="Selecciona una categoría" />
              <Select
                id="area" 
                value={selectedOption}
                onChange={handleSelectChange}
                ariaLabel="Select area"
                name="area"
                required
                autoComplete="category"
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="skills" text="Habilidades" />
              <TextArea
                id="skills"
                value={skills}
                onChange={handleTextAreaChange}
                ariaLabel="Escribe tus habilidades"
                name="skills"
                placeholder="Escribe aquí tus habilidades separadas por coma (máx. 200 caracteres) ..."
                required
                maxLength={200}
                autoComplete="skills"
              />
              <sub>{skills.length} / 200 caracteres</sub> {/* Mostrar contador de caracteres */}
            </DivUserInput>
          </DivUserData>
        );
      case 4:
        return (
          <DivUserData>
            <DivUserTitle>
              <Title>Sobre tu experiencia</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="jobTitle" text="Trabajo/título" />
              <InputAuth
                type="text"
                id="jobTitle"
                name="jobTitle"
                placeholder="Título de tu trabajo..."
                value={form.jobTitle}
                onChange={handleChange}
                required
                autoComplete="organization-title"
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="description" text="Descripción" />
              <InputAuth
                type="text"
                id="description" 
                name="description"
                placeholder="Describe tu experiencia..."
                value={form.description}
                onChange={handleChange}
                required
                autoComplete="description" 
              />
            </DivUserInput>
          </DivUserData>
        );
      case 5:
        return (
          <DivUserData>
            <DivUserTitle>
              <Title>Contacto</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="phoneNumber" text="Número de Teléfono" />
              <InputAuth
                type="text"
                id="phoneNumber" 
                name="phoneNumber"
                placeholder="Escribe tu número de teléfono..."
                value={form.behance}
                onChange={handleChange}
                autoComplete="phone-number"
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="linkedIn" text="LinkedIn" />
              <InputAuth
                type="text"
                id="linkedIn" 
                name="linkedIn"
                placeholder="URL de tu Perfil de LinkedIn..."
                value={form.linkedIn}
                onChange={handleChange}
                autoComplete="url"
              />
            </DivUserInput>
          </DivUserData>
        );
        case 6:
        return (
          <DivUserData>
            <DivUserTitle>
              <Title>Contacto</Title>
            </DivUserTitle>
            <DivUserInput>
              <Label htmlFor="behance" text="Behance" />
              <InputAuth
                type="text"
                id="behance" 
                name="behance"
                placeholder="URL de tu Perfil de Behance..."
                value={form.behance}
                onChange={handleChange}
                autoComplete="url"
              />
            </DivUserInput>
            <DivUserInput>
              <Label htmlFor="github" text="GitHub" />
              <InputAuth
                type="text"
                id="github" 
                name="github"
                placeholder="URL de tu Perfil de GitHub..."
                value={form.github}
                onChange={handleChange}
                autoComplete="url"
              />
            </DivUserInput>
          </DivUserData>
        );
      default:
        return null;
    }
  };
  
  return (
    <Container>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          {renderStep()}
          <DivButtonLogin />
          <DivButtonSingUp>
            {currentStep > 0 && (
              <ButtonSingUp type="button" onClick={() => setCurrentStep(currentStep - 1)}>
                ATRÁS
              </ButtonSingUp>
            )}
            {currentStep < 6 ? (
              <ButtonSingUp type="button" onClick={() => setCurrentStep(currentStep + 1)}>
                SIGUIENTE
              </ButtonSingUp>
            ) : (
              <ButtonSingUp type="submit" disabled={loading}>
                {loading ? 'Registrando...' : 'ENVIAR'}
              </ButtonSingUp>
            )}
          </DivButtonSingUp>
        </Form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </FormWrapper>
    </Container>
  );
}
