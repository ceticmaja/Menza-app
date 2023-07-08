import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  FacultyGet,
  FacultyPost,
  FacultyPut,
} from "../../faculties/facultyModel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteFaculty,
  GetAllFaculties,
  PostFaculty,
  PutFaculty,
} from "../../faculties/facultySlice";
import CreateNewFacultyModal from "./facultyCreateAdminModal";
import UpdateFacultyModal from "./facultyUpdateAdminModal";

const FacultyAdminPage = () => {
  const appDispatch = useAppDispatch();
  const { allFaculties } = useAppSelector((state) => state.faculties);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateFaculty, setUpdateFaculty] = useState<FacultyPut>({
    facultyId: "",
    facultyName: "",
    facultyCity: "",
    facultyAddress: "",
  });
  const [tableDataChanges, setTableDataChanges] = useState(0);

  useEffect(() => {
    appDispatch(GetAllFaculties());
  }, [tableDataChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditClick = (obj: FacultyPut) => {
    setUpdateFaculty(obj);
    setUpdateModalOpen(true);
  };

  const handleCreateNewRow = (obj: FacultyPost) => {
    appDispatch(PostFaculty(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleUpdateRow = (obj: FacultyPut) => {
    appDispatch(PutFaculty(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<FacultyGet>) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("facultyName")}`
        )
      ) {
        return;
      }
      appDispatch(DeleteFaculty(row.getValue("facultyId")));
      setTableDataChanges(tableDataChanges + 1);
    },
    [tableDataChanges] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const columns = useMemo<MRT_ColumnDef<FacultyGet>[]>(
    () => [
      {
        accessorKey: "facultyId",
        header: "FacultyID",
        enableColumnOrdering: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "facultyName",
        header: "FacultyName",
        size: 140,
      },
      {
        accessorKey: "facultyCity",
        header: "FacultyCity",
        size: 140,
      },
      {
        accessorKey: "facultyAddress",
        header: "FacultyAddress",
        size: 140,
      },
    ],
    []
  );

  return (
    <>
      <h1>Facultys</h1>
      <MaterialReactTable
        columns={columns}
        data={allFaculties}
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() =>
                  handleEditClick({
                    facultyId: row.getValue("facultyId"),
                    facultyName: row.getValue("facultyName"),
                    facultyCity: row.getValue("facultyCity"),
                    facultyAddress: row.getValue("facultyAddress"),
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
            Create New Faculty
          </Button>
        )}
      />
      <CreateNewFacultyModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <UpdateFacultyModal
        row={updateFaculty}
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateRow}
      />
    </>
  );
};

export default FacultyAdminPage;
