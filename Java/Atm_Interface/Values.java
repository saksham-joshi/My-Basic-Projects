
import java.awt.Toolkit;
import javax.swing.ImageIcon;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

public class Values {
    public static final String BANK_NAME = "Saksham Bank";
    
    public static final int FRAME_WIDTH = 500;
    public static final int FRAME_HEIGHT = 500;

    public static final ImageIcon ICON = new ImageIcon("./assets/icon.png");
    //public static final Icon icon = new ImageIcon("./assets/icon.png");

    public static final Dimension SCREEN_DIM  = Toolkit.getDefaultToolkit().getScreenSize();

    public static final Color BG_COLOR = new Color(1 , 93, 144);
    public static final Color FORE_COLOR = new Color(220,238,252);
    public static final Color BTN_TEXT_COLOR = new Color(1,77,118);
    public static final Color TEXT_BOX_BG_COLOR = new Color(59,127,175);
    //public static final Color TEXT_BOX_FORE_COLOR = new Color(25,55,75);
    public static final Color TEXT_BOX_FORE_COLOR = new Color(255 , 255, 255);

    public static final Font top_title_font = new Font("acknowledgement", Font.PLAIN, 28);
    public static final Font button_font = new Font("ardela edge x01 black", Font.BOLD, 16);
    public static final Font inputbox_font = new Font("berlin sans fb bold",Font.BOLD, 16);
    public static final Font text_font = new Font("verdana", Font.BOLD, 14);

    //public static int ACCOUNT_NUMBER = 0;

    public static Atm _obj_;
}
