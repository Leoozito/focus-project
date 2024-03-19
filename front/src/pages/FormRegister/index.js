import {useRef, useState} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Form from "../../components/Form"
import Input from "../../components/Input"
import Button from "../../components/Button"
import SearchIcon from '@mui/icons-material/Search';
import './FormRegister.css';
import PersonIcon from '@mui/icons-material/Person';

const steps = ['Informações de dados cadastrais', 'Informações de localidade', 'Complementação'];

export default function HorizontalLinearStepper() {
    // variaveis das divisões de tela
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    // variaveis de add imagem do usuario
    const inputRef = useRef();
    const [imageProfile, setImageProfile] = useState("");

    const handleChangeClick = () => {
      inputRef.current.click();
    };

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImageProfile(file);
    };

    const isStepOptional = (step) => {
      return step === 1;
    };

    const isStepSkipped = (step) => {
      return skipped.has(step);
    };

    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
      <>
        <div className="form-register">
          <Stepper 
              activeStep={activeStep}
          >
            {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
            })}
          </Stepper>
          <Form>
            {activeStep === 0 && (
              <>
                  <Input placeholder="Digite seu Nome:" label="Nome"/>
                  <Input placeholder="Digite seu Username:" label="Username"/>
                  <Input placeholder="Digite seu Email:" label="Email"/>
                  <Input placeholder="Digite seu Telefone:" label="Telefone"/>
              </>
            )}
            {activeStep === 1 && (
              <>
                  <Input placeholder="Digite seu CEP:" label="CEP"/>
                  <Input placeholder="Digite seu Endereço:" label="Endereço"/>
                  <Input placeholder="Digite seu Número:" label="Número"/>
                  <Input placeholder="Digite seu Bairro:" label="Bairro"/>
                  <Input placeholder="Digite seu Cidade:" label="Cidade"/>
                  <Input placeholder="Digite seu Estado:" label="Estado"/>
              </>
            )}
            <div className='container-main'>
              <div className="container-insert-img">
                {activeStep === 2 && (
                  <>
                    <div className="img-input" data-img="" onClick={handleChangeClick}>
                        {/* Parte de colocar foto e colocar um "Sobre Mim" */}
                        {imageProfile ? (
                          <>
                              <img
                                  src={URL.createObjectURL(imageProfile)}
                                  alt=""
                              />
                          </>
                        ) : (
                          <>
                              <PersonIcon className="icon" fontSize='44'/>
                          </>
                        )}
                        <input
                          type="file"
                          ref={inputRef}
                          onChange={handleImageChange}
                          id="file"
                          hidden
                        />
                    </div>
                  </>
                )}
              </div>
              <div className='container-button-group'>
                {activeStep === 2 && (
                  <div className="container-button">
                      <Button
                          onClick={handleChangeClick}
                          color="transparent"
                          textColor="#3355ff"
                          name={`${imageProfile ? ("Retirar Foto") : ("Inserir Imagem") }`}
                          shadow="1px 2px 36px -11px rgba(51,85,255,1)"
                      />
                  </div>
                )}
                <div className="container-button">
                    <Button
                        name="Voltar"
                        color="#1f2937"
                        shadow="none"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    />
                
                    <Button
                        name={activeStep === steps.length - 1 ? 'Enviar' : 'Próximo'}
                        onClick={handleNext}
                    />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </>
    );
}