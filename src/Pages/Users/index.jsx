import { AddCircle } from "@mui/icons-material";
import { Button, Paper } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, userListSelector } from "../../Redux/slices/usersSlice";
import ConfirmDialog from "../../components/ConfirmDialog";
import TableRender from "../../components/TableRender";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector(userListSelector);
  const [deleteingUser, setDeletingUsser] = useState(null);

  const handleDelete = (rowData) => (e) => {
    console.log("delete rowData", rowData);
    setDeletingUsser(rowData);
  };

  const handleEdit = (rowData) => (e) => {
    navigate("/users/edit/"+rowData.id)
  }

  const headers = [
    {
      field: "id",
      title: "ID",
      sorting: true
    },
    {
      field: "name",
      title: "User name",
      sorting: true
    },
    {
      field: "email",
      title: "User email",
      sorting: true
    },
    {
      field: "action",
      title: "Action",
      render: (row, index) => {
        return (
          <>
            <Button onClick={()=>{navigate("/users/"+row.id)}}>View</Button>
            <Button onClick={handleEdit(row)}>Edit</Button>
            <Button onClick={handleDelete(row)}>Delete</Button>
          </>
        );
      },
    },
  ];

  const userListTableData = userList.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
  }));

  const handleAgreeDelete = () => {
    dispatch(deleteUser(deleteingUser.id));
    setDeletingUsser(null);
  };

  const handleDisagreeDelete = () => {
    setDeletingUsser(null);
  };

  return (
    <>
      <Paper sx={{ p: 2, marginBottom: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => navigate("/users/create")}>
          <AddCircle sx={{ mr: 1 }} /> Create User
        </Button>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <TableRender title={"User Table"} headers={headers} data={userListTableData} search={true} />
      </Paper>

      <ConfirmDialog
        show={deleteingUser}
        title={"Delete User"}
        message={"Do you really want to delete this user"}
        onAgree={handleAgreeDelete}
        onDisagree={handleDisagreeDelete}
      />
    </>
  );
};

export default Users;
