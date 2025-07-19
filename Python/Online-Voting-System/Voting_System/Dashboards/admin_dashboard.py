from Voting_System.base.base import *

class AdminDashboard(QWidget):
    FIXED_WIDTH = 800
    FIXED_HEIGHT = 400

    def __init__(self):
        super().__init__()

        self.__admin_id = 0
        self.__admin_name = ""
        self.__admin_place = ""

        self.setWindowTitle( TITLE_ADMIN_DASHBOARD )
        self.setWindowIcon( ovs_app_config.getIcon() )
        self.setStyleSheet( CSS_STYLE_FOR_WIDGETS )
        self.setFixedSize(self.FIXED_WIDTH, self.FIXED_HEIGHT)

        layout = QVBoxLayout()

        layout.addLayout( ovs_app_config.createHeading("Welcome Admin") )

        # Spacer
        layout.addSpacing(20)

        label_layout = QHBoxLayout()

        # Info Labels
        self.label_id = ovs_app_config.createDashboardLabel("")
        self.label_name = ovs_app_config.createDashboardLabel("")
        self.label_place = ovs_app_config.createDashboardLabel("")

        
        label_layout.addWidget( self.label_id)
        label_layout.addWidget( self.label_name)
        label_layout.addWidget( self.label_place)
        
        layout.addLayout(label_layout)

        layout.addSpacing(30)

        button_layout = QGridLayout()
        # Buttons
        self.btn_delete_candidates = QPushButton("Delete Candidate")
        self.btn_election_status = QPushButton("Show Election Status")
        self.btn_show_candidates = QPushButton("Show Candidates")
        self.btn_publish_results = QPushButton("Publish Results")

        row = 0
        col = 0

        for btn in [self.btn_delete_candidates, self.btn_election_status, self.btn_show_candidates, self.btn_publish_results]:
            btn.setStyleSheet(CSS_STYLE_FOR_BUTTONS)
            button_layout.addWidget(btn,row,col)

            if col == 1 :
                row += 1
                col = 0
            else :
                col += 1

        layout.addLayout( button_layout )

        layout.addSpacing(20)

        self.addActionsToButtons()

        self.setLayout(layout)



    def addActionsToButtons( self ) -> None :
        self.btn_delete_candidates.clicked.connect( self.__deleteCandidates )
        self.btn_election_status.clicked.connect( self.__getElectionStatus )
        self.btn_show_candidates.clicked.connect( self.__showCandidates )
        self.btn_publish_results.clicked.connect( self.__publishResults )

    def showUI( self , __values: dict[int, int | str]) -> None :
        self.__admin_id = __values[KEY_ID]
        self.__admin_place = __values[KEY_PLACE]

        self.label_id.setText("Admin ID: " + str( self.__admin_id) )
        self.label_name.setText("Name: "   + str( __values[KEY_FULL_NAME] ).capitalize())
        self.label_place.setText("Place: " + str( self.__admin_place )     .capitalize())
        ovs_app_config.bringWindowForward( self )

    
    def __deleteCandidates( self ) -> None :
        pass

    def __getElectionStatus( self ) -> None :
        pass

    def __showCandidates( self ) -> None :
        pass

    def __publishResults( self ) -> None :
        output = QMessageBox.question(self, "Sure?" , "Are you sure to publish election results?",buttons=QMessageBox.StandardButton.Yes, defaultButton=QMessageBox.StandardButton.No )

        if output == QMessageBox.StandardButton.No : return 

        try : 
            ovs_data_manager.publishResult( str(self.__admin_place) )
            ovs_app_config.showInformation( self, "Election Result has been published successfully!")
        except Exception as excep :
            ovs_app_config.showError( self, excep.__str__())
        