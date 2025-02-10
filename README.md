# AutoExpense
TLDR: This financial dashboard automation project seeks to use python to extract data from my Google Sheet, update it on PostgreSQL table and possibly a summarized monthly report using Metabase 

The application workthrough looks like this:
1. User will be able to add financial transaction data via AppSheet
2. A Python Script will be able to move data from the **Daily Transaction Tab** to the **Main Dashboard** using _Gspread Library_ and clear the monthly data ready for next month's usage.
3. The data will then be stored in a _PostgreSQL DB_.
4. The data will be analyzed monthly via _Power Bi_ and [OPTIONAL]a monthly email report will be sent to the user summarizing the key usage metrics from the month
 
