from Voting_System.base.base import *


class CandidateDashboard(QWidget) :
    FIXED_WIDTH = 800
    FIXED_HEIGHT = 400

    def __init__( self ) :
        super().__init__()

        self.__candidate_id = 0

        self.setWindowIcon( ovs_app_config.getIcon() )
        self.setWindowTitle( TITLE_CANDIDATE_DASHBOARD )
        self.setStyleSheet( CSS_STYLE_FOR_WIDGETS )
        self.setFixedSize( self.FIXED_WIDTH , self.FIXED_HEIGHT )

        layout = QVBoxLayout()

        layout.addLayout( ovs_app_config.createHeading("Welcome Candidate") )

        # Spacer
        layout.addSpacing(20)

        info_layout = QHBoxLayout()

        # Info Labels
        self.label_id = ovs_app_config.createDashboardLabel("")
        self.label_name = ovs_app_config.createDashboardLabel("")
        self.label_place = ovs_app_config.createDashboardLabel("")
        
        info_layout.addWidget(self.label_id)
        info_layout.addWidget(self.label_name)
        info_layout.addWidget(self.label_place)
        
        layout.addLayout(info_layout)

        layout.addSpacing(30)

        vote_count_layout = QHBoxLayout()

        label_vote_count = QLabel("Vote Count: ")
        label_vote_count.setStyleSheet( f"""
            color: white;
            border: 2px solid { COLOR_CODE_BORDER };
            font-weight: bolder;
            font-size: 20px;
            margin-bottom: 4px;
        """ )
        label_vote_count.setFixedHeight( 50 )
        label_vote_count.setAlignment( Qt.AlignmentFlag.AlignCenter )
        label_vote_count.setFont( ovs_app_config.getDashboardLabelFont() )

        self.box_vote_count = QLabel("0")
        self.box_vote_count.setAlignment( Qt.AlignmentFlag.AlignCenter )
        self.box_vote_count.setFont( ovs_app_config.getButtonFont() )
        self.box_vote_count.setFixedHeight(50)
        self.box_vote_count.setStyleSheet( f"""
                background-color: rgba(255, 255, 255, 0.2);
                border: 2px solid { COLOR_CODE_BORDER };
                padding: 10px 20px;
                color: #ffffff;
        """)

        refresh_button = QPushButton("Refresh")
        refresh_button.setStyleSheet( CSS_STYLE_FOR_BUTTONS )
        refresh_button.setFixedHeight( 50 )
        refresh_button.setFont( ovs_app_config.getButtonFont() )
        refresh_button.clicked.connect( self.updateVoteCount )

        vote_count_layout.addWidget( label_vote_count )
        vote_count_layout.addWidget( self.box_vote_count )
        vote_count_layout.addWidget( refresh_button )

        layout.addLayout( vote_count_layout )
        self.setLayout(layout)



    def showUI( self , __values : dict[int, str | int]) -> None:
        self.__candidate_id = int(__values[ KEY_ID ])

        self.label_id.setText(f"Candidate ID: { self.__candidate_id}")
        self.label_name.setText(f"Name: { __values[KEY_FIRST_NAME] + ' ' + __values[KEY_LAST_NAME]}")
        self.label_place.setText(f"Place: { __values[KEY_PLACE]}")

        self.box_vote_count.setText( str(__values[ KEY_VOTE_COUNT ]) )
        self.show()



    def updateVoteCount( self ) -> None :
        self.box_vote_count.setText( str( ovs_data_manager.getVoteCount( self.__candidate_id )))


    