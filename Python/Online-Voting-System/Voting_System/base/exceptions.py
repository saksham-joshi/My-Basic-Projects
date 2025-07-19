class OvsException ( Exception ):
    def __str__(self ) : return "OvsException"

class OvsWrongLoginInfoException ( OvsException ):
    def __str__(self) : return "You have entered the wrong ID and Password!"


class OvsInvalidCandidateIDException ( OvsException ) :
    def __str__(self) : return "You have entered the invalid candidate ID or maybe the results are declared due to which your ID is deleted"


class OvsInvalidAdminIDException ( OvsException ) :
    def __str__(self) : return "You have entered the invalid Admin ID!"


class OvsInvalidVoterIDException ( OvsException ) :
    def __str__(self) : return "You have entered the invalid Voter ID!"


class OvsCandidateAlreadyRegistered( OvsException ) :
    def __str__(self) : return "The candidate is already registered before."


class OvsVoterAlreadyRegistered ( OvsException ) :
    def __str__(self) : return "The voter is already registered before with the same aadhar number"


class OvsProgrammingError ( OvsException ):
    def __str__(self) : return "Database connection is already closed before but it's methods are being used after closing."

class OvsVoteAlreadyGivenException( OvsException ) :
    def __str__(self) : return "You have already voted before."

class OvsNoPlaceFoundException( OvsException ) :
    def __str__(self) : return "Either the result is already declared or no election is going on in this place."

class OvsNoSuchColumnExistsException( OvsException ) :
    def __str__(self) : return "You are trying to access a column which is not available in the Table."

class OvsNoResultsDeclaredException ( OvsException ) :
    def __str__(self) : return "No result is declared yet. It may take some days to declare results"