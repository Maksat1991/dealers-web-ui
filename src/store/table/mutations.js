export const updateTable = (state, table) => {
  state.table = table;
};

export const updateCell = (state, [value, rowIndex, cellIndex]) => {
  const currentRow = state.table.find(row => row.number === rowIndex);
  const currentCell = currentRow.cells.find(cell => cell.number === cellIndex);
  currentCell.value = value;
};

export const removeRow = (state, rowIndex) => {
  state.table = state.table.filter(row => row.number !== rowIndex);
};
