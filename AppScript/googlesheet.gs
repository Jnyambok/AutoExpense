function moveExpenseData() {
  // Get both spreadsheets
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dailySheet = ss.getSheetByName('daily_test');
  var masterSheet = ss.getSheetByName('master_test');
  
  // First, handle the totals
  // Get current values from C5:F5
  var currentTotals = dailySheet.getRange("C5:F5").getValues()[0];
  
  // Paste these values to C4:F4
  dailySheet.getRange("C4:F4").setValues([currentTotals]);
  
  // Get and modify formulas in C5:F5
  var formulas = dailySheet.getRange("C5:F5").getFormulas()[0];
  var modifiedFormulas = formulas.map(formula => {
    if (formula) {
      // Find the basic formula pattern (C4-SUM(...))
      var match = formula.match(/(.[4]-SUM\([^)]+\))/);
      if (match) {
        return match[0]; // Return only the matched pattern
      }
      return formula;
    }
    return formula;
  });
  
  // Set modified formulas back to C5:F5
  dailySheet.getRange("C5:F5").setFormulas([modifiedFormulas]);
  
  // Store initial last row for later formula filling
  var initialLastRow = getLastRow(masterSheet);
  
  // Define the ranges to move and clear
  const ranges = [
    "B10:G455",
    "I10:N445",
    "P10:U430",
    "W10:AB255",
  ];
  
  // Get the initial last row in master sheet
  var lastRow = initialLastRow;
  
  // Process each range
  ranges.forEach(function(range) {
    // Get source data
    var sourceRange = dailySheet.getRange(range);
    var sourceData = sourceRange.getValues();
    
    // Filter out empty rows
    var filteredData = sourceData.filter(row => 
      row.some(cell => cell !== '' && cell !== null)
    );
    
    if (filteredData.length > 0) {
      // Calculate the destination range
      var numCols = sourceRange.getNumColumns();
      var destinationRange = masterSheet.getRange(
        lastRow + 1, 
        1,  // Starting from column A
        filteredData.length,
        numCols
      );
      
      // Paste the data
      destinationRange.setValues(filteredData);
      
      // Update lastRow for next range
      lastRow += filteredData.length;
      
      // Clear the source range
      sourceRange.clearContent();
    }
  });
  
  // Get final last row
  var finalLastRow = getLastRow(masterSheet);
  
  // If new rows were added, fill formulas in columns G and H
  if (finalLastRow > initialLastRow) {
    // Create arrays of formulas for columns G and H
    var numNewRows = finalLastRow - initialLastRow;
    var yearFormulas = [];
    var dayFormulas = [];
    
    for (var i = initialLastRow + 1; i <= finalLastRow; i++) {
      yearFormulas.push([`=YEAR(A${i})`]);
      dayFormulas.push([`=text(A${i},"dddd")`]);
    }
    
    // Set formulas in columns G and H
    masterSheet.getRange(initialLastRow + 1, 7, numNewRows, 1).setFormulas(yearFormulas);
    masterSheet.getRange(initialLastRow + 1, 8, numNewRows, 1).setFormulas(dayFormulas);
  }
  
  // Refresh
  SpreadsheetApp.flush();
  
  // Show completion message
  SpreadsheetApp.getUi().alert('All data has been moved successfully and formulas have been filled!');
}

// Function to get the last row with data
function getLastRow(sheet) {
  var lastRow = sheet.getLastRow();
  // If sheet is empty, return 0 so we'll start at row 1
  return lastRow > 0 ? lastRow : 0;
}

// Add menu item
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Data Management')
    .addItem('Move Monthly Data to Master Data', 'moveExpenseData')
    .addToUi();
}