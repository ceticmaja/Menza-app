import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { RoleGet, RolePost, RolePut } from "../../roles/roleModel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteRole,
  GetAllRoles,
  PostRole,
  PutRole,
} from "../../roles/roleSlice";
import CreateNewRoleModal from "./roleCreateAdminModal";
import UpdateRoleModal from "./roleUpdateAdminModal";

const RoleAdminPage = () => {
  const appDispatch = useAppDispatch();
  const { allRoles } = useAppSelector((state) => state.roles);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateRole, setUpdateRole] = useState<RolePut>({ id: "", name: "" });
  const [tableDataChanges, setTableDataChanges] = useState(0);

  useEffect(() => {
    appDispatch(GetAllRoles());
  }, [tableDataChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditClick = (obj: RolePut) => {
    setUpdateRole(obj);
    setUpdateModalOpen(true);
  };

  const handleCreateNewRow = (obj: RolePost) => {
    appDispatch(PostRole(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleUpdateRow = (obj: RolePut) => {
    appDispatch(PutRole(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<RoleGet>) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("name")}`
        )
      ) {
        return;
      }
      appDispatch(DeleteRole(row.getValue("id")));
      setTableDataChanges(tableDataChanges + 1);
    },
    [tableDataChanges] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const columns = useMemo<MRT_ColumnDef<RoleGet>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
      },
    ],
    []
  );

  return (
    <>
      <h1>Roles</h1>
      <MaterialReactTable
        columns={columns}
        data={allRoles}
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
            Create New Role
          </Button>
        )}
      />
      <CreateNewRoleModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <UpdateRoleModal
        row={updateRole}
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateRow}
      />
    </>
  );
};

export default RoleAdminPage;
