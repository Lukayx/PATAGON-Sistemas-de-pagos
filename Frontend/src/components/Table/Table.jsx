import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import styles from "../Table/Table.module.css";

/**
 * Componente de tabla reutilizable con paginación y ordenamiento.
 *
 * @component
 * @param {Object[]} columns - Definición de las columnas para la tabla, compatible con react-table.
 * @param {Object[]} data - Datos a mostrar en la tabla.
 * @param {function} [actionsRenderer] - Función opcional que recibe el objeto original de la fila y retorna elementos JSX para acciones personalizadas.
 *
 * @example
 * <TableComponent
 *   columns={columns}
 *   data={data}
 *   actionsRenderer={(row) => <button onClick={() => handleEdit(row)}>Editar</button>}
 * />
 *
 * @returns {JSX.Element} Tabla con paginación, ordenamiento y acciones personalizadas por fila.
 */
const TableComponent = ({ columns, data, actionsRenderer }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      },
      sortTypes: {
        alphanumeric: (rowA, rowB, columnId) => {
          const a = rowA.values[columnId]?.toLowerCase() || "";
          const b = rowB.values[columnId]?.toLowerCase() || "";
          return a < b ? -1 : a > b ? 1 : 0;
        },
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className={styles.tableWrapper}>
        <table {...getTableProps()} className={styles.table}>
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restHeaderGroupProps} className={styles.tr}>
                  {headerGroup.headers.map((column) => {
                    const { key, ...restHeaderProps } = column.getHeaderProps(
                      column.getSortByToggleProps()
                    );
                    return (
                      <th
                        key={key}
                        {...restHeaderProps}
                        className={`${styles.th} ${styles.headerColumn}`}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr key={key} {...restRowProps} className={styles.tr}>
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td key={key} {...restCellProps} className={styles.td}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                  {actionsRenderer && (
                    <td className={styles.actions}>
                      {actionsRenderer(row.original)}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"} Anterior
        </button>
        <span>
          Página{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Siguiente {">"}
        </button>
      </div>
    </>
  );
};

export default TableComponent;