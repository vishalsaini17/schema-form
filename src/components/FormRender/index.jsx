import { Box, Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { validationField } from "../../helpers/validation";
import FormField from "../FormField";

const FormRender = ({ schema, initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({}); // State to store validation errors

  useEffect(() => {
    // Initialize form data with initialData when it changes
    setFormData(initialData || {});
  }, [initialData]);

  const renderFields = useCallback(
    (fields) => {
      return Object.entries(fields).map(([key, field]) => {
        return (
          <FormField
            key={key}
            name={key}
            field={field}
            formData={formData}
            setFormData={setFormData}
            errors={errors} // Pass errors state to FormField component
          />
        );
      });
    },
    [formData, errors]
  );

  const formSubmit = (e) => {
    e.preventDefault();
    // Perform validation before submitting the form
    const formErrors = {};
    Object.entries(schema.properties).forEach(([key, field]) => {
      const value = formData[key];
      const error = validationField(value, field);
      if (error) {
        formErrors[key] = error;
      }
    });
    // Update errors state with validation results
    setErrors(formErrors);

    // If there are no errors, proceed with form submission
    if (Object.keys(formErrors).length === 0) {
      console.log(formData); // Here you have access to the validated form data
      onSubmit && onSubmit(formData);
      // You can submit the form data to a server or perform any other actions here
    }
  };

  return (
    <form onSubmit={formSubmit}>
      {renderFields(schema.properties)}
      <Box sx={{ textAlign: "center", paddingBottom: 2 }}>
        <Button type="submit" variant="contained" color="success" size="large">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default FormRender;
