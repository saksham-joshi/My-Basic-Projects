from Voting_System.base.base import *
from .admin_login import *
from .candidate_login import *
from .voter_login import *

class LoginWindow(QWidget):
    FIXED_WIDTH = 600
    FIXED_HEIGHT = 400

    def __init__(self):
        super().__init__()
        self.setWindowTitle(TITLE_LOGIN_PAGE)
        self.setWindowIcon( ovs_app_config.getIcon() )
        self.setStyleSheet( CSS_STYLE_FOR_WIDGETS )
        self.setFixedSize(self.FIXED_WIDTH, self.FIXED_HEIGHT)

        self.__admin_login = AdminLogin()
        self.__candidate_login = CandidateLogin()
        self.__voter_login = VoterLogin()

        self.setup_ui()



    def setup_ui(self):
        layout = QVBoxLayout()
        layout.setAlignment(Qt.AlignmentFlag.AlignCenter)

        layout.addLayout( ovs_app_config.createHeading( "LOGIN" ) )

        layout.addSpacing(40)

        btn_admin = QPushButton(TITLE_ADMIN_LOGIN_PAGE)
        btn_admin.setStyleSheet(CSS_STYLE_FOR_BUTTONS)
        btn_admin.clicked.connect( self.__openAdminWindow )

        btn_candidate = QPushButton(TTILE_CANDIDATE_LOGIN_PAGE)
        btn_candidate.setStyleSheet(CSS_STYLE_FOR_BUTTONS)
        btn_candidate.clicked.connect( self.__openCandidateWindow )

        btn_voter = QPushButton(TITLE_VOTER_LOGIN_PAGE)
        btn_voter.setStyleSheet(CSS_STYLE_FOR_BUTTONS)
        btn_voter.clicked.connect( self.__openVoterWindow )

        layout.addWidget(btn_admin)
        layout.addSpacing(15)
        layout.addWidget(btn_candidate)
        layout.addSpacing(15)
        layout.addWidget(btn_voter)

        self.setLayout(layout)
    
    def closeEvent(self , event : QCloseEvent) -> None:
        self.__admin_login.close()
        self.__voter_login.close()
        self.__candidate_login.close()

        event.accept


    def __openAdminWindow( self ) -> None : ovs_app_config.bringWindowForward( self.__admin_login )

    def __openCandidateWindow( self ) -> None : ovs_app_config.bringWindowForward( self.__candidate_login )

    def __openVoterWindow( self ) -> None : ovs_app_config.bringWindowForward( self.__voter_login )