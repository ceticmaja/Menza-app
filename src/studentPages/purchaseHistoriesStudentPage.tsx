import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { PurchaseHistoryGet } from "../purchasehistories/purchaseHistoryModel";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GetAllPurchaseHistoriesByCreatedBy } from "../purchasehistories/purchaseHistorySlice";

const PurchaseHistoryStudentPage = () => {
  const userId = localStorage.getItem("userId") ?? " ";
  const appDispatch = useAppDispatch();
  const { allPurchaseHistories } = useAppSelector(
    (state) => state.purchasehistories
  );

  useEffect(() => {
    appDispatch(GetAllPurchaseHistoriesByCreatedBy(userId));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        accessorKey: "status",
        header: "Status",
        size: 140,
      },
    ],
    []
  );

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Purchase Histories</h1>
      <MaterialReactTable columns={columns} data={allPurchaseHistories} />
    </>
  );
};

export default PurchaseHistoryStudentPage;
