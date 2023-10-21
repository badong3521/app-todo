import { FormikValues } from "formik";
import "./index.css";
import { Paper, TextField } from "@mui/material";

type Props = {
  formik: FormikValues;
};

export default function TabOneComponent({ formik }: Props) {
  return (
    <Paper>
      <form className="from" onSubmit={formik.handleSubmit}>
        <TextField
          id="campaignName"
          name="campaignName"
          label="Tên chiến dịch"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.campaignName}
          error={
            formik.touched.campaignName && Boolean(formik.errors.campaignName)
          }
          helperText={formik.touched.campaignName && formik.errors.campaignName}
          required
        />
        <TextField
          id="description"
          name="description"
          label="Mô tả"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </form>
    </Paper>
  );
}
