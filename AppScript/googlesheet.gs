


function moveExpenseData() {
  // Get both spreadsheets
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dailySheet = ss.getSheetByName('daily_test');
  var masterSheet = ss.getSheetByName('master_test');
  
  // Define the ranges to move and clear
  const ranges = [
    "B10:G55",
    "I10:N45",
    "P10:U30",
    "W10:AB255",
  ];
  
  // Get the initial last row in master sheet
  var lastRow = getLastRow(masterSheet);
  
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
  
  // Refresh
  SpreadsheetApp.flush();
  
  // Show completion message
  SpreadsheetApp.getUi().alert('All data has been moved successfully!');
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
    .addItem('Move Monthly Data to Master', 'moveExpenseData')
    .addToUi();
}