import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  CountryGet,
  CountryPost,
  CountryPut,
} from "../../countries/countryModel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteCountry,
  GetAllCountries,
  PostCountry,
  PutCountry,
} from "../../countries/countrySlice";
import CreateNewCountryModal from "./countryCreateAdminModal";
import UpdateCountryModal from "./countryUpdateAdminModal";

const CountryAdminPage = () => {
  const appDispatch = useAppDispatch();
  const { allCountries } = useAppSelector((state) => state.countries);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateCountry, setUpdateCountry] = useState<CountryPut>({
    countryId: "",
    countryName: "",
  });
  const [tableDataChanges, setTableDataChanges] = useState(0);

  useEffect(() => {
    appDispatch(GetAllCountries());
  }, [tableDataChanges]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditClick = (obj: CountryPut) => {
    setUpdateCountry(obj);
    setUpdateModalOpen(true);
  };

  const handleCreateNewRow = (obj: CountryPost) => {
    appDispatch(PostCountry(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleUpdateRow = (obj: CountryPut) => {
    appDispatch(PutCountry(obj));
    setTableDataChanges(tableDataChanges + 1);
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<CountryGet>) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("countryName")}`
        )
      ) {
        return;
      }
      appDispatch(DeleteCountry(row.getValue("countryId")));
      setTableDataChanges(tableDataChanges + 1);
    },
    [tableDataChanges] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const columns = useMemo<MRT_ColumnDef<CountryGet>[]>(
    () => [
      {
        accessorKey: "countryId",
        header: "Country ID",
        enableColumnOrdering: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "countryName",
        header: "Countryname",
        size: 140,
      },
    ],
    []
  );

  return (
    <>
      <h1>Countries</h1>
      <MaterialReactTable
        columns={columns}
        data={allCountries}
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() =>
                  handleEditClick({
                    countryId: row.getValue("countryId"),
                    countryName: row.getValue("countryName"),
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
            Create New Country
          </Button>
        )}
      />
      <CreateNewCountryModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <UpdateCountryModal
        row={updateCountry}
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateRow}
      />
    </>
  );
};

export default CountryAdminPage;
