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
  Alert,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableNoRecordFound from "../../Components/Table/TableNoRecordFound";
import { resetResult } from "../../Redux/Slice/ResultSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../Components/Modal/ConfirmationModal";
import { TIMEOUT_TIME } from "../../Utilis/Utilis";
import { deleteResult, getResultList } from "../../Api/ResultApi";

const ResultListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const { message, error, resultList, courseList, studentList } = useSelector(
    (state) => {
      return {
        resultList: state.result.resultList,
        message: state?.result?.message,
        error: state?.result?.error,
        courseList: state.course.courseList,
        studentList: state.student.studentList,
      };
    }
  );

  const handleDelete = () => {
    dispatch(deleteResult(openModal));
  };

  useEffect(() => {
    dispatch(getResultList());
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
    dispatch(resetResult());
    setOpenModal(null);
    if (isSuccess) {
      dispatch(getResultList());
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
            <strong>Results</strong>
          </Typography>
          <Typography variant="body2">Manage your result(s)</Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              resultList?.map((result, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {/* {courseList?.find((course)=>course.id===result.course)?.name} */}
                      {result.course?.courseName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {/* {studentList?.find((student)=>student.id===result.student)?.name} */}
                      {result.student?.firstName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {result.score}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton
                        color="error"
                        aria-label="Delete"
                        component="label"
                        onClick={() => setOpenModal(result.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            {(!resultList?.length || isLoading) && (
              <TableNoRecordFound colSpan="7" loading={isLoading} />
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
export default ResultListing;
