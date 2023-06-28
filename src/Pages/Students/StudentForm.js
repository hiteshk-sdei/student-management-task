import { Alert, Grid, Paper, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addStudent } from "../../Api/StudentApi";
import Button from "../../Components/FormElements/Button";
import PageLoading from "../../Components/PageLoading/PageLoading";
import { resetStudent } from "../../Redux/Slice/StudentSlice";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("FirstName is required"),
  familyName: Yup.string().required("FamilyName is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .test("minimumAge", "Student must be at least 10 years old", (value) => {
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 10);
      return value <= minDate;
    }),
});

const formInitialValues = {
  firstName: "",
  familyName: "",
  email: "",
  dob: null,
};

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const { message, error } = useSelector((state) => {
    return {
      message: state?.student?.message,
      error: state?.student?.error,
    };
  });

  const handeSave = ({ firstName, familyName, email, dob }, { resetForm }) => {
    setIsLoading(true);
    const payload = {
      firstName,
      familyName,
      email,
      dob,
    };
    payload.dob = dob.toString();
    dispatch(addStudent(payload));
    resetForm();
  };

  useEffect(() => {
    if (message || error) {
      handleNotification(message, error);
    }
  }, [message, error]);

  const handleNotification = (message, error) => {
    setShowMessage(message || error);
    if (error) {
      setErrorMessage(true);
    }
    dispatch(resetStudent());
    setIsLoading(false);
    setTimeout(() => {
      setShowMessage(null);
      setErrorMessage(false);
    }, 2000);
  };

  const handleBack = () => {
    navigate("/students");
  };

  return (
    <>
      {showMessage && (
        <Alert severity={errorMessage ? "error" : "success"} variant="filled">
          {showMessage}
        </Alert>
      )}
      <PageLoading loading={isLoading} />
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={6} textAlign="left">
          <Typography variant="h5">
            <strong>Student</strong>
          </Typography>
          <Typography variant="body2">Add your student</Typography>
        </Grid>
      </Grid>
      <Paper className="form-card-ui">
        <Formik
          enableReinitialize
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={handeSave}
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign="left">
                  <TextField
                    error={errors.firstName && touched.firstName}
                    id="firstName"
                    label="First Name"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.firstName}
                    helperText={
                      errors.firstName && touched.firstName && errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign="left">
                  <TextField
                    error={errors.familyName && touched.familyName}
                    id="familyName"
                    label="Family Name"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.familyName}
                    helperText={
                      errors.familyName &&
                      touched.familyName &&
                      errors.familyName
                    }
                  />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign="left">
                  <TextField
                    error={errors.email && touched.email}
                    id="email"
                    label="Email"
                    fullWidth
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email && touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign="left">
                  <DatePicker
                    id="dob"
                    name="dob"
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Date of Birth"
                    selected={values?.dob}
                    onChange={(date) => setFieldValue("dob", date)}
                    onBlur={handleBlur}
                    className={`form-control ${
                      errors.dob && touched.dob ? "is-invalid" : ""
                    }`}
                  />
                  {errors.dob && touched.dob && (
                    <div className="invalid-feedback">{errors.dob}</div>
                  )}
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: 1 }} textAlign="right">
                  <Button
                    variant="outlined"
                    type="button"
                    sx={{ marginRight: 1 }}
                    label="Cancel"
                    loading={isLoading}
                    onClick={handleBack}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    label="Save"
                    loading={isLoading}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};
export default StudentForm;
