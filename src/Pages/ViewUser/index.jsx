import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserFromId } from "../../Redux/slices/usersSlice";

const ViewUser = () => {
  let { id } = useParams();
  const user = useSelector(getUserFromId(id)) || {};

  return (
    <Paper sx={{ p: 2 }}>
      <pre style={{ maxWidth: "100%", display: "block", overflow: "auto", whiteSpace: "normal" }}>
        {JSON.stringify(user)}
      </pre>
    </Paper>
  );
};

export default ViewUser;
