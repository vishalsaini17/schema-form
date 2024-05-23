import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputDate from "../InputDate";

const FormField = ({ field, name, formData, setFormData, errors }) => {
  const { minimum = 0, maximum = Infinity } = field; // Default minimum to 0 and maximum to Infinity
  const [items, setItems] = useState(formData[name] || [{}]);

  useEffect(() => {
    if (minimum === 1 && items.length === 0) {
      setItems([{}]); // Ensure at least one item is present if minimum constraint is 1
    }
  }, [items, minimum]);

  useEffect(() => {
    // Initialize items array if initialData is an array
    if (Array.isArray(formData[name])) {
      setItems(formData[name].length > 0 ? formData[name] : [{}]); // Create an item for each initialData element or a single item if empty
    }
  }, [formData, name]);

  const addItem = () => {
    if (items.length < maximum) {
      const newItems = [...items, {}];
      setItems(newItems); // Add an empty object to the array
      setFormData({ ...formData, [name]: newItems }); // Update formData with the new array
    }
  };

  const removeItem = (index) => {
    if (items.length > minimum) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems); // Remove the item at the specified index
      setFormData({ ...formData, [name]: updatedItems }); // Update formData with the new array
    }
  };

  const handleItemChange = (index, itemData) => {
    const updatedItems = items.map((item, i) => (i === index ? itemData : item));
    setItems(updatedItems); // Update the items state
    setFormData({ ...formData, [name]: updatedItems }); // Update formData with the new array
  };

  const handleChange = (e) => {
    const { value, type, checked } = e.target;
    const parsedValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  switch (field.type) {
    case "number":
    case "integer":
    case "string":
      return (
        <Box data-name={name} sx={{ mb: 2 }}>
          <Field
            fieldData={field}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            isError={!!errors?.[name]}
            helperText={errors?.[name] || ""}
          />
        </Box>
      );
    case "boolean":
      return (
        <Box data-name={name} sx={{ mb: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={!!formData[name]} onChange={handleChange} name={name} />}
            label={field.title}
          />
        </Box>
      );
    case "null":
      return (
        <Box data-name={name} sx={{ mb: 2 }}>
          <TextField variant="outlined" label={field.title} value="null" disabled fullWidth />
        </Box>
      );
    case "object":
      return (
        <Box data-name={name}>
          <h3>{field.title}</h3>
          {field.properties &&
            Object.entries(field.properties).map(([subName, subField]) => (
              <FormField
                key={subName}
                name={subName}
                field={subField}
                formData={formData[name] || {}}
                setFormData={(data) => setFormData({ ...formData, [name]: { ...formData[name], ...data } })}
                errors={errors?.[name]}
              />
            ))}
        </Box>
      );
    case "array":
      return (
        <div data-name={name}>
          <h3>{field.title}</h3>
          <List sx={{ paddingTop: 0 }}>
            {items.map((item, index) => (
              <ListItem alignItems="flex-start" key={index}>
                <Grid container columnSpacing={1}>
                  <Grid item xs="auto">
                    {items.length > minimum && (
                      <IconButton type="button" title={"Remove Item"} color="error" onClick={() => removeItem(index)}>
                        <Delete />
                      </IconButton>
                    )}
                  </Grid>
                  <Grid item xs>
                    {field.items.properties &&
                      Object.entries(field.items.properties).map(([subName, subField]) => (
                        <FormField
                          key={subName}
                          name={subName}
                          field={subField}
                          formData={item || {}}
                          setFormData={(data) => handleItemChange(index, { ...item, [subName]: data[subName] })}
                          errors={errors?.[name]?.[index]?.[subName]}
                        />
                      ))}
                    <Divider />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            {items.length < maximum && (
              <ListItem>
                <IconButton type="button" variant="contained" color="success" onClick={addItem}>
                  <Add />
                </IconButton>
              </ListItem>
            )}
          </List>
        </div>
      );
    default:
      return null;
  }
};

export default FormField;

const Field = ({ fieldData, name, value, onChange, isError, helperText }) => {
  const type = fieldData?.format || "text";
  const label = fieldData?.title;
  const { dateFormat, ...attributes } = fieldData?.attributes || {};

  if (fieldData.enum) {
    const enumOptions = fieldData.enum.map((option) =>
      typeof option === "string" ? { value: option, title: option } : option
    );

    switch (fieldData.format) {
      case "checkbox":
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
              {enumOptions.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={value.includes(option.value)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const newValue = checked ? [...value, option.value] : value.filter((v) => v !== option.value);
                        onChange({ target: { name, value: newValue } });
                      }}
                    />
                  }
                  label={option.title}
                />
              ))}
            </FormGroup>
          </FormControl>
        );
      case "radio":
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup name={name} value={value} onChange={onChange}>
              {enumOptions.map((option, index) => (
                <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.title} />
              ))}
            </RadioGroup>
          </FormControl>
        );
      default:
        return (
          <TextField
            label={label}
            select
            variant="outlined"
            fullWidth
            value={value}
            onChange={onChange}
            error={isError}
            helperText={helperText}
          >
            {enumOptions.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
        );
    }
  }

  switch (type) {
    case "date":
      return (
        <InputDate
          label={label}
          value={value} // Ensure value is a dayjs object
          error={isError}
          helperText={helperText}
          format={dateFormat}
          onChange={onChange}
          {...attributes}
        />
      );
    case "richtext":
      return (
        <TextField
          label={label}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={value}
          onChange={onChange}
          error={isError}
          helperText={helperText}
        />
      );
    default:
      return (
        <TextField
          label={label}
          type={type}
          variant="outlined"
          fullWidth
          value={value}
          onChange={onChange}
          error={isError}
          helperText={helperText}
        />
      );
  }
};
