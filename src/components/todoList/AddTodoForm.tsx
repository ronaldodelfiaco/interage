import { DatePicker } from "@mui/lab";
import { Box, Button, FormLabel, Radio, RadioGroup } from "@mui/material";
import DarkTextField from "../../components/DarkTextField";
import FlexBox from "../../components/FlexBox";
import { useFormik } from "formik";
import { Dispatch, FC } from "react";
import * as Yup from "yup";

// component props interface
interface AddTodoFormProps {
  showAddTodoForm: boolean;
  setShowAddTodoForm: Dispatch<React.SetStateAction<boolean>>;
}

const AddTodoForm: FC<AddTodoFormProps> = (props) => {
  const { showAddTodoForm, setShowAddTodoForm } = props;

  // form field validation
  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, "Too Short").required("Title is Required!"),
    date: Yup.date().required("Date is Required!"),
    description: Yup.string()
      .min(10, "Too Short")
      .required("Description is Required!"),
  });

  const initialValues = {
    title: "",
    date: "",
    description: "",
    statusColor: "#61A9FF",
    mentionClient: "",
  };

  const { errors, values, handleChange, handleSubmit, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
        setShowAddTodoForm(false);
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          marginTop: 2,
          display: showAddTodoForm ? "auto" : "none",
        }}
      >
        <DarkTextField
          fullWidth
          name="title"
          placeholder="Title"
          value={values.title}
          onChange={handleChange}
          helperText={touched.title && errors.title}
          error={Boolean(touched.title && errors.title)}
          sx={{ mb: 1 }}
        />

        <DatePicker
          value={values.date}
          onChange={(newDate) => setFieldValue("date", newDate)}
          renderInput={(params) => (
            <DarkTextField
              {...params}
              name="date"
              fullWidth
              error={Boolean(touched.date && errors.date)}
              helperText={touched.date && errors.date}
              sx={{
                mb: 1,
                "& .MuiSvgIcon-root": { color: "text.disabled" },
              }}
            />
          )}
        />
        <DarkTextField
          fullWidth
          name="mentionClient"
          placeholder="@mention Client"
          onChange={handleChange}
          value={values.mentionClient}
          sx={{ mb: 1 }}
        />
        <DarkTextField
          fullWidth
          rows={5}
          multiline
          name="description"
          placeholder="Description"
          value={values.description}
          onChange={handleChange}
          error={Boolean(touched.description && errors.description)}
          helperText={touched.description && errors.description}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: 0,
              "& textarea": { paddingY: 1 },
            },
          }}
        />

        <FlexBox alignItems="center" mb="1rem">
          <FormLabel component="small" sx={{ color: "text.disabled" }}>
            Select Color
          </FormLabel>
          <RadioGroup
            row
            name="statusColor"
            value={values.statusColor}
            onChange={handleChange}
          >
            <Radio value="#61A9FF" size="small" color="primary" />
            <Radio value="#2CC5BD" size="small" color="success" />
            <Radio value="#FD396D" size="small" color="error" />
            <Radio value="#A798FF" size="small" color="info" />
          </RadioGroup>
        </FlexBox>

        <FlexBox>
          <Button variant="contained" fullWidth type="submit">
            Save
          </Button>
          <Box width="2rem" />
          <Button
            fullWidth
            onClick={() => setShowAddTodoForm(false)}
            sx={{
              backgroundColor: "secondary.300",
              color: "text.disabled",
              "&:hover": { backgroundColor: "secondary.300" },
            }}
          >
            Cancel
          </Button>
        </FlexBox>
      </Box>
    </form>
  );
};

export default AddTodoForm;
