import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormRender from "../../components/FormRender";
import userFormSchema from "../../FormSchema/userForm.schema.json";
import { getUserFromId, updateUser } from "../../Redux/slices/usersSlice";

const EditUser = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUserFromId(id)) || {};

  const submit = (formData) => {
    console.log("formData", formData);
    dispatch(updateUser({ id: id, ...formData }));
    navigate("/users")
  };

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <FormRender schema={userFormSchema} initialData={user} onSubmit={submit} />
      </Paper>
    </>
  );
};

export default EditUser;
