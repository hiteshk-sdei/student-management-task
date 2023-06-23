import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableNoRecordFound from "../../Components/Table/TableNoRecordFound";
import ConfirmationModal from "../../Components/Modal/ConfirmationModal";
import { resetCourse } from "../../Redux/Slice/CourseSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { TIMEOUT_TIME } from "../../Utilis/Utilis";
import { deleteCourse, getCourseList } from "../../Api/CourseApi";

const CourseListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const { message, error, courseList } = useSelector((state) => {
    return {
      courseList: state.course.courseList,
      message: state?.course?.message,
      error: state?.course?.error,
    };
  });

  const handleDelete = () => {
    dispatch(deleteCourse(openModal));
  };

  useEffect(() => {
    dispatch(getCourseList());
    setTimeout(() => {
      setIsLoading(false);
    }, TIMEOUT_TIME);
  }, []);

  useEffect(() => {
    if (message) {
      handleNotification(message, true);
    } else if (error) {
      handleNotification(error, false);
    }
  }, [message, error]);

  const handleNotification = (notification, isSuccess) => {
    dispatch(resetCourse());
    setOpenModal(null);
    if (isSuccess) {
      dispatch(getCourseList());
    }
    setShowMessage(notification);
    setTimeout(() => {
      setShowMessage(null);
    }, 2000);
  };

  return (
    <>
      {showMessage && (
        <Alert severity="success" variant="filled">
          {showMessage}
        </Alert>
      )}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={6} textAlign="left">
          <Typography variant="h5">
            <strong>Courses</strong>
          </Typography>
          <Typography variant="body2">Manage your course(s)</Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              courseList?.map((course, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {course.courseName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton
                        color="error"
                        aria-label="Delete"
                        component="label"
                        onClick={() => setOpenModal(course.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            {(!courseList?.length || isLoading) && (
              <TableNoRecordFound colSpan="3" loading={isLoading} />
            )}
          </TableBody>
        </Table>
        <ConfirmationModal
          openModal={openModal}
          closeModal={(val) => (val ? handleDelete() : setOpenModal(false))}
        />
      </TableContainer>
    </>
  );
};
export default CourseListing;
