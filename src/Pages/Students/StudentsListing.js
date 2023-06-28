import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteStudent, getStudentList } from "../../Api/StudentApi";
import ConfirmationModal from "../../Components/Modal/ConfirmationModal";
import TableNoRecordFound from "../../Components/Table/TableNoRecordFound";
import { resetStudent } from "../../Redux/Slice/StudentSlice";
import { TIMEOUT_TIME } from "../../Utilis/Utilis";

const StudentsListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const { message, error, studentList } = useSelector((state) => {
    return {
      studentList: state.student.studentList,
      message: state?.student?.message,
      error: state?.student?.error,
    };
  });

  const handleDelete = () => {
    dispatch(deleteStudent(openModal));
  };

  useEffect(() => {
    dispatch(getStudentList());
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
    dispatch(resetStudent());
    setOpenModal(null);
    if (isSuccess) {
      dispatch(getStudentList());
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
            <strong>Students</strong>
          </Typography>
          <Typography variant="body2">Manage your student(s)</Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Family Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              studentList?.map((student, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {student.firstName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {student.familyName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {student.dob}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {student.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton
                        color="error"
                        aria-label="Delete"
                        component="label"
                        onClick={() => setOpenModal(student.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            {(!studentList?.length || isLoading) && (
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
export default StudentsListing;
