module.exports = function solveSudoku(matrix) {
  var emptyCages = getEmptyCage(matrix);
  
  for (var i = 0; i < emptyCages.length; i++) {
    var row = emptyCages[i][0];
    var col = emptyCages[i][1];
    matrix[row][col] += 1;
  
    if (matrix[row][col] > 9) {
      matrix[row][col] = 0;
      i -= 2;
      continue;
    }

    if (!cagesCorrect(matrix, row, col)) {
      i--;
    }
  }
  return matrix;
}

function getEmptyCage(matrix) {
  var emptyCagesPosition = [];
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (matrix[i][j] === 0) {
        emptyCagesPosition.push([i, j]);
      }
    }
  }
  return emptyCagesPosition;
}

function cagesCorrect(matrix, row, col) {
  return correctRow(matrix, row, col) &&
  correctCol(matrix, row, col) &&
  correctBox(matrix, row, col);
}

function correctRow(matrix, row, col) {
  for (var i = 0; i < 9; i++) {
    if (i === col) {
      continue;
    }
    if (matrix[row][i] === matrix[row][col]) {
      return false;
    }
  }
  return true;
}

function correctCol(matrix, row, col) {
  for (var i = 0; i < 9; i++) {
    if (i === row) {
      continue;
    }
    if (matrix[i][col] === matrix[row][col]) {
      return false;
    }
  }
  return true;
}

function correctBox(matrix, row, col) {
  var boxSideRow = Math.floor(row / 3) * 3;
  var boxSideCol = Math.floor(col / 3) * 3;

  for (var i = boxSideRow; i < boxSideRow + 3; i++) {
    for (var j = boxSideCol; j < boxSideCol + 3; j++) {
      if (i === row && j === col) {
        continue;
      }
      if (matrix[i][j] === matrix[row][col]) {
        return false;
      }
    }
  }
  return true;
}