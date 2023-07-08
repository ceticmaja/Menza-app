import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  PurchaseHistoryGet,
  PurchaseHistoryPost,
  PurchaseHistoryPut,
} from "../../purchasehistories/purchaseHistoryModel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeletePurchaseHistory,
  GetAllPurchaseHistories,
  PostPurchaseHistory,
  PutPurchaseHistory,
} from "../../purchasehistories/purchaseHistorySlice";
import CreateNewPurchaseHistoryModal from "./purchaseHistoryCreateAdminModal";
import UpdatePurchaseHistoryModal from "./purchaseHistoryUpdateAdminModal";

const PurchaseHistoryAdminPage = () => {
  const appDispatch = useAppDispatch();
  const { allPurchaseHistories } = useAppSelector(
    (state) => state.purchasehistories
  );
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatePurchaseHistory, setUpdatePurchaseHistory] =
    useState<PurchaseHistoryPut>({
      purchaseHistoryId: "",
      purchaseDate: new Date(0),
      createdBy: "",
      status: "",
    });
  const [tableDataChanges, setTableDataChanges] = useState(0);

  useEffect(() => {
    appDispatch(GetAllPurchaseHistories());
  }, [tableDataChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditClick = (obj: PurchaseHistoryPut) => {
    setUpdatePurchaseHistory(obj);
    setUpdateModalOpen(true);
  };

  const handleCreateNewRow = (obj: PurchaseHistoryPost) => {
    appDispatch(PostPurchaseHistory(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleUpdateRow = (obj: PurchaseHistoryPut) => {
    appDispatch(PutPurchaseHistory(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<PurchaseHistoryGet>) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("purchaseHistoryId")}`
        )
      ) {
        return;
      }
      appDispatch(DeletePurchaseHistory(row.getValue("purchaseHistoryId")));
      setTableDataChanges(tableDataChanges + 1);
    },
    [tableDataChanges] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const columns = useMemo<MRT_ColumnDef<PurchaseHistoryGet>[]>(
    () => [
      {
        accessorKey: "purchaseHistoryId",
        header: "purchaseHistory ID",
        enableColumnOrdering: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "purchaseDate",
        header: "Date of purchase",
        size: 140,
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        size: 140,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 140,
      },
    ],
    []
  );

  return (
    <>
      <h1>PurchaseHistories</h1>
      <MaterialReactTable
        columns={columns}
        data={allPurchaseHistories}
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() =>
                  handleEditClick({
                    purchaseHistoryId: row.getValue("purchaseHistoryId"),
                    purchaseDate: row.getValue("purchaseDate"),
                    createdBy: row.getValue("createdBy"),
                    status: row.getValue("status"),
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
            Create New PurchaseHistory
          </Button>
        )}
      />
      <CreateNewPurchaseHistoryModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <UpdatePurchaseHistoryModal
        row={updatePurchaseHistory}
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateRow}
      />
    </>
  );
};

export default PurchaseHistoryAdminPage;
