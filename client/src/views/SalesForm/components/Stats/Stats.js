import React from 'react'

import {
    Button,
} from 'reactstrap';

const Stats = ({
    currentStep,
    firstStep,
    goToStep,
    lastStep,
    nextStep,
    previousStep,
    totalSteps,
    step,
    activeNextStep
}) => {
  return (
      <div className="mt-5 d-flex justify-content-around">
          {step > 1 &&
              <Button color="primary" onClick={previousStep}>Go Back</Button>
          }
          {step < totalSteps ?
              <Button color="primary" onClick={nextStep} disabled={activeNextStep}>Continue</Button>
              :
              null
          }
    </div>
  )
}

Stats.propTypes = {

}

export default Stats
