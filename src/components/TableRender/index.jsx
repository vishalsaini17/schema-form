import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

const TableRender = ({
  headers = [],
  data = [],
  title,
  itemsPerPageOptions = [10, 25, 50, 100],
  search = false,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = data.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (aValue == null || bValue == null) return 0;
    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
  });

  const filteredData = searchQuery
    ? sortedData.filter((row) =>
        headers.some((header) => {
          if (header.field && row[header.field]) {
            const cellValue = String(row[header.field]).toLowerCase();
            if (header.render) {
              return header
                .render(row)
                .toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            } else {
              return cellValue.includes(searchQuery.toLowerCase());
            }
          }
          return false;
        })
      )
    : sortedData;

  return (
    <div>
      <Grid container>
        <Grid item marginRight={"auto"}>
          {title && <h2>{title}</h2>}
        </Grid>
        {search && (
          <Grid item xs={5} sm={3}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        )}
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.field}>
                {header.sorting ? (
                  <TableSortLabel
                    active={orderBy === header.field}
                    direction={orderBy === header.field ? order : "asc"}
                    onClick={handleSort(header.field)}
                  >
                    {header.title}
                  </TableSortLabel>
                ) : (
                  header.title
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? filteredData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : filteredData
          ).map((row, index) => (
            <TableRow key={index}>
              {headers.map((header, headerIndex) => (
                <TableCell key={headerIndex}>
                  {header.render ? header.render(row) : row[header.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={itemsPerPageOptions}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

TableRender.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      render: PropTypes.func,
      sorting: PropTypes.bool,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  search: PropTypes.bool,
};

export default TableRender;
