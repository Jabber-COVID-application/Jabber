import React, { useEffect } from "react";
import Button from "../../../../../components/atoms/button/Button";
import { useStore } from "../../../../../store";
import styles from "./CreateVenueModal.module.scss";
import Modal from "../../../../../components/layout/modal/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateVenueRequest } from "../../../../../store/venues";
import * as yup from "yup";
import Input from "../../../../../components/atoms/input/Input";
import Card from "../../../../../components/atoms/card/Card";
import PlacesInput from "../../../../../components/atoms/places-input/PlacesInput";
import { useState } from "react";
import { getGeocode, Suggestion } from "use-places-autocomplete";
import { log } from "util";

const createVenueSchema = yup.object().shape({
  name: yup.string().required("Required"),
  address: yup.string().required("Required"),
});

interface Props {
  close: () => void;
}

const CreateVenueModal = (props: Props): JSX.Element => {
  const { close } = props;

  const { venues } = useStore();

  const [place, setPlace] = useState<Suggestion>();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(createVenueSchema) });

  const onSubmit = handleSubmit((data: { name: string; address: string }) => {
    if (!place) {
      if (data.address) {
        setError("address", {
          message: "Address must be selected from drop-down",
        });
      }

      return;
    }

    getGeocode({ placeId: place.place_id }).then((geoCode) => {
      venues
        .createVenue({
          name: data.name,
          address: {
            formatted: geoCode[0].formatted_address,
            placeId: geoCode[0].place_id,
          },
        })
        .then((res) => {
          if (res) close();
        });
    });
  });

  return (
    <Modal width={2 / 3} close={close} className={styles.createVenueModal}>
      <h4>Create Venue</h4>

      <form onSubmit={onSubmit}>
        <Input label="Venue Name" name="name" control={control} />

        <PlacesInput
          label="Venue Address"
          name="address"
          control={control}
          setPlace={setPlace}
        />

        <Button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default CreateVenueModal;
