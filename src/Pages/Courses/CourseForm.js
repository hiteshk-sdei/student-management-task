import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography, TextField, Alert } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCourse } from "../../Redux/Slice/CourseSlice";
import Button from "../../Components/FormElements/Button";
import PageLoading from "../../Components/PageLoading/PageLoading";
import { addCourse } from "../../Api/CourseApi";

const validationSchema = Yup.object().shape({
  courseName: Yup.string().required("Course Name is required"),
});

const formInitialValues = {
  courseName: "",
};

const CourseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const [errorMessage, setErrorMessage]= useState(false);

  const { message, error } = useSelector((state) => {
    return {
      message: state?.course?.message,
      error: state?.course?.error,
    };
  });

  const handeSave = ({ courseName }, { resetForm }) => {
    setIsLoading(true);
    const payload = {
      courseName,
    };
    dispatch(addCourse(payload));
    resetForm();
  };
  useEffect(() => {
    if (message || error) {
      handleNotification(message, error);
    }
  }, [message, error]);

  const handleNotification = (message, error) => {
    setShowMessage(message || error);
    if(error){
      setErrorMessage(true)
    }
    dispatch(resetCourse());
    setIsLoading(false);
    setTimeout(() => {
      setShowMessage(null);
      setErrorMessage(false)
    }, 2000);
  };

  const handleBack = () => {
    navigate("/courses");
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
            <strong>Course</strong>
          </Typography>
          <Typography variant="body2">Add your course</Typography>
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
                    error={errors.courseName && touched.courseName}
                    id="courseName"
                    label="Course Name"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.courseName}
                    helperText={
                      errors.courseName &&
                      touched.courseName &&
                      errors.courseName
                    }
                  />
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
export default CourseForm;
