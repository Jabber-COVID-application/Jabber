import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCallback } from "react";
import Column from "../../../components/atoms/column/Column";
import Content from "../../../components/atoms/content/Content";
import Card from "../../../components/atoms/card/Card";
import ProgressBar from "./progress-bar/ProgressBar";
import styles from "./RolloutDetailsForm.module.scss";
import Button from "../../../components/atoms/button/Button";
import Radio from "../../../components/atoms/radio/Radio";
import Checkbox from "../../../components/atoms/checkbox/Checkbox";
import { useStore } from "../../../store";
import { observer } from "mobx-react";
import { RolloutDetails } from "../../../types/user.types";
import { useHistory } from "react-router-dom";

enum RolloutDetailsStep {
  START,
  PRIORITY_WORKERS, // Front Line Worker & Aged/Disability Care Worker
  AGED_CARE_DISABILITY_RESIDENT,
  HIGH_RISK_WORKER,
  CARE_WORKER,
  MEDICAL, // Disability & Underlying Medical Condition
  CLOSE_CONTACT,
  ESSENTIAL_TRAVEL,
  ABORIGINAL_OR_TORRES_STRAIT,
  FINISH,
}

const RolloutDetailsForm = observer(
  (): JSX.Element => {
    const { user } = useStore();
    const history = useHistory();

    const {
      control,
      handleSubmit,
      watch,
      formState: { isSubmitting },
    } = useForm();

    const onSubmit = handleSubmit((data: RolloutDetails) => {
      user
        .update({ rolloutDetails: data })
        .then(() => {
          history.push("/rollout");
        })
        .catch((e) => {
          console.error(e);
        });
    });

    const [step, setStep] = useState<RolloutDetailsStep>(
      RolloutDetailsStep.START
    );

    const nextStep = () => {
      setStep((step + 1) as RolloutDetailsStep);
    };

    const previousStep = () => {
      setStep((step - 1) as RolloutDetailsStep);
    };

    const renderStep = useCallback(() => {
      switch (step) {
        case RolloutDetailsStep.START:
          return (
            <>
              <h4>Rollout Details</h4>
              <p>
                Please fill out your details in this form, and afterwards you
                will be provided with an estimate of when you will be eligible
                to receive a vaccination.
              </p>
              <p>
                Please note that all occupational details will require proof of
                occupation when you organise your vaccination.
              </p>
              <div className={styles.buttons}>
                <Button onClick={() => nextStep()}>Start</Button>
              </div>
            </>
          );

        case RolloutDetailsStep.PRIORITY_WORKERS:
          return (
            <>
              <h4>Do you work in one of the following industries?</h4>

              <div className={styles.inputs}>
                <Checkbox
                  name="frontLineWorker"
                  control={control}
                  label="Frontline quarantine, border and healthcare workers"
                />
                <Checkbox
                  name="agedCareDisabilityWorker"
                  control={control}
                  label="Residential aged care or disability care workers (excluding
                community and in-home care staff)"
                />
              </div>

              <div className={styles.buttons}>
                <Button styleType="outline" onClick={() => previousStep()}>
                  Previous
                </Button>
                <Button onClick={() => nextStep()}>Next</Button>
              </div>
            </>
          );
        case RolloutDetailsStep.AGED_CARE_DISABILITY_RESIDENT:
          return (
            <>
              <h4>
                Are you a resident of an aged care or disability care facility?
              </h4>

              <div className={styles.inputs}>
                <Radio
                  name="agedCareDisabilityResident"
                  value="true"
                  control={control}
                  label="Yes"
                />
                <Radio
                  name="agedCareDisabilityResident"
                  value="false"
                  control={control}
                  label="No"
                />
              </div>

              <div className={styles.buttons}>
                <Button styleType="outline" onClick={() => previousStep()}>
                  Previous
                </Button>
                <Button
                  onClick={() => nextStep()}
                  disabled={!watch("agedCareDisabilityResident")}
                >
                  Next
                </Button>
              </div>
            </>
          );
        case RolloutDetailsStep.HIGH_RISK_WORKER:
          return (
            <>
              <h4>
                Do you work in one of the following critical or high-risk
                industries?
              </h4>

              <ul>
                <li>Defence</li>
                <li>Police</li>
                <li>Fire</li>
                <li>Emergency Services</li>
                <li>Meat processing</li>
                <li>
                  Australian Government officials currently or about to be
                  deployed overseas
                </li>
                <li>Workers manufacturing or distributing COVID-19 vaccines</li>
              </ul>

              <div className={styles.inputs}>
                <Radio
                  name="highRiskWorker"
                  value="true"
                  control={control}
                  label="Yes"
                />
                <Radio
                  name="highRiskWorker"
                  value="false"
                  control={control}
                  label="No"
                />
              </div>

              <div className={styles.buttons}>
                <Button styleType="outline" onClick={() => previousStep()}>
                  Previous
                </Button>
                <Button
                  onClick={() => nextStep()}
                  disabled={!watch("highRiskWorker")}
                >
                  Next
                </Button>
              </div>
            </>
          );
        case RolloutDetailsStep.CARE_WORKER:
          return (
            <>
              <h4>
                Do you work in healthcare, aged care or disability services?
              </h4>

              <div className={styles.inputs}>
                <Radio
                  name="careWorker"
                  value="true"
                  control={control}
                  label="Yes"
                />
                <Radio
                  name="careWorker"
                  value="false"
                  control={control}
                  label="No"
                />
              </div>

              <div className={styles.buttons}>
                <Button styleType="outline" onClick={() => previousStep()}>
                  Previous
                </Button>
                <Button
                  onClick={() => nextStep()}
                  disabled={!watch("careWorker")}
                >
                  Next
                </Button>
              </div>
            </>
          );
        case RolloutDetailsStep.MEDICAL:
          return (
            <>
              <h4>
                Are you a person with significant disability or underlying
                medical conditions?
              </h4>

              <div className={styles.inputs}>
                <Checkbox
                  name="disability"
                  control={control}
                  label="Significant disability"
                />
                <Checkbox
                  name="medicalCondition"
                  control={control}
                  label="Underlying medical condition"
                />
              </div>

              <div className={styles.buttons}>
                <Button styleType="outline" onClick={() => previousStep()}>
                  Previous
                </Button>
                <Button onClick={() => nextStep()}>Next</Button>
              </div>
            </>
          );
        case RolloutDetailsStep.CLOSE_CONTACT:
          return (
            <>
              <h4>
                Are you a carer or support volunteer for someone who is aged,
                with an eligible disability or an underlying medical condition?
              </h4>

              <div className={styles.inputs}>
                <Radio
                  name="closeContact"
                  value="true"
                  control={control}
                  label="Yes"
                />
                <Radio
                  name="closeContact"
                  value="false"
                  control={control}
                  label="No"
                />
              </div>

              <div className={styles.buttons}>
                <Button styleType="outline" onClick={() => previousStep()}>
                  Previous
                </Button>
                <Button
                  onClick={() => nextStep()}
                  disabled={!watch("closeContact")}
                >
                  Next
                </Button>
              </div>
            </>
          );
        case RolloutDetailsStep.ESSENTIAL_TRAVEL:
          return (
            <>
              <h4>Are you undertaking essential international travel?</h4>

              <p>
                If you are undertaking essential travel and you have an
                Australian Border Force travel exemption stating that you are
                eligible for COVID-19 vaccination, you will be eligible for this
                reason.
              </p>

              <div className={styles.inputs}>
                <Radio
                  name="essentialTravel"
                  value="true"
                  control={control}
                  label="Yes"
                />
                <Radio
                  name="essentialTravel"
                  value="false"
                  control={control}
                  label="No"
                />
              </div>

              <div className={styles.buttons}>
                <Button styleType="outline" onClick={() => previousStep()}>
                  Previous
                </Button>
                <Button
                  onClick={() => nextStep()}
                  disabled={!watch("essentialTravel")}
                >
                  Next
                </Button>
              </div>
            </>
          );
        case RolloutDetailsStep.ABORIGINAL_OR_TORRES_STRAIT:
          return (
            <>
              <h4>Are you Aboriginal or Torres Strait Islander?</h4>

              <div className={styles.inputs}>
                <Radio
                  name="aboriginalOrTorresStrait"
                  value="true"
                  control={control}
                  label="Yes"
                />
                <Radio
                  name="aboriginalOrTorresStrait"
                  value="false"
                  control={control}
                  label="No"
                />
              </div>

              <div className={styles.buttons}>
                <Button styleType="outline" onClick={() => previousStep()}>
                  Previous
                </Button>
                <Button
                  onClick={() => nextStep()}
                  disabled={!watch("aboriginalOrTorresStrait")}
                >
                  Next
                </Button>
              </div>
            </>
          );
        case RolloutDetailsStep.FINISH:
          return (
            <>
              <>
                <h4>All Finished</h4>
                <p>
                  Please take a moment to go back and review your responses.
                  Don't worry — you'll be able to go back and change them later.
                </p>
                <div className={styles.buttons}>
                  <Button styleType="outline" onClick={() => previousStep()}>
                    Previous
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </>
            </>
          );
      }
    }, [step]);

    return (
      <Content>
        <Column width={4 / 5}>
          {step !== RolloutDetailsStep.START && (
            <ProgressBar step={step - 1} total={8} />
          )}
          <Card size="packed" className={styles.card}>
            <form onSubmit={onSubmit}>{renderStep()}</form>
          </Card>
        </Column>
      </Content>
    );
  }
);

export default RolloutDetailsForm;
