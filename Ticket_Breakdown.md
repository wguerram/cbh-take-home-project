# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

In regards to the estimate, the actual code is not that difficult but didn't want to overpromise because it will depend on the environment and the complexity of the actual code.

#1 Add a new field to the Agents table (estimate 3 hr):  
Create a migration to add a field named external_id varchar(256) to the table Agents.
Modify the AgentDTO class to accept externalId property
Modify the method "create" of the class "AgentService" to save the externalId.
Update the endpoint documentation to reflect the new added field.
Create unit test to account for this new feature.

#2 The frontend team should modify the facilities master screen to allow our customers to save the new Agent External ID.

#3 Modify the getShiftsByFacility method in the FacilityService class to include the externalId in the agent metadata (estimate 6 hrs)
Add externalId to the query that returns the agent information.
Add externalId to the metadata list to be returned by the method.

#4 Create a new method generateReportByAgentExternalId in the in the FacilityService class to return the information related to that agent. (estimate 10 hrs)
The method must accept the argument agentExternalId
The query to generate the report should use the field agentExternalId to filter the information.
Create a new endpoint to call the new method generateReportByAgentExternalId.
The pdf report must print the new field Agent External ID
