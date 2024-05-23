import { AddCircle } from '@mui/icons-material';
import { Button, Paper } from "@mui/material";

const Home = () => {
  return (
    <>
      <Paper sx={{ p: 2, mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained"><AddCircle sx={{ mr: 1 }} /> Create User</Button>
      </Paper>
      <Paper sx={{ p: 2 }}>
        lorem ipsum
      </Paper>
    </>
  );
}

export default Home;