import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
import javax.swing.JPanel;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.SwingUtilities;
import javax.swing.border.EmptyBorder;

class LoginPage extends JFrame {

    JPasswordField password_field;
    JTextField account_num_field;
    JButton login_btn;
    JPanel panel1, panel2;
    Ui main_page;

    public LoginPage() {

        setTitle("Login: Saksham Bank");
        setSize(500, 250);
        getContentPane().setBackground(Values.BG_COLOR);
        setLocationRelativeTo(null);
        setResizable(false);
        setIconImage(Values.ICON.getImage());
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosed(WindowEvent e) {
                main_page.close();
            }
        });

        panel1 = new JPanel();
        panel1.setBackground(Values.BG_COLOR);
        panel1.setSize(getWidth(), getHeight() / 3);
        panel1.setLayout(new GridLayout(2, 2, 10, 10));
        panel1.setBorder(new EmptyBorder(50, 10, 0, 10));

        panel2 = new JPanel();
        panel2.setSize(getWidth(), getHeight() / 3);
        panel2.setBackground(Values.BG_COLOR);
        panel2.setLayout(new FlowLayout(FlowLayout.CENTER));
        panel2.setBorder(new EmptyBorder(20, 10, 20, 10));

        set_input_box();

        set_buttons();

        add(panel1);
        add(panel2, BorderLayout.SOUTH);

        setVisible(true);
    }

    private void set_input_box() {

        JLabel label1 = new JLabel("Account Number:");
        label1.setForeground(Values.FORE_COLOR);
        label1.setFont(Values.button_font);

        this.account_num_field = new JTextField();
        this.account_num_field.setBackground(Values.TEXT_BOX_BG_COLOR);
        this.account_num_field.setForeground(Values.TEXT_BOX_FORE_COLOR);
        this.account_num_field.setFont(Values.inputbox_font);

        JLabel label2 = new JLabel("Password:");
        label2.setForeground(Values.FORE_COLOR);
        label2.setFont(Values.button_font);

        this.password_field = new JPasswordField(6);
        this.password_field.setBackground(Values.TEXT_BOX_BG_COLOR);
        this.password_field.setForeground(Values.TEXT_BOX_FORE_COLOR);
        this.password_field.setFont(Values.inputbox_font);

        panel1.add(label1);
        panel1.add(this.account_num_field);
        panel1.add(label2);
        panel1.add(this.password_field);

    }

    private void set_buttons() {

        this.login_btn = new JButton("Login");
        this.login_btn.setBackground(Values.FORE_COLOR);
        this.login_btn.setForeground(Values.BG_COLOR);
        this.login_btn.setSize(getWidth() / 2, 70);

        this.login_btn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {

                String acc_num = account_num_field.getText().toString().trim();

                String password = password_field.getPassword().toString();

                if (acc_num.length() < 8 || password.length() < 6) {
                    JOptionPane.showMessageDialog(getContentPane(), "Invalid Account number or password!", "Invalid",
                            JOptionPane.WARNING_MESSAGE);
                } else {
                    // saving the account number to the Values.ACCOUNT_NUMBER so that option page
                    // elements can use it.
                    //Values.ACCOUNT_NUMBER = Integer.parseInt(acc_num);

                    Values._obj_ = new Atm(acc_num);
                    
                    if (!Values._obj_.__fail__) {
                        // starting the Option page
                        main_page = new Ui();

                        // clearing the input field so that other people can access the account
                        account_num_field.setText("");
                        password_field.setText("");
                    }
                }
            }
        });

        panel2.add(this.login_btn);
    }
}

public class Main {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new LoginPage();
            }
        });
    }
}