import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { MenuGet, MenuPost, MenuPut } from "../../menus/menuModel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteMenu,
  GetAllMenus,
  PostMenu,
  PutMenu,
} from "../../menus/menuSlice";
import CreateNewMenuModal from "./menuCreateAdminModal";
import UpdateMenuModal from "./menuUpdateAdminModal";

const MenuAdminPage = () => {
  const appDispatch = useAppDispatch();
  const { allMenus } = useAppSelector((state) => state.menus);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateMenu, setUpdateMenu] = useState<MenuPut>({
    menuId: "",
    publishDate: new Date(0),
    editDate: new Date(0),
    description: "",
    userId: "",
  });
  const [tableDataChanges, setTableDataChanges] = useState(0);

  useEffect(() => {
    appDispatch(GetAllMenus());
  }, [tableDataChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditClick = (obj: MenuPut) => {
    setUpdateMenu(obj);
    setUpdateModalOpen(true);
  };

  const handleCreateNewRow = (obj: MenuPost) => {
    appDispatch(PostMenu(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleUpdateRow = (obj: MenuPut) => {
    appDispatch(PutMenu(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<MenuGet>) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("menuId")}`
        )
      ) {
        return;
      }
      appDispatch(DeleteMenu(row.getValue("menuId")));
      setTableDataChanges(tableDataChanges + 1);
    },
    [tableDataChanges] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const columns = useMemo<MRT_ColumnDef<MenuGet>[]>(
    () => [
      {
        accessorKey: "menuId",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "publishDate",
        header: "Publish Date",
        size: 140,
      },
      {
        accessorKey: "editDate",
        header: "Edit Date",
        size: 140,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 140,
      },
      {
        accessorKey: "user.id",
        header: "User Id",
        size: 140,
      },
    ],
    []
  );

  return (
    <>
      <h1>Menus</h1>
      <MaterialReactTable
        columns={columns}
        data={allMenus}
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() =>
                  handleEditClick({
                    menuId: row.getValue("menuId"),
                    publishDate: row.getValue("publishDate"),
                    editDate: row.getValue("editDate"),
                    description: row.getValue("description"),
                    userId: row.getValue("user.id"),
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
          <>
            <Button
              color="primary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Menu
            </Button>
          </>
        )}
      />
      <CreateNewMenuModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <UpdateMenuModal
        row={updateMenu}
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateRow}
      />
    </>
  );
};

export default MenuAdminPage;
