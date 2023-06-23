import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../Components/FormElements/Button";
import { generateId } from "../../Utilis/Utilis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetResult } from "../../Redux/Slice/ResultSlice";
import PageLoading from "../../Components/PageLoading/PageLoading";
import { getCourseList } from "../../Api/CourseApi";
import { getStudentList } from "../../Api/StudentApi";
import { addResult } from "../../Api/ResultApi";

const validationSchema = Yup.object().shape({
  grade: Yup.string().required("Please select grade"),
  course: Yup.string().required("Please select course"),
  student: Yup.string().required("Please select student"),
});

const formInitialValues = {
  grade: "",
  course: "",
  student: "",
};

const ResultForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const { message, error, courseList, studentList } = useSelector((state) => {
    return {
      message: state?.result?.message,
      error: state?.result?.error,
      courseList: state?.course?.courseList,
      studentList: state?.student?.studentList,
    };
  });
  const [initialValues, setInitialValues] = useState(formInitialValues);

  const handeSave = ({ grade, course, student }, { resetForm }) => {
    setIsLoading(true);
    let id = params?.id;
    if (!id) id = generateId();
    const payload = {
      studentId: student,
      courseId: course,
      score: grade,
    };
    dispatch(addResult(payload));
    resetForm();
  };

  useEffect(() => {
    if (message || error) {
      handleNotification(message, error);
    }
  }, [message, error]);

  const handleNotification = (message, error) => {
    setShowMessage(message || error);
    dispatch(resetResult());
    if (error) {
      setErrorMessage(true);
    }
    setIsLoading(false);
    setTimeout(() => {
      setShowMessage(null);
      setErrorMessage(true);
    }, 2000);
  };

  useEffect(() => {
    dispatch(getCourseList());
    dispatch(getStudentList());
  }, []);

  const handleBack = () => {
    navigate("/results");
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
            <strong>Result</strong>
          </Typography>
          <Typography variant="body2">Add your result</Typography>
        </Grid>
      </Grid>
      <Paper className="form-card-ui">
        <Formik
          enableReinitialize
          initialValues={initialValues}
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
                  <FormControl
                    sx={{ width: "100%" }}
                    error={errors.student && touched.student}
                  >
                    <InputLabel id="student">Student</InputLabel>
                    <Select
                      labelId="student"
                      id="student"
                      value={values.student}
                      label="Student"
                      onChange={(e) => setFieldValue("student", e.target.value)}
                      onBlur={(e) => setFieldValue("student", e.target.value)}
                    >
                      {studentList?.map((student) => {
                        return (
                          <MenuItem key={student?.id} value={student?.id}>
                            {student?.firstName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {errors.student && touched.student && errors.student}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign="left">
                  <FormControl
                    sx={{ width: "100%" }}
                    error={errors.course && touched.course}
                  >
                    <InputLabel id="course">Course</InputLabel>
                    <Select
                      labelId="course"
                      id="course"
                      value={values.course}
                      label="Course"
                      onChange={(e) => setFieldValue("course", e.target.value)}
                      onBlur={(e) => setFieldValue("course", e.target.value)}
                    >
                      {courseList?.map((course) => {
                        return (
                          <MenuItem key={course?.id} value={course?.id}>
                            {course?.courseName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {errors.course && touched.course && errors.course}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign="left">
                  <FormControl
                    sx={{ width: "100%" }}
                    error={errors.grade && touched.grade}
                  >
                    <InputLabel id="course">Grade</InputLabel>
                    <Select
                      labelId="grade"
                      id="grade"
                      value={values.grade}
                      label="Grade"
                      onChange={(e) => setFieldValue("grade", e.target.value)}
                      onBlur={(e) => setFieldValue("grade", e.target.value)}
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                      <MenuItem value="F">F</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.grade && touched.grade && errors.grade}
                    </FormHelperText>
                  </FormControl>
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
export default ResultForm;
