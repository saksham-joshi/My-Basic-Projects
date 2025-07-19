from Voting_System.base.base import *

class CandidateRegistration(QWidget):
    FIXED_WIDTH = 650
    FIXED_HEIGHT = 750

    def __init__(self):
        super().__init__()

        self.setWindowTitle(TITLE_CANDIDATE_REGISTRATION_PAGE)
        self.setWindowIcon( ovs_app_config.getIcon() )
        self.setStyleSheet(CSS_STYLE_FOR_WIDGETS)

        self.setFixedSize(self.FIXED_WIDTH, self.FIXED_HEIGHT)
        self.setup_ui()


    def setup_ui(self):
        layout = QVBoxLayout()
        layout.setAlignment( Qt.AlignmentFlag.AlignTop )
        layout.setContentsMargins(30, 20, 30, 20)
        layout.setSpacing(15)

        layout.addLayout( ovs_app_config.createHeading( TITLE_CANDIDATE_REGISTRATION_PAGE) )

        form_layout = QVBoxLayout()
        form_layout.setSpacing(18)

        # Aadhar Number
        self.aadhar = QLineEdit()
        self.aadhar.setValidator( ovs_app_config.getUnsignedIntValidator() )
        self.aadhar.setMaxLength(12)
        self.aadhar.setPlaceholderText("Enter 12-digit Aadhar Number")
        self.aadhar.setStyleSheet( CSS_STYLE_FOR_INPUT_BOX )
        form_layout.addWidget(self._labeled_widget("Aadhar Number", self.aadhar, CSS_STYLE_FOR_INPUT_LABELS))

        # First Name
        self.first_name = QLineEdit()
        self.first_name.setValidator( ovs_app_config.getAlphabetValidator() )
        self.first_name.setPlaceholderText("First Name")
        self.first_name.setStyleSheet( CSS_STYLE_FOR_INPUT_BOX )
        form_layout.addWidget(self._labeled_widget("First Name", self.first_name, CSS_STYLE_FOR_INPUT_LABELS))

        # Last Name
        self.last_name = QLineEdit()
        self.last_name.setValidator( ovs_app_config.getAlphabetValidator() )
        self.last_name.setPlaceholderText("Last Name")
        self.last_name.setStyleSheet( CSS_STYLE_FOR_INPUT_BOX )
        form_layout.addWidget(self._labeled_widget("Last Name", self.last_name, CSS_STYLE_FOR_INPUT_LABELS))

        # place
        self.place = QLineEdit()
        self.place.setValidator( ovs_app_config.getAlphabetValidator() )
        self.place.setPlaceholderText("Place from where you are standing for election")
        self.place.setStyleSheet( CSS_STYLE_FOR_INPUT_BOX )
        form_layout.addWidget(self._labeled_widget("Place", self.place, CSS_STYLE_FOR_INPUT_LABELS))

        # Password
        self.password = QLineEdit()
        self.password.setEchoMode(QLineEdit.EchoMode.Password)
        self.password.setPlaceholderText("Enter Password")
        self.password.setStyleSheet( CSS_STYLE_FOR_INPUT_BOX )
        form_layout.addWidget(self._labeled_widget("Password", self.password, CSS_STYLE_FOR_INPUT_LABELS ))

        # Checkbox
        self.agree_checkbox = QCheckBox("All the details filled are correct and I agree with all the terms and conditions.")
        self.agree_checkbox.setStyleSheet("color: white; font-size: 13px;")
        form_layout.addWidget(self.agree_checkbox)

        # Register Button
        register_btn = QPushButton("Register")
        register_btn.setStyleSheet( CSS_STYLE_FOR_FORM_BUTTONS )
        register_btn.clicked.connect(self.validate_inputs)
        form_layout.addWidget(register_btn)

        form_widget = QWidget()
        form_widget.setLayout(form_layout)
        form_widget.setStyleSheet(CSS_STYLE_FOR_INPUT_BOX)

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

    def validate_inputs(self):
        aadhar_num = self.aadhar.text()
        fname = self.first_name.text()
        lname = self.last_name.text()
        election_place = self.place.text()
        password_text = self.password.text()
        agreed = self.agree_checkbox.isChecked()

        if not all([aadhar_num, fname, lname, election_place, password_text, agreed]):
            QMessageBox.warning(self, "Incomplete", "Please fill out all fields.")
            return
        
        if len(aadhar_num) != 12 :
            QMessageBox.critical(self, "Invalid Aadhar", "Aadhar number must be exactly 12 digits.")
            return

        if len(fname) < 2 or len(lname) < 2 :
            QMessageBox.critical( self, "Invalid Name", "First or Last name is too short!")
            return
        
        if len(election_place) < 2 :
            QMessageBox.critical( self, "Invalid Place", "The mentioned place's name is too short!")
            return
        
        if len(password_text) <= 5 :
            QMessageBox.critical( self, "Invalid Password" , "Password is too short. Minimum 6 characters are required!")
            return

        if not agreed:
            QMessageBox.warning(self, "Agreement Required", "You must agree to the terms and conditions.")
            return
        
        try :
            generated_candidate_id = ovs_data_manager.registerCandidate(int(aadhar_num), fname, lname, election_place, password_text)
            ovs_app_config.showInformation(self, f"Candidate registered successfully with ID '{ generated_candidate_id }'" , "Success")
            self.aadhar.clear()
            self.first_name.clear()
            self.last_name.clear()
            self.place.clear()
            self.password.clear()
            self.agree_checkbox.setChecked(False)
        
        except OvsException as excep:
            ovs_app_config.showError( self, "Cannot register the candidate because " + excep.__str__(), "Error" )
