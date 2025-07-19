from Voting_System.base.base import *
from Voting_System.Dashboards.candidate_dashboard import *
class CandidateLogin(QWidget):
    FIXED_WIDTH = 500
    FIXED_HEIGHT = 450

    def __init__(self):
        super().__init__()

        self.setWindowTitle( TTILE_CANDIDATE_LOGIN_PAGE )
        self.setWindowIcon( ovs_app_config.getIcon() )
        self.setStyleSheet( CSS_STYLE_FOR_WIDGETS )

        self.setFixedSize(self.FIXED_WIDTH, self.FIXED_HEIGHT)
        self.setup_ui()

        self.__candidate_dashboard = CandidateDashboard()


    def setup_ui(self):
        layout = QVBoxLayout()
        layout.setAlignment(Qt.AlignmentFlag.AlignTop)
        layout.setContentsMargins(30, 20, 30, 20)
        layout.setSpacing(20)

        layout.addLayout( ovs_app_config.createHeading( TTILE_CANDIDATE_LOGIN_PAGE) )

        form_layout = QVBoxLayout()
        form_layout.setSpacing(18)

        # candidate ID
        self.candidate_id = QLineEdit()
        self.candidate_id.setValidator( ovs_app_config.getUnsignedIntValidator() )
        self.candidate_id.setPlaceholderText("Enter Candidate ID")
        form_layout.addWidget(self._labeled_widget("Candidate ID", self.candidate_id, CSS_STYLE_FOR_INPUT_LABELS ))

        # Password
        self.password = QLineEdit()
        self.password.setEchoMode(QLineEdit.EchoMode.Password)
        self.password.setPlaceholderText("Enter Password")
        form_layout.addWidget(self._labeled_widget("Password", self.password, CSS_STYLE_FOR_INPUT_LABELS ))

        # Login Button
        login_btn = QPushButton("Login")
        login_btn.setStyleSheet( CSS_STYLE_FOR_FORM_BUTTONS )
        login_btn.clicked.connect(self.validate_login)
        form_layout.addSpacing(30)
        form_layout.addWidget(login_btn)

        form_widget = QWidget()
        form_widget.setLayout(form_layout)
        form_widget.setStyleSheet( CSS_STYLE_FOR_INPUT_BOX )

        layout.addWidget(form_widget)
        self.setLayout(layout)

    def _labeled_widget(self, label_text, widget, label_style):
        container = QVBoxLayout()
        label = QLabel(label_text)
        label.setStyleSheet(label_style)
        container.addWidget(label)
        container.addWidget(widget)
        box = QWidget()
        box.setLayout(container)
        return box

    def validate_login(self):
        candidate_id = self.candidate_id.text().strip()
        password = self.password.text().strip()

        if not candidate_id or not password:
            QMessageBox.warning(self, "Incomplete", "Please enter both Candidate ID and Password.")
            return

        try :
            candidate_info = ovs_data_manager.getCandidate(int(candidate_id), password)
            self.__candidate_dashboard.showUI( candidate_info )
        except OvsWrongLoginInfoException as excep :
            ovs_app_config.showWrongLoginException( self )
        
        # clearning the input box for safety purposes
        self.candidate_id.clear()
        self.password.clear()



    def closeEvent( self, __event : QCloseEvent) -> None :

        self.__candidate_dashboard.close()

        __event.accept()