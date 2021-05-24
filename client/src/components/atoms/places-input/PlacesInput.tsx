import React, { ChangeEvent } from "react";
import styles from "./PlacesInput.module.scss";
import {
  Control,
  EventType,
  RegisterOptions,
  useController,
} from "react-hook-form";
import usePlacesAutocomplete, {
  getGeocode,
  Suggestion,
} from "use-places-autocomplete";
import { Wrapper } from "@googlemaps/react-wrapper";
import useOnclickOutside from "react-cool-onclickoutside";

interface Props {
  name: string;
  control: Control;
  rules?: RegisterOptions;
  defaultValue?: string;

  setPlace: (place: Suggestion) => void;

  label?: string;
  type?: string;
  placeholder?: string;

  disabled?: boolean;
  className?: string;
}

const PlacesInputInner = (props: Props): JSX.Element => {
  const {
    name,
    control,
    rules = {},
    defaultValue = "",

    setPlace,

    label,
    type = "text",
    placeholder,

    disabled = false,
    className = "",
  } = props;

  const {
    field: {
      ref,
      onChange: onChangeOuter,
      value: valueOuter,
      onBlur: onBlurOuter,
      ...inputProps
    },
    fieldState: { invalid, error, isTouched, isDirty },
    formState: { touchedFields, dirtyFields, isSubmitting },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["address"],
      bounds: {
        west: 113.338953078,
        south: -43.6345972634,
        east: 153.569469029,
        north: -10.6681857235,
      },
    },
    debounce: 500,
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    onChangeOuter(event);
  };

  const handleSelect = (suggestion: Suggestion) => () => {
    setValue(suggestion.description, false);
    setPlace(suggestion);
    clearSuggestions();
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div
          key={place_id}
          className={styles.suggestion}
          onClick={handleSelect(suggestion)}
        >
          {main_text}, <span>{secondary_text}</span>
        </div>
      );
    });

  const clickOutsideRef = useOnclickOutside(() => {
    clearSuggestions();
  });

  return (
    <div className={styles.input}>
      <div className={styles.above}>
        {label && <label htmlFor={name}>{label}</label>}
        <p className={`${styles.errorMessage} ${error ? styles.visible : ""}`}>
          {error?.message}
        </p>
      </div>

      <div className={styles.suggestionsWrapper} ref={clickOutsideRef}>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder || ""}
          onChange={onChange}
          value={value}
          className={`
          ${invalid || error ? styles.error : ""}
          ${status === "OK" && styles.withSuggestions}
          ${className}
        `}
          disabled={disabled || isSubmitting}
          {...inputProps}
        />

        {status === "OK" && (
          <div className={styles.suggestions}>{renderSuggestions()}</div>
        )}
      </div>
    </div>
  );
};

const PlacesInput = (props: Props) => {
  return (
    <Wrapper
      apiKey={process.env.REACT_APP_GOOGLE_API_KEY || ""}
      libraries={["places"]}
      region="AU"
      version="weekly"
    >
      <PlacesInputInner {...props} />
    </Wrapper>
  );
};

export default PlacesInput;
