import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.border.EmptyBorder;

import java.awt.GridLayout;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.BorderLayout;
import java.awt.FlowLayout;

final class Ui {

    // Ui components are given below :
    JFrame frame;
    JButton btn_transaction_history, btn_withdraw, btn_deposit, btn_transfer;
    JLabel top_title;

    JPanel panel_top;
    JPanel panel_btn;

    public Ui() {

        frame = new JFrame(Values.BANK_NAME);
        frame.setSize(Values.FRAME_WIDTH, Values.FRAME_HEIGHT);
        frame.setLocationRelativeTo(null);
        frame.setIconImage(Values.ICON.getImage());
        frame.getContentPane().setBackground(Values.BG_COLOR);

        this.set_panels();

        this.frame.add(this.panel_top, BorderLayout.NORTH);
        this.frame.add(this.panel_btn, BorderLayout.CENTER);

        frame.setVisible(true);
    }

    private void set_panels() {

        // this
        this.panel_top = new JPanel(new FlowLayout(FlowLayout.CENTER));
        this.panel_top.setBackground(Values.BG_COLOR);
        this.panel_top.setBorder(new EmptyBorder(30, 0, 0, 0));

        this.set_labels();

        this.panel_top.add(this.top_title);

        // now setting up panel for buttons
        this.panel_btn = new JPanel(new GridLayout(2, 2, 50, 50));
        this.panel_btn.setBackground(Values.BG_COLOR);
        this.panel_btn.setBorder(new EmptyBorder(50, 50, 50, 50));

        this.set_buttons();

        this.panel_btn.add(this.btn_transaction_history);
        this.panel_btn.add(this.btn_transfer);
        this.panel_btn.add(this.btn_deposit);
        this.panel_btn.add(this.btn_withdraw);
    }

    // setting up buttons like transaction history, transfer, deposit and withdraw
    private void set_buttons() {
        this.btn_transaction_history = new JButton("History");
        this.btn_transaction_history.setFont(Values.button_font);
        this.btn_transaction_history.setBackground(Values.FORE_COLOR);
        this.btn_transaction_history.setForeground(Values.BTN_TEXT_COLOR);
        this.btn_transaction_history.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                history_clicked();
            }
        });

        this.btn_transfer = new JButton("Transfer");
        this.btn_transfer.setFont(Values.button_font);
        this.btn_transfer.setBackground(Values.FORE_COLOR);
        this.btn_transfer.setForeground(Values.BTN_TEXT_COLOR);
        this.btn_transfer.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                transfer_clicked();
            }
        });

        this.btn_deposit = new JButton("Deposit");
        this.btn_deposit.setFont(Values.button_font);
        this.btn_deposit.setBackground(Values.FORE_COLOR);
        this.btn_deposit.setForeground(Values.BTN_TEXT_COLOR);
        this.btn_deposit.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                deposit_clicked();
            }
        });

        this.btn_withdraw = new JButton("Withdraw");
        this.btn_withdraw.setFont(Values.button_font);
        this.btn_withdraw.setBackground(Values.FORE_COLOR);
        this.btn_withdraw.setForeground(Values.BTN_TEXT_COLOR);
        this.btn_withdraw.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                withdraw_clicked();
            }
        });
    }

    // setting up top labels
    private void set_labels() {
        top_title = new JLabel("Saksham Bank", JLabel.CENTER);
        top_title.setFont(Values.top_title_font);
        top_title.setForeground(Values.FORE_COLOR);
    }

    public void close() {
        frame.dispose();
    }

    private void history_clicked() {
        JFrame fr = new JFrame("Transaction History");
        fr.getContentPane().setBackground(Values.BG_COLOR);
        fr.setIconImage(Values.ICON.getImage());
        fr.setSize((int) Toolkit.getDefaultToolkit().getScreenSize().getWidth() / 4,
                (int) Toolkit.getDefaultToolkit().getScreenSize().getHeight() - 100);

        JTextArea textArea = new JTextArea(Values._obj_.get_history());
        textArea.setFont(Values.text_font);
        textArea.setBackground(Values.BG_COLOR);
        textArea.setForeground(Values.FORE_COLOR);

        fr.add(new JScrollPane(textArea, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS,
                JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS));
        fr.setVisible(true);
    }

    private void deposit_clicked() {
        try {
            int amount = Integer.parseInt(JOptionPane.showInputDialog(this.frame, "Enter the amount to deposit:"));
            Values._obj_.deposit(amount);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this.frame,
                    "Invalid amount entered.\n Only Numbers are allowed with no decimals.", "Invalid Input",
                    JOptionPane.WARNING_MESSAGE);
        }
    }

    private void withdraw_clicked() {
        try {
            int amount = Integer.parseInt(JOptionPane.showInputDialog(this.frame, "Enter the amount to withdraw:"));
            Values._obj_.withdraw(amount);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this.frame,
                    "Invalid amount entered.\n Only Numbers are allowed with no decimals.", "Invalid Input",
                    JOptionPane.WARNING_MESSAGE);
        }
    }

    private void transfer_clicked() {
        try {
            String receiver_account_no = JOptionPane.showInputDialog("Enter the receiver's account number:");

            int amount = Integer.parseInt(JOptionPane.showInputDialog("Enter the amount to transfer:"));

            JOptionPane.showMessageDialog(this.frame, "Succesfully transferred Rs" + amount + " .", "Success",
                    JOptionPane.OK_CANCEL_OPTION);

            Values._obj_.transfer(receiver_account_no, amount);

        } catch (Exception e) {

        }
    }

}
