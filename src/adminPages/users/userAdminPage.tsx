import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { UserGet, UserPost, UserPut } from "../../users/userModel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteUser,
  GetAllUsers,
  PostUser,
  PutUser,
} from "../../users/userSlice";
import CreateNewUserModal from "./userCreateAdminModal";
import UpdateUserModal from "./userUpdateAdminModal";

const UserAdminPage = () => {
  const appDispatch = useAppDispatch();
  const { allUsers } = useAppSelector((state) => state.users);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState<UserPut>({
    id: "",
    name: "",
    surname: "",
    dateOfBirth: new Date(0),
    address: "",
    city: "",
    countryId: "",
    facultyId: "",
    email: "",
    userName: "",
  });
  const [tableDataChanges, setTableDataChanges] = useState(0);

  useEffect(() => {
    appDispatch(GetAllUsers());
  }, [tableDataChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditClick = (obj: UserPut) => {
    setUpdateUser(obj);
    setUpdateModalOpen(true);
  };

  const handleCreateNewRow = (obj: UserPost) => {
    appDispatch(PostUser(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleUpdateRow = (obj: UserPut) => {
    appDispatch(PutUser(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<UserGet>) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("name")}`
        )
      ) {
        return;
      }
      appDispatch(DeleteUser(row.getValue("id")));
      setTableDataChanges(tableDataChanges + 1);
    },
    [tableDataChanges] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const columns = useMemo<MRT_ColumnDef<UserGet>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "userName",
        header: "Username",
        size: 140,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 140,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
      },
      {
        accessorKey: "surname",
        header: "Surame",
        size: 140,
      },
      {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
        size: 140,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 140,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 140,
      },
      {
        accessorKey: "country.countryId",
        header: "Country Id",
        size: 140,
        hide: true,
      },
      {
        accessorKey: "country.countryName",
        header: "Country Name",
        size: 140,
      },
      {
        accessorKey: "faculty.facultyId",
        header: "Faculty Id",
        size: 140,
        hide: true,
      },
      {
        accessorKey: "faculty.facultyName",
        header: "Faculty Name",
        size: 140,
      },
    ],
    []
  );

  return (
    <>
      <h1>Users</h1>
      <MaterialReactTable
        columns={columns}
        data={allUsers}
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() =>
                  handleEditClick({
                    id: row.getValue("id"),
                    name: row.getValue("name"),
                    surname: row.getValue("surname"),
                    dateOfBirth: row.getValue("dateOfBirth"),
                    address: row.getValue("address"),
                    city: row.getValue("city"),
                    countryId: row.getValue("country.countryId"),
                    facultyId: row.getValue("faculty.facultyId"),
                    email: row.getValue("email"),
                    userName: row.getValue("userName"),
                  })
                }
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="primary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New User
          </Button>
        )}
      />
      <CreateNewUserModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <UpdateUserModal
        row={updateUser}
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateRow}
      />
    </>
  );
};

export default UserAdminPage;
