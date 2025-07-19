from .data_manager import *


CSS_STYLE_FOR_BUTTONS = f"""
    QPushButton {{
        background-color: #ffffff;
        color: {COLOR_CODE_BACKGROUND};
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        padding: 10px 20px;
    }}
    QPushButton:hover {{
        background-color: #e8e8e8;
    }}
"""

CSS_STYLE_FOR_FORM_BUTTONS = f"""
    QPushButton {{
        background-color: #ffffff;
        color: {COLOR_CODE_BACKGROUND};
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        padding: 12px 20px;
    }}
    QPushButton:hover {{
        background-color: #e0e0e0;
    }}
"""

CSS_STYLE_FOR_TOP_HEADING = """
    color: white;
    font-weight:bolder;
"""

CSS_STYLE_FOR_WIDGETS = f"""
    background-color:{COLOR_CODE_BACKGROUND};
    color:white
"""

CSS_STYLE_FOR_INPUT_BOX = """
    QLineEdit, QComboBox {
        min-height: 38px;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 15px;
        font-weight: bold;
        background-color:white;
        color:black
    }
"""

CSS_STYLE_FOR_INPUT_LABELS = """
    color: white;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 4px;
"""

CSS_STYLE_FOR_DASHBOARD_LABELS = """
    color: white;
    font-weight: bolder;
    font-size: 20px;
    margin-bottom: 4px;
"""



class AppConfigs :

    class UInt64Validator(QValidator):
        __MAX_VALUE = 18446744073709551615

        def __init__(self, parent=None):
            super().__init__(parent)



        def validate(self, input_str : str, pos):

            try :

                if input_str.__len__() == 0 : return QValidator.State.Intermediate, input_str, pos

                elif input_str.isdigit():   # isdigit() returns False for negative values

                    int_value = int( input_str )

                    if int_value <= self.__MAX_VALUE :  return QValidator.State.Acceptable, input_str, pos
                
            except : pass
                
            return QValidator.State.Invalid , input_str , pos



        def fixup(self, input_str): return ""



    def __init__( self ) :  
        self.__icon = None
        self.__heading_font = None
        self.__button_font = None
        self.__dashboard_label_font = None
        self.__screen = None


    
    def bringWindowForward( self , __window : QWidget ) -> None :
        __window.show()
        __window.raise_()
        __window.activateWindow()



    def prepare( self ) -> None :
        self.__icon = QIcon( PATH_TO_APP_ICON )
        self.__heading_font = QFont("Arial", 24, QFont.Weight.Bold)
        self.__button_font = QFont("Arial", 22, QFont.Weight.Bold)
        self.__screen = QApplication.primaryScreen().size()
        self.__dashboard_label_font = QFont("Arial" , 32, QFont.Weight.DemiBold)





    def createHeading(self, title: str) -> QHBoxLayout:
        layout = QHBoxLayout()

        # Load and resize election_commission.png
        left_image_label = QLabel()
        left_pixmap = QPixmap(PATH_TO_ELECTION_COMM_IMAGE , "png").scaled(
            100, 60, Qt.AspectRatioMode.KeepAspectRatio, Qt.TransformationMode.SmoothTransformation
        )
        left_image_label.setPixmap(left_pixmap)
        left_image_label.setAlignment(Qt.AlignmentFlag.AlignLeft)

        # Load and resize ashok_chakra.png
        right_image_label = QLabel()
        right_pixmap = QPixmap(PATH_TO_ASHOKA_CHAKRA_IMAGE, "png").scaled(
            60, 60, Qt.AspectRatioMode.KeepAspectRatio, Qt.TransformationMode.SmoothTransformation
        )
        right_image_label.setPixmap(right_pixmap)
        right_image_label.setAlignment(Qt.AlignmentFlag.AlignRight)

        # Create the heading label
        heading = QLabel(title)
        heading.setAlignment(Qt.AlignmentFlag.AlignCenter)
        heading.setFont(self.getHeadingFont())
        heading.setStyleSheet(CSS_STYLE_FOR_TOP_HEADING)

        # Add to layout with stretches
        layout.addWidget(left_image_label)
        layout.addStretch(1)
        layout.addWidget(heading)
        layout.addStretch(1)
        layout.addWidget(right_image_label)

        return layout



    def createDashboardLabel( self, __text : str = "" ) -> QLabel :
        label = QLabel( __text )
        label.setStyleSheet( CSS_STYLE_FOR_DASHBOARD_LABELS )
        label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        label.setFont( self.getDashboardLabelFont() )
        return label



    def getIcon( self ) -> QIcon : return QIcon() if self.__icon == None else self.__icon



    def getHeadingFont( self ) -> QFont : return self.__heading_font



    def getButtonFont( self ) -> QFont  : return self.__button_font



    def getScreen( self ) -> QSize : return self.__screen



    def getAlphabetValidator( self ) -> QRegularExpressionValidator : return QRegularExpressionValidator(QRegularExpression("^[a-zA-Z]*$"))



    def getUnsignedIntValidator( self ) -> UInt64Validator : return AppConfigs.UInt64Validator()



    def getDashboardLabelFont( self ) -> QFont : return self.__dashboard_label_font



    def showWrongLoginException( self , parent : QWidget ) -> None :
        QMessageBox.critical( parent, "Invalid Login", "Entered ID and Password didn't matched", QMessageBox.StandardButton.Close)

    

    def showInformation( self, __parent : QWidget , __message : str , __title : str = "Information" ) -> None :
        QMessageBox.information( __parent, __title , __message , buttons= QMessageBox.StandardButton.Ok)



    def showError( self , __parent : QWidget , __message : str , __title : str = "Error") -> None:
        QMessageBox.critical( __parent, __title, __message, buttons= QMessageBox.StandardButton.Ok)



# Global object to cache fonts, icon and other objects for faster loading with low memory usage
ovs_app_config = AppConfigs()