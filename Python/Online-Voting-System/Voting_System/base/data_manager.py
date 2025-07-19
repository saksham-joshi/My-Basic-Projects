from .imports import *
from .variables.app_variables import *
from .variables.db_variables import *
from .exceptions import *

KEY_FULL_NAME           :int       = 0
KEY_FIRST_NAME          :int       = 1
KEY_LAST_NAME           :int       = 2
KEY_PLACE               :int       = 3
KEY_ID                  :int       = 4
KEY_VOTE_COUNT          :int       = 5
KEY_AADHAR_CARD         :int       = 6


class DataManager:
    
    @staticmethod
    def getHash(__password: str) -> str:
        return sha256(__password.encode()).hexdigest()



    def __init__(self) :
        self.__isclosed = True


    def connect( self ) -> None :
        self.conn = pymysql.connect(
            host= OVS_HOST,
            user= OVS_USER,
            password= OVS_PASSWORD,
            database= OVS_DATABASE
        )

        self.cursor = self.conn.cursor( DictCursor )
        self.__isclosed : bool = False
    


    def registerCandidate(self, __aadhar_number: int, __first_name: str, __last_name: str, __place: str, __password: str) -> int: 
        
        if self.__isclosed : raise OvsProgrammingError()

        # checking if another candidate with same aadhar_number is in the database or not
        self.cursor.execute(f"Select {OVS_COLUMN_AADHAR} from { OVS_TABLE_CANDIDATE} where {OVS_COLUMN_AADHAR}= {__aadhar_number}")

        if self.cursor.fetchone() : raise OvsCandidateAlreadyRegistered()

        self.cursor.execute(f"""
            INSERT INTO { OVS_TABLE_CANDIDATE } VALUES(
                {__aadhar_number},
                '{__first_name.capitalize()}',
                '{__last_name.capitalize()}',
                '{__place.lower()}',
                '{DataManager.getHash( __password)}',
                0,
                0
            )
        """)

        self.conn.commit()

        self.cursor.execute(f"SELECT { OVS_COLUMN_ID } from { OVS_TABLE_CANDIDATE } where { OVS_COLUMN_AADHAR } = { __aadhar_number }")

        return int( self.cursor.fetchone()[OVS_COLUMN_ID] )



    def getCandidate(self, __candidate_id: int, __password: str) -> dict[int, int | str] :

        if self.__isclosed : raise OvsProgrammingError()

        self.cursor.execute(f"SELECT * from {OVS_TABLE_CANDIDATE} where {OVS_COLUMN_ID}= {__candidate_id} && {OVS_COLUMN_PASSWORD}= '{ DataManager.getHash( __password)}'")

        row = self.cursor.fetchone()

        if row : return {
            KEY_ID          : row[OVS_COLUMN_ID],
            KEY_AADHAR_CARD : row[OVS_COLUMN_AADHAR],
            KEY_FIRST_NAME  : row[OVS_COLUMN_FIRST_NAME],
            KEY_LAST_NAME   : row[OVS_COLUMN_LAST_NAME],
            KEY_PLACE       : row[OVS_COLUMN_PLACE],
            KEY_VOTE_COUNT  : row[OVS_COLUMN_VOTE_COUNT]
        }

        raise OvsWrongLoginInfoException()



    def registerVoter(self, __aadhar_number: int, __first_name: str, __last_name: str, __password: str, __place: str) -> int :

        if self.__isclosed : raise OvsProgrammingError()

        self.cursor.execute(f"Select {OVS_COLUMN_AADHAR} from { OVS_TABLE_VOTER} where { OVS_COLUMN_AADHAR}= { __aadhar_number }");

        if self.cursor.fetchone() : raise OvsVoterAlreadyRegistered()

        self.cursor.execute(f"""
            Insert into {OVS_TABLE_VOTER} values(
                 {__aadhar_number},
                '{ __first_name.capitalize()}',
                '{__last_name.capitalize()}',
                '{__place.lower()}',
                '{DataManager.getHash(__password)}',
                0,
                FALSE
            )
        """)

        self.conn.commit()

        self.cursor.execute(f"Select {OVS_COLUMN_ID} from {OVS_TABLE_VOTER} where {OVS_COLUMN_AADHAR}= {__aadhar_number}")

        return int(self.cursor.fetchone()[OVS_COLUMN_ID])
    


    def getAllCandidates( self , __place : str ) -> list[dict[int, int | str]] :

        if self.__isclosed : raise OvsProgrammingError()

        self.cursor.execute(f"SELECT * from { OVS_TABLE_CANDIDATE } where { OVS_COLUMN_PLACE }= '{ __place.lower() }'")

        list_of_data = []

        for row in self.cursor.fetchall() :
            list_of_data.append({
                KEY_ID : row[ OVS_COLUMN_ID ],
                KEY_FULL_NAME : row[ OVS_COLUMN_FIRST_NAME] + ' ' + row[ OVS_COLUMN_LAST_NAME ]
            })

        return list_of_data
        


    def getVoter(self, __voter_id: int, __password: str) -> dict[int, int | str | bool]:

        if self.__isclosed : raise OvsProgrammingError()
        
        self.cursor.execute(f"SELECT * from {OVS_TABLE_VOTER} where {OVS_COLUMN_ID}= {__voter_id} && {OVS_COLUMN_PASSWORD}= '{DataManager.getHash(__password)}'")

        row = self.cursor.fetchone()

        if row : return {
            KEY_ID : row[OVS_COLUMN_ID],
            KEY_AADHAR_CARD : row[OVS_COLUMN_AADHAR],
            KEY_FIRST_NAME : row[OVS_COLUMN_FIRST_NAME],
            KEY_LAST_NAME : row[OVS_COLUMN_LAST_NAME],
            KEY_PLACE : row[OVS_COLUMN_PLACE]
        }

        raise OvsWrongLoginInfoException()

    def getAdmin(self, __admin_id: int, __password: str) -> dict[int, int | str]:

        if self.__isclosed : raise OvsProgrammingError()

        self.cursor.execute(f"Select * from {OVS_TABLE_ADMIN} where {OVS_COLUMN_ID}={__admin_id} and {OVS_COLUMN_PASSWORD}= '{DataManager.getHash(__password)}'")

        row = self.cursor.fetchone()

        if row : return {
            KEY_ID          : row[OVS_COLUMN_ID],
            KEY_FULL_NAME   : row[OVS_COLUMN_NAME],
            KEY_PLACE       : row[OVS_COLUMN_PLACE]
        }

        raise OvsWrongLoginInfoException()

        

    def addVote(self, __candidate_id: int , __voter_id) -> None:

        if self.__isclosed : raise OvsProgrammingError()

        # checking if vote already given by voter 
        self.cursor.execute(f"Select {OVS_COLUMN_VOTE_GIVEN} from {OVS_TABLE_VOTER} where {OVS_COLUMN_ID}= {__voter_id}")

        row = self.cursor.fetchone()

        # if row is not none, then 
        if row :

            is_vote_already_given = bool(row[OVS_COLUMN_VOTE_GIVEN])

            if is_vote_already_given : raise OvsVoteAlreadyGivenException()

            else :
                # updating voter table
                self.cursor.execute(f"update {OVS_TABLE_VOTER} set {OVS_COLUMN_VOTE_GIVEN}= TRUE where {OVS_COLUMN_ID}= {__voter_id}")

                # finding the number of votes received till yet
                self.cursor.execute(f"select {OVS_COLUMN_VOTE_COUNT} from {OVS_TABLE_CANDIDATE} where {OVS_COLUMN_ID}= {__candidate_id}")
                
                row = self.cursor.fetchone()

                if row :
                    # extracting the number of votes given and adding 1 to it.
                    vote_received_till_yet = int(row[OVS_COLUMN_VOTE_COUNT]) + 1

                    # updating the vote count
                    self.cursor.execute(f"update {OVS_TABLE_CANDIDATE} set {OVS_COLUMN_VOTE_COUNT}= {vote_received_till_yet} where {OVS_COLUMN_ID}= {__candidate_id}")

                    self.conn.commit()

                else : raise OvsInvalidCandidateIDException()

        else : raise OvsInvalidVoterIDException()

        

    def getWinnerCandidate(self, __place: str) -> dict[int, int | str]:

        if self.__isclosed : raise OvsProgrammingError()
       
        self.cursor.execute(f"Select * from {OVS_TABLE_CANDIDATE} where {OVS_COLUMN_PLACE}='{__place.lower()}' order by {OVS_COLUMN_VOTE_COUNT} desc LIMIT 1")

        row = self.cursor.fetchone()

        if row is None : raise OvsNoPlaceFoundException()

        return {
            KEY_ID          : row[OVS_COLUMN_ID],
            KEY_AADHAR_CARD : row[OVS_COLUMN_AADHAR],
            KEY_FIRST_NAME  : row[OVS_COLUMN_FIRST_NAME],
            KEY_LAST_NAME   : row[OVS_COLUMN_LAST_NAME],
            KEY_PLACE       : row[OVS_COLUMN_PLACE],
            KEY_VOTE_COUNT  : row[OVS_COLUMN_VOTE_COUNT]
        }


    def getResult(self, __place: str) -> list[dict[int, int | str]]:

        if self.__isclosed : raise OvsProgrammingError()

        self.cursor.execute(f"Select * from {OVS_TABLE_CANDIDATE} where {OVS_COLUMN_PLACE}= '{__place.lower()}'")

        rows = self.cursor.fetchall()
        results = []
        for row in rows:
            results.append({
                KEY_ID          : row[OVS_COLUMN_ID],
                KEY_AADHAR_CARD : row[OVS_COLUMN_AADHAR],
                KEY_FIRST_NAME  : row[OVS_COLUMN_FIRST_NAME],
                KEY_LAST_NAME   : row[OVS_COLUMN_LAST_NAME],
                KEY_PLACE       : row[OVS_COLUMN_PLACE],
                KEY_VOTE_COUNT  : row[OVS_COLUMN_VOTE_COUNT],
            })
        return results
    


    def getAllResults( self ) -> list[dict[int, int | str]] :
        
        if self.__isclosed : raise OvsProgrammingError()

        self.cursor.execute(f"SELECT * from { OVS_TABLE_RESULT } order by {OVS_COLUMN_PLACE}")

        results = self.cursor.fetchall()

        if results is None : raise OvsNoResultsDeclaredException()

        output_list : list = []

        for row in results :
            output_list.append({
                KEY_ID : row[ OVS_COLUMN_ID ],
                KEY_FULL_NAME : row[ OVS_COLUMN_NAME ],
                KEY_PLACE : row[ OVS_COLUMN_PLACE ],
                KEY_VOTE_COUNT : row[ OVS_COLUMN_VOTE_COUNT]
            })
        
        return output_list
    

    def publishResult( self, __place : str ) -> None :

        if self.__isclosed : raise OvsProgrammingError()

        data = self.getWinnerCandidate( __place )

        # writing the data to the ResultTable
        self.cursor.execute(f"INSERT INTO {OVS_TABLE_RESULT} values( '{data[KEY_PLACE]}' , '{ str(data[KEY_FIRST_NAME]) + str(data[KEY_LAST_NAME]) }', { data[KEY_ID]} , { data[KEY_VOTE_COUNT]} )")

        # now deleting all the candidates with same place
        self.cursor.execute(f"DELETE FROM {OVS_TABLE_CANDIDATE} where {OVS_COLUMN_PLACE}='{str(data[KEY_PLACE]).lower()}'")

        self.conn.commit()



    def getVoteCount( self, __candidate_id : int ) -> int : 

        if self.__isclosed : raise OvsProgrammingError()

        self.cursor.execute( f"SELECT { OVS_COLUMN_VOTE_COUNT } from { OVS_TABLE_CANDIDATE } where { OVS_COLUMN_ID}= { __candidate_id }" )

        output = self.cursor.fetchone()

        if ( output == None ) : raise OvsInvalidCandidateIDException()

        return output[ OVS_COLUMN_VOTE_COUNT ]
    


    def raiseExceptionIfVoteAlreadyGiven( self , __voter_id : int ) -> None :

        if self.__isclosed : raise OvsProgrammingError()

        self.cursor.execute( f"SELECT { OVS_COLUMN_VOTE_GIVEN } from { OVS_TABLE_VOTER } where {OVS_COLUMN_ID}= { __voter_id }")

        vote_given = self.cursor.fetchone()

        if vote_given is None : raise OvsNoSuchColumnExistsException()

        elif bool(vote_given[OVS_COLUMN_VOTE_GIVEN]) : raise OvsVoteAlreadyGivenException()


        
    def close( self ) -> None :

        if self.__isclosed : return

        self.conn.commit()
        self.cursor.close()
        self.conn.close()
        self.__isclosed = True



    def __del__( self ) -> None : self.close()



ovs_data_manager = DataManager()