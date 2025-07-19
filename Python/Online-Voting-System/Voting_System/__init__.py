from .Registration.registration import *
from .Login.login import *
from .Dashboards.election_result import *

class MainApp(QWidget):
    FIXED_WIDTH = 600
    FIXED_HEIGHT = 450

    def __init__(self):
        super().__init__()
        self.setWindowTitle( TITLE_MAIN_PAGE )
        self.setWindowIcon( ovs_app_config.getIcon() )
        self.setStyleSheet( CSS_STYLE_FOR_WIDGETS )
        self.setFixedSize(self.FIXED_WIDTH, self.FIXED_HEIGHT)

        self.__registration_window = RegistrationWindow()
        self.__login_window = LoginWindow()
        self.__result_window = ElectionResult()

        self.setup_ui()



    def setup_ui(self):
        layout = QVBoxLayout()
        layout.setAlignment(Qt.AlignmentFlag.AlignCenter)

        layout.addLayout( ovs_app_config.createHeading( TITLE_MAIN_PAGE ) )

        layout.addSpacing(40)

        btn_registration = QPushButton("Registration")
        btn_registration.setStyleSheet( CSS_STYLE_FOR_BUTTONS)
        btn_registration.clicked.connect( self.__openRegistrationWindow )

        btn_login = QPushButton("Login")
        btn_login.setStyleSheet( CSS_STYLE_FOR_BUTTONS)
        btn_login.clicked.connect( self.__openLoginWindow )

        btn_result = QPushButton("Election Results")
        btn_result.setStyleSheet( CSS_STYLE_FOR_BUTTONS )
        btn_result.clicked.connect( self.__openResultWindow )

        layout.addWidget(btn_registration)
        layout.addSpacing(20)
        layout.addWidget(btn_login)
        layout.addSpacing(20)
        layout.addWidget( btn_result)

        self.setLayout(layout)
    


    def closeEvent(self , event : QCloseEvent) -> None:
        self.__registration_window.close()
        self.__login_window.close()
        self.__result_window.close()
        event.accept()


    def __openRegistrationWindow( self ) -> None : ovs_app_config.bringWindowForward( self.__registration_window )

    def __openLoginWindow( self ) -> None : ovs_app_config.bringWindowForward( self.__login_window )

    def __openResultWindow( self ) -> None : ovs_app_config.bringWindowForward( self.__result_window )