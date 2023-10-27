import React, { useRef, useState } from "react";
import Header from "../components/Header";
import SendIcon from "@mui/icons-material/Send";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import eventImg from "../assets/img/event.png";
import { UploadFile } from "@mui/icons-material";
import { useEventGlobalContext } from "context/eventsContext";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  eventImage: Yup.mixed().required("Event Image is required"),
  date: Yup.date().required("Date is required"),
});

function AddEvents() {
  const [imageURL, setImageURL] = useState(null);
  const { addEvents } = useEventGlobalContext();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      eventImage: null,
      publishEvent: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const eventData = new FormData();

      eventData.append("title", values.title);
      eventData.append("description", values.description);
      eventData.append("cover_Image", values.eventImage);
      eventData.append("publish", values.publishEvent);
      eventData.append("date", values.date);

      addEvents(eventData);
    },
  });

  const fileInputRef = useRef();

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("eventImage", file);
    if (file) {
      // Display the selected image
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Header title="Add Events" />

            <Card className="demo-icons">
              <CardBody className="all-icons">
                <Grid container>
                  <Grid sm={12} md={6} className="p-4">
                    <form
                      onSubmit={formik.handleSubmit}
                      className="p-4 space-y-4">
                      <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                      />

                      <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.description &&
                          Boolean(formik.errors.description)
                        }
                        helperText={
                          formik.touched.description &&
                          formik.errors.description
                        }
                      />

                      <TextField
                        label="Event's Date"
                        variant="outlined"
                        fullWidth
                        id="date"
                        type="date"
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.date && Boolean(formik.errors.date)
                        }
                        helperText={formik.touched.date && formik.errors.date}
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            id="publishEvent"
                            name="publishEvent"
                            labelStyle={{ color: "#000" }}
                            iconStyle={{ fill: "white", background: "#000" }}
                            checked={formik.values.publishEvent}
                            onChange={formik.handleChange}
                          />
                        }
                        label="Publish Event"
                      />
                      <Box>
                        {imageURL && (
                          <img src={imageURL} alt="Selected Event" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          onChange={handleFileInputChange}
                          id="eventImage"
                          name="eventImage"
                        />
                        {imageURL ? (
                          <label
                            htmlFor="eventImage"
                            className="sm:w-[38%] w-[100%] cursor-pointer">
                            <Box
                              className=" flex items-center space-x-2 px-2 justify-center rounded-sm shadow-md mt-2  py-2 w-full"
                              sx={{
                                bgcolor: "#e3caca",
                                color: "#5e0001",
                                "&:hover": {
                                  bgcolor: "#5e0001",
                                  color: "#fff",
                                },
                              }}>
                              <UploadFile />
                              <Typography variant="body1">
                                Change Event Image
                              </Typography>
                            </Box>
                          </label>
                        ) : (
                          <label
                            htmlFor="eventImage"
                            className="w-full cursor-pointer">
                            <Box
                              className=" py-28 w-full"
                              style={{
                                display: "grid",
                                placeItems: "center",
                                border: "2px dashed #5e0001",
                              }}>
                              <UploadFile />
                              <Typography variant="body1">
                                Select Event Image
                              </Typography>
                            </Box>
                          </label>
                        )}

                        {formik.touched.eventImage &&
                          formik.errors.eventImage && (
                            <Typography color="error" variant="body2">
                              {formik.errors.eventImage}
                            </Typography>
                          )}
                      </Box>
                      <Button
                        type="submit"
                        disableElevation
                        variant="contained"
                        color="primary"
                        sx={{
                          background: "#5e0001",
                          border: "1px solid #fff",
                          "&:hover": {
                            background: "transparent",
                            color: "#5e0001",
                            border: "1px solid #5e0001",
                          },
                        }}>
                        Add Event
                      </Button>
                    </form>
                  </Grid>
                  <Grid sm={12} md={6} className="">
                    {/* <img src={eventImg} /> */}
                  </Grid>
                </Grid>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddEvents;
