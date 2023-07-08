import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, RoomService } from "@mui/icons-material";
import {
  MealTypeGet,
  MealTypePost,
  MealTypePut,
} from "../../mealtypes/mealTypeModel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteMealType,
  GetAllMealTypes,
  PostMealType,
  PutMealType,
} from "../../mealtypes/mealTypeSlice";
import CreateNewMealTypeModal from "./mealTypeCreateAdminModal";
import UpdateMealTypeModal from "./mealTypeUpdateAdminModal";

const MealTypeAdminPage = () => {
  const appDispatch = useAppDispatch();
  const { allMealTypes } = useAppSelector((state) => state.mealTypes);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateMealType, setUpdateMealType] = useState<MealTypePut>({
    mealTypeId: "",
    mealName: "",
    mealPrice: 0,
    mealPriceId: "",
  });
  const [tableDataChanges, setTableDataChanges] = useState(0);

  useEffect(() => {
    appDispatch(GetAllMealTypes());
  }, [tableDataChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditClick = (obj: MealTypePut) => {
    setUpdateMealType(obj);
    setUpdateModalOpen(true);
  };

  const handleCreateNewRow = (obj: MealTypePost) => {
    appDispatch(PostMealType(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleUpdateRow = (obj: MealTypePut) => {
    appDispatch(PutMealType(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<MealTypeGet>) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("mealName")}`
        )
      ) {
        return;
      }
      appDispatch(DeleteMealType(row.getValue("mealTypeId")));
      setTableDataChanges(tableDataChanges + 1);
    },
    [tableDataChanges] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const columns = useMemo<MRT_ColumnDef<MealTypeGet>[]>(
    () => [
      {
        accessorKey: "mealTypeId",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "mealName",
        header: "Meal Name",
        size: 140,
      },
      {
        accessorKey: "mealPrice",
        header: "Meal Price",
        size: 140,
      },
      {
        accessorKey: "mealPriceId",
        header: "Meal Price Id",
        size: 140,
      },
    ],
    []
  );

  return (
    <>
      <h1>MealTypes</h1>
      <MaterialReactTable
        columns={columns}
        data={allMealTypes}
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() =>
                  handleEditClick({
                    mealTypeId: row.getValue("mealTypeId"),
                    mealName: row.getValue("mealName"),
                    mealPrice: row.getValue("mealPrice"),
                    mealPriceId: row.getValue("mealPriceId"),
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
            Create New MealType
          </Button>
        )}
      />
      <CreateNewMealTypeModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <UpdateMealTypeModal
        row={updateMealType}
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateRow}
      />
    </>
  );
};

export default MealTypeAdminPage;
