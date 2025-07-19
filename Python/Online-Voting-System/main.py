from Voting_System import *

if __name__ == "__main__":

    voting_app = QApplication(argv)

    ovs_app_config.prepare()

    main_widget = MainApp( )

    main_widget.show()

    ovs_data_manager.connect()

    exit( voting_app.exec() )