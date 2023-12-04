import { Box, Step, StepIcon, StepIndicator, StepNumber, Stepper as StepperComponent, StepSeparator, StepStatus, StepTitle, useSteps } from "@chakra-ui/react"


interface StepperProps {
    index?: number;
}

const steps = [
    { title: 'Cadastro Token' },
    { title: 'Validação Token' },
    { title: 'Dados pessoais' },
    { title: 'Instituição' },
    { title: 'Cadastro Instituição' },
    { title: 'Solicitação Credenciamento' },
]

export function Stepper({ index }: StepperProps) {
    const { activeStep } = useSteps({
        index: index,
        count: steps.length,
    })

    return (

        <StepperComponent py="2rem" px="1rem" index={activeStep}>
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator >
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={`📌`}

                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </StepperComponent>
    )
}

