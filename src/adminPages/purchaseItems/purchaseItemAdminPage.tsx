import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  PurchaseItemGet,
  PurchaseItemPost,
  PurchaseItemPut,
} from "../../purchaseitems/purchaseItemModel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeletePurchaseItem,
  GetAllPurchaseItems,
  PostPurchaseItem,
  PutPurchaseItem,
} from "../../purchaseitems/purchaseItemSlice";
import CreateNewPurchaseItemModal from "./purchaseItemCreateAdminModal";
import UpdatePurchaseItemModal from "./purchaseItemUpdateAdminModal";

const PurchaseItemAdminPage = () => {
  const appDispatch = useAppDispatch();
  const { allPurchaseItems } = useAppSelector((state) => state.purchaseitems);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatePurchaseItem, setUpdatePurchaseItem] = useState<PurchaseItemPut>(
    {
      purchaseItemId: "",
      purchaseQuantity: "",
      purchaseHistoryId: "",
      mealTypeId: "",
    }
  );
  const [tableDataChanges, setTableDataChanges] = useState(0);

  useEffect(() => {
    appDispatch(GetAllPurchaseItems());
  }, [tableDataChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditClick = (obj: PurchaseItemPut) => {
    setUpdatePurchaseItem(obj);
    setUpdateModalOpen(true);
  };

  const handleCreateNewRow = (obj: PurchaseItemPost) => {
    appDispatch(PostPurchaseItem(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleUpdateRow = (obj: PurchaseItemPut) => {
    appDispatch(PutPurchaseItem(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<PurchaseItemGet>) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("purchaseItemId")}`
        )
      ) {
        return;
      }
      appDispatch(DeletePurchaseItem(row.getValue("purchaseItemId")));
      setTableDataChanges(tableDataChanges + 1);
    },
    [tableDataChanges] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const columns = useMemo<MRT_ColumnDef<PurchaseItemGet>[]>(
    () => [
      {
        accessorKey: "purchaseItemId",
        header: "PurchaseItemID",
        enableColumnOrdering: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "purchaseQuantity",
        header: "PurchaseQuantity",
        size: 140,
      },
      {
        accessorKey: "purchaseHistory.purchaseHistoryId",
        header: "Purchase History ID",
        size: 140,
      },
      {
        accessorKey: "purchaseHistory.purchaseDate",
        header: "Purchase Date",
        size: 140,
      },
      {
        accessorKey: "mealType.mealTypeId",
        header: "MealTypeId",
        size: 140,
        hide: "true",
      },
      {
        accessorKey: "mealType.mealName",
        header: "MealName",
        size: 140,
      },
    ],
    []
  );

  return (
    <>
      <h1>PurchaseItems</h1>
      <MaterialReactTable
        columns={columns}
        data={allPurchaseItems}
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() =>
                  handleEditClick({
                    purchaseItemId: row.getValue("purchaseItemId"),
                    purchaseQuantity: row.getValue("purchaseQuantity"),
                    purchaseHistoryId: row.getValue(
                      "purchaseHistory.purchaseHistoryId"
                    ),
                    mealTypeId: row.getValue("mealType.mealTypeId"),
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
            Create New PurchaseItem
          </Button>
        )}
      />
      <CreateNewPurchaseItemModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <UpdatePurchaseItemModal
        row={updatePurchaseItem}
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateRow}
      />
    </>
  );
};

export default PurchaseItemAdminPage;
