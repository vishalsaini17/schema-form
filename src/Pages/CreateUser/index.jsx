import { Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormRender from "../../components/FormRender";
import userFormSchema from "../../FormSchema/userForm.schema.json";
import { createUser } from "../../Redux/slices/usersSlice";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = (data) => {
    dispatch(createUser(data));
    navigate("/users");
  };

  return (
    <Paper sx={{ p: 2 }}>
      <FormRender schema={userFormSchema} onSubmit={submit} />
    </Paper>
  );
};

export default CreateUser;
