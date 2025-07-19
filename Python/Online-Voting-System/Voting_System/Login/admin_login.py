from Voting_System.base.base import *
from Voting_System.Dashboards.admin_dashboard import *

class AdminLogin(QWidget):
    FIXED_WIDTH = 500
    FIXED_HEIGHT = 450

    def __init__(self):
        super().__init__()

        self.setWindowTitle( TITLE_ADMIN_LOGIN_PAGE )
        self.setWindowIcon( ovs_app_config.getIcon() )
        self.setStyleSheet( CSS_STYLE_FOR_WIDGETS )
        self.setFixedSize(self.FIXED_WIDTH, self.FIXED_HEIGHT)
        self.setup_ui()

        self.__admin_dashboard = AdminDashboard()



    def setup_ui(self):
        layout = QVBoxLayout()
        layout.setAlignment(Qt.AlignmentFlag.AlignTop)
        layout.setContentsMargins(30, 20, 30, 20)
        layout.setSpacing(20)

        layout.addLayout( ovs_app_config.createHeading( TITLE_ADMIN_LOGIN_PAGE ) )

        form_layout = QVBoxLayout()
        form_layout.setSpacing(18)

        # Admin ID
        self.admin_id = QLineEdit()
        self.admin_id.setValidator( ovs_app_config.getUnsignedIntValidator() )
        self.admin_id.setPlaceholderText("Enter Admin ID")
        form_layout.addWidget(self._labeled_widget("Admin ID", self.admin_id, CSS_STYLE_FOR_INPUT_LABELS ))

        # Password
        self.password = QLineEdit()
        self.password.setEchoMode(QLineEdit.EchoMode.Password)
        self.password.setPlaceholderText("Enter Password")
        form_layout.addWidget(self._labeled_widget("Password", self.password, CSS_STYLE_FOR_INPUT_LABELS ))

        
        form_layout.addSpacing(30)

        # Login Button
        login_btn = QPushButton("Login")
        login_btn.setStyleSheet( CSS_STYLE_FOR_FORM_BUTTONS )
        login_btn.clicked.connect(self.validate_login)
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
        admin_id = self.admin_id.text().strip()
        password = self.password.text().strip()

        if not admin_id or not password:
            QMessageBox.warning(self, "Incomplete", "Please enter both Admin ID and Password.")
            return

        try :
            admin_info = ovs_data_manager.getAdmin(int(admin_id), password)
            self.__admin_dashboard.showUI( admin_info )
        except OvsWrongLoginInfoException as excep :
            ovs_app_config.showWrongLoginException( self )
        
        # clearning the input box for safety purposes
        self.admin_id.clear()
        self.password.clear()


    
    def closeEvent( self , __event : QCloseEvent ) :
        self.__admin_dashboard.close()
        __event.accept()
