# AutoExpense
![Section 1](https://github.com/user-attachments/assets/f7aeb763-e1a1-441e-8cde-897974d5183c)

Hey! I am no mobile app developer so I decided to make one on my own using the tools at my disposal

TLDR: This financial dashboard automation project seeks to use appscript to move data in between sheets, python to transform data from my Google Sheet, update it on a PostgreSQL table and possibly a summarized monthly report using Metabase 

The application workthrough looks like this:
1. User will be able to add financial transaction data via their phone or laptop
2. _AppScript_ will be used to move the data in between sheets
3. _A Python Script_ to perform an ETL job to transform the collected data and store it on a PostgreSQL table
4. The data will be analyzed monthly via _Power Bi_ and [OPTIONAL]a monthly email report will be sent to the user summarizing the key usage metrics from the month

 
