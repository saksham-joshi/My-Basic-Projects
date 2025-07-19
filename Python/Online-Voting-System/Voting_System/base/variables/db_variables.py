OVS_HOST      = "127.0.0.1"
OVS_DATABASE  = "VotingSystem"

OVS_TABLE_ADMIN       = "AdminTable"
OVS_TABLE_CANDIDATE   = "CandidateTable"
OVS_TABLE_VOTER       = "VoterTable"
OVS_TABLE_RESULT      = "ResultTable"

OVS_COLUMN_ID         = "id"
OVS_COLUMN_NAME       = "full_name"
OVS_COLUMN_FIRST_NAME = "first_name"
OVS_COLUMN_LAST_NAME  = "last_name"
OVS_COLUMN_AADHAR     = "aadhar_no"
OVS_COLUMN_PASSWORD   = "password_hash"
OVS_COLUMN_PLACE      = "place"
OVS_COLUMN_VOTE_COUNT = "vote_count"
OVS_COLUMN_VOTE_GIVEN = "vote_given"

OVS_ID_START_FROM     = 1000

with open("Voting_System\\base\\variables\\info.data", 'r') as file :
    OVS_USER      = file.readline().strip()
    OVS_PASSWORD  = file.readline()