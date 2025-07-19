from Voting_System.base.base import *

class ElectionResult(QWidget) :

    FIXED_WIDTH = 750
    FIXED_HEIGHT = 600

    def __init__(self) :

        super().__init__()

        self.setWindowIcon( ovs_app_config.getIcon() )
        self.setStyleSheet( CSS_STYLE_FOR_WIDGETS )
        self.setWindowTitle( TITLE_RESULT_DASHBOARD )
        self.setFixedSize( self.FIXED_WIDTH , self.FIXED_HEIGHT )

        main_layout = QVBoxLayout()

        main_layout.addLayout( ovs_app_config.createHeading( TITLE_RESULT_DASHBOARD ) )

        refresh_btn = QPushButton("Refresh")
        refresh_btn.setStyleSheet( CSS_STYLE_FOR_BUTTONS )
        refresh_btn.clicked.connect( self.__showResults )

        main_layout.addWidget( refresh_btn )

        grid_layout = QGridLayout()

        grid_layout.addWidget( ovs_app_config.createDashboardLabel("Place"), 0, 0)
        grid_layout.addWidget( ovs_app_config.createDashboardLabel("Name"), 0, 1)
        grid_layout.addWidget( ovs_app_config.createDashboardLabel("ID"), 0, 2)
        grid_layout.addWidget( ovs_app_config.createDashboardLabel("VoteCount"), 0, 3)

        main_layout.addLayout( grid_layout )

        # adding the scrollarea
        scroll = QScrollArea(self)
        scroll.setWidgetResizable(True)

        self.container = QWidget()
        self.__layout = QVBoxLayout()
        self.container.setLayout( self.__layout ) 
        scroll.setWidget( self.container )

        main_layout.addWidget(scroll)

        self.setLayout(main_layout)

    def show( self ) -> None :
        self.__showResults()
        self.container.show()
        super().show()

    
    def __clearResults(self):

        while self.__layout.count():
            item = self.__layout.takeAt(0)
            widget = item.widget()
            if widget:
                widget.deleteLater()
            else:
                # In case it’s a layout (like QHBoxLayout)
                sub_layout = item.layout()
                if sub_layout:
                    while sub_layout.count():
                        sub_item = sub_layout.takeAt(0)
                        sub_widget = sub_item.widget()
                        if sub_widget:
                            sub_widget.deleteLater()
                    sub_layout.deleteLater()


    def __showResults( self ) -> None :

        self.__clearResults()

        try :
            results = ovs_data_manager.getAllResults()

            for candidate_data in results :
                horizontal_layout = QHBoxLayout()

                horizontal_layout.addWidget( ovs_app_config.createDashboardLabel(str(candidate_data[KEY_PLACE]).capitalize()) )
                horizontal_layout.addWidget( ovs_app_config.createDashboardLabel(str(candidate_data[KEY_FULL_NAME])))
                horizontal_layout.addWidget( ovs_app_config.createDashboardLabel(str(candidate_data[KEY_ID])))
                horizontal_layout.addWidget( ovs_app_config.createDashboardLabel(str(candidate_data[KEY_VOTE_COUNT])))

                self.__layout.addLayout( horizontal_layout )


        except Exception as excep: ovs_app_config.showError( self, excep.__str__() )