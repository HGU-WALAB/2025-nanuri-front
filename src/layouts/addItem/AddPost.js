import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "../../components/MDButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/axios";
import Footer from "../../examples/Footer";

function AddPost() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });
  const { title, description } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/want", inputs);
      alert("글이 등록되었습니다.");
      navigate("/items");
    } catch (e) {
      alert("등록 오류가 발생했습니다. 다시 시도해주세요.");
      window.location.reload();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Card>
              <MDBox
                mx={2}
                mb={3}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  나눔 받기 등록
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <MDBox component="form" role="form">
                    <MDBox m={3}>
                      <TextField
                        id="title"
                        label="제목"
                        name="title"
                        value={title}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </MDBox>
                    <MDBox m={3}>
                      <TextField
                        id="description"
                        label="설명"
                        name="description"
                        variant="outlined"
                        onChange={onChange}
                        value={description}
                        fullWidth
                        required
                        multiline
                        rows={8}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" mb={3}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={handleSubmit}
                        sx={{ width: "20%", whiteSpace: "nowrap" }}
                      >
                        나눔 등록
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddPost;
