import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const Formulario = () => {
    return(
        <>
            <Stepper activeStep={1} alternativeLabel>
                <Step>
                    <StepLabel></StepLabel>
                    <Form>
                        <Input/>
                    </Form>
                </Step>
            </Stepper>
        </>
    )
}

export default Formulario;