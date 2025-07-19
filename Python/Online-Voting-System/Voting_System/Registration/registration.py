from Voting_System.base.base import *
from .candidate_registration import *
from .voter_registration import *


class RegistrationWindow(QWidget):
    FIXED_WIDTH = 600
    FIXED_HEIGHT = 400

    BUTTON_TITLE_CANDIDATE_REGISTRATION = "Candidate Registration"
    BUTTON_TITLE_VOTER_REGISTRATION     = "Voter Registration"



    def __init__(self):
        super().__init__()
        self.setWindowTitle(TITLE_REGISTRATION_PAGE)
        self.setWindowIcon( ovs_app_config.getIcon() )
        self.setStyleSheet( CSS_STYLE_FOR_WIDGETS )
        self.setFixedSize(self.FIXED_WIDTH, self.FIXED_HEIGHT)

        self.__candidate_registration = CandidateRegistration()
        self.__voter_registration = VoterRegistration()

        self.setup_ui()



    def setup_ui(self):
        layout = QVBoxLayout()
        layout.setAlignment(Qt.AlignmentFlag.AlignCenter)

        layout.addLayout( ovs_app_config.createHeading( "REGISTER" ) )

        layout.addSpacing(40)

        btn_candidate = QPushButton(RegistrationWindow.BUTTON_TITLE_CANDIDATE_REGISTRATION)
        btn_candidate.setStyleSheet(CSS_STYLE_FOR_BUTTONS)
        btn_candidate.clicked.connect( self.__openCandidateRegistrationWindow )

        btn_voter = QPushButton(RegistrationWindow.BUTTON_TITLE_VOTER_REGISTRATION)
        btn_voter.setStyleSheet(CSS_STYLE_FOR_BUTTONS)
        btn_voter.clicked.connect( self.__openVoterRegistrationWindow )

        layout.addWidget(btn_candidate)
        layout.addSpacing(20)
        layout.addWidget(btn_voter)

        self.setLayout(layout)

    
    def closeEvent(self , event : QCloseEvent) -> None:
        self.__candidate_registration.close()
        self.__voter_registration.close()

        event.accept()



    def __openCandidateRegistrationWindow( self ) -> None : ovs_app_config.bringWindowForward( self.__candidate_registration )

    def __openVoterRegistrationWindow( self ) -> None : ovs_app_config.bringWindowForward( self.__voter_registration )
