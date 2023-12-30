import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MKBox from "components/MKBox";
import { Container } from "@mui/material";

export const MKLineChart = (data) => (
  <MKBox
    variant="gradient"
    borderRadius="10px"
    bgColor="dark"
    p={10}
    sx={{
      margin: "0 auto 20px",
      display: "flex",
      alignItems: "center",
    }}
  >
    <Container>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="votes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  </MKBox>
);
