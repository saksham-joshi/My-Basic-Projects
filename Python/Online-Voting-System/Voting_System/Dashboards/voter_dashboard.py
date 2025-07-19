from Voting_System.base.base import *


class VoterDashboard(QWidget) :
    FIXED_WIDTH = 800
    FIXED_HEIGHT = 400

    class VotingPanel(QMainWindow):
        FIXED_WIDTH = 500
        FIXED_HEIGHT = 700

        def __init__(self):
            super().__init__()

            self.__list_of_buttons : list[QPushButton] = [ ]

            self.setWindowTitle(TITLE_VOTING_PANEL)
            self.setWindowIcon(ovs_app_config.getIcon())
            self.setStyleSheet(CSS_STYLE_FOR_WIDGETS)
            self.setFixedSize( VoterDashboard.VotingPanel.FIXED_WIDTH , VoterDashboard.VotingPanel.FIXED_HEIGHT )

            self.__scroll_area = QScrollArea()
            self.__scroll_area.setWidgetResizable(True)

            self.__container = QWidget()
            self.__layout = QVBoxLayout()
            self.__container.setLayout(self.__layout)

            self.__scroll_area.setWidget(self.__container)
            self.setCentralWidget(self.__scroll_area)



        def showUI( self , __voter_id : int, __list : list[dict[int, int | str]]) -> None :
            self.cleanPanel()

            for candidate_data in __list :
        
                btn = QPushButton( f"({ candidate_data[KEY_ID] }) {candidate_data[ KEY_FULL_NAME ]}", parent= self )
                btn.setStyleSheet( CSS_STYLE_FOR_BUTTONS )
                btn.setFont( ovs_app_config.getButtonFont() )
                btn.setFixedHeight(50)
                btn.clicked.connect(lambda _, cid=int(candidate_data[KEY_ID]): self.addVote(cid , __voter_id))

                self.__list_of_buttons.append( btn )

                self.__layout.addWidget(btn)
            self.show()



        def cleanPanel(self) -> None:

            for i in self.__list_of_buttons : self.__layout.removeWidget( i )

            self.__list_of_buttons.clear()

            # while self.__layout.count():
            #     item = self.__layout.takeAt(0)
            #     if item is not None:
            #         widget = item.widget()
            #         if widget is not None:
            #             widget.deleteLater()

        

        def addVote( self , __candidate_id : int , __voter_id : int) -> None :

            try : ovs_data_manager.addVote( __candidate_id , __voter_id )

            except Exception as excep : ovs_app_config.showInformation( self, excep.__str__())

            self.hide()



    def __init__( self ) :
        super().__init__()

        self.__voter_id : int = 0
        self.__voter_place : str = ""
        self.__voting_panel = VoterDashboard.VotingPanel()

        self.setWindowIcon( ovs_app_config.getIcon() )
        self.setWindowTitle( TITLE_VOTER_DASHBOARD )
        self.setStyleSheet( CSS_STYLE_FOR_WIDGETS )
        self.setFixedSize( self.FIXED_WIDTH , self.FIXED_HEIGHT )

        layout = QVBoxLayout()

        layout.addLayout( ovs_app_config.createHeading("Welcome Voter") )

        info_layout = QHBoxLayout()
        
        self.__label_voter_id = ovs_app_config.createDashboardLabel("")
        self.__label_voter_name = ovs_app_config.createDashboardLabel("")
        self.__label_voter_place = ovs_app_config.createDashboardLabel("")

        info_layout.addWidget( self.__label_voter_id )
        info_layout.addWidget( self.__label_voter_name )
        info_layout.addWidget( self.__label_voter_place )

        layout.addLayout( info_layout )

        self.__btn_vote = QPushButton("V O T E")
        self.__btn_vote.setStyleSheet( CSS_STYLE_FOR_BUTTONS )
        self.__btn_vote.clicked.connect( self.giveVote )

        layout.addWidget( self.__btn_vote )
        self.setLayout(layout)



    def showUI( self , __values : dict[int, str | int]) -> None:

        self.__voter_id = int(__values[ KEY_ID ])
        self.__voter_place = str(__values[ KEY_PLACE ])

        self.__label_voter_id.setText( f"Voter ID: { self.__voter_id }" )
        self.__label_voter_name.setText( f"Name: {__values[KEY_FIRST_NAME] + ' ' + __values[KEY_LAST_NAME]}" )
        self.__label_voter_place.setText( f"Place: { self.__voter_place.capitalize()}" )
        
        self.show()


    def giveVote( self ) -> None :

        try :
            ovs_data_manager.raiseExceptionIfVoteAlreadyGiven( self.__voter_id )
            values = ovs_data_manager.getAllCandidates( self.__voter_place )

            if values.__len__() == 0 : ovs_app_config.showInformation( self, "Election is completed in your place.")

            else : self.__voting_panel.showUI( self.__voter_id , values )

        except Exception as excep :
            ovs_app_config.showInformation( self, excep.__str__() )
    


    def closeEvent( self , __event : QCloseEvent) -> None :
        self.__voting_panel.close()
        __event.accept()