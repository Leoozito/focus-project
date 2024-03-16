import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Form from "../../components/Form"
import Input from "../../components/Input"
import Button from "../../components/Button"
import SearchIcon from '@mui/icons-material/Search';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());

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
      <Stepper activeStep={activeStep}>
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
            <Input placeholder="Nome:"/>
            <Input placeholder="Username:"/>
            <Input placeholder="Email:"/>
            <Input placeholder="Telefone:"/>
        </>
      )}

      {activeStep === 1 && (
        <>
            <Input placeholder="CEP:"/>
            <Input placeholder="Endereço:"/>
            <Input placeholder="Número:"/>
            <Input placeholder="Bairro:"/>
            <Input placeholder="Cidade:"/>
            <Input placeholder="Estado:"/>
        </>
      )}

      {activeStep === 2 && (
        <>
          {/* Parte de colocar foto e colocar um "Sobre Mim" */}
        </>
      )}
      
        <Button
            name="Voltar"
            color="#1f2937"
            shadow="none"
            disabled={activeStep === 0}
            onClick={handleBack}
        >
            Back
        </Button>

        <Button
            name="Próximo" 
            onClick={handleNext}
        >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Form>
    </>
  );
}