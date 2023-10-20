import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "@mui/material";
import "./App.css";
import TabOneComponent from "./components/tab-one";
import TabTwoComponent from "./components/tab-two";
import { useFormik } from "formik";
import * as Yup from "yup";

function App() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const validationSchema = Yup.object({
    campaignName: Yup.string().required("Vui lòng nhập Tên chiến dịch"),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      campaignName: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const storedCampaigns = localStorage.getItem("campaigns");
      if (validationSchema.isValidSync(values)) {
        // Lưu dữ liệu vào localStorage
        localStorage.setItem("formData", JSON.stringify(values));
        alert("Biểu mẫu đã được gửi: " + JSON.stringify(values, null, 2));
        alert("Biểu mẫu đã được gửi: " + storedCampaigns);
      } else {
        alert("Biểu mẫu không hợp lệ. Vui lòng kiểm tra lại!");
      }
    },
  });

  return (
    <div className="container">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          const hasZeroAdvertiseCount = localStorage.getItem(
            "hasZeroAdvertiseCount"
          );
          if (hasZeroAdvertiseCount === "false") {
            formik.handleSubmit();
          } else {
            alert("Biểu mẫu không hợp lệ. Vui lòng kiểm tra lại!");
          }
        }}
      >
        Submit
      </Button>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="THÔNG TIN" />
        <Tab label="CHIẾN DỊCH CON" />
      </Tabs>
      {selectedTab === 0 && <TabOneComponent formik={formik} />}
      {selectedTab === 1 && <TabTwoComponent />}
    </div>
  );
}

export default App;
