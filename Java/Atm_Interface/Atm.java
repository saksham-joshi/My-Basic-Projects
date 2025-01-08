import java.io.FileReader;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
//import java.io.FileReader;
import javax.swing.JOptionPane;

import java.time.LocalDate;
import java.time.LocalTime;

final class Atm {

    final private static String HISTORY_FILEPATH = "./history/%s.txt";
    final private static String DETAIL_FILEPATH = "./details/%s.txt";

    final private static String ACCOUNT_NUMBER_NOT_EXISTS_MESSAGE = "No such account number exists!";

    final private static String CREDITED_TRANSACTION_FORMAT = "SENDER: %s\n" +
            "AMOUNT: %d\n" +
            "DATE : %s\n" +
            "TIME : %s\n" +
            "---------------------------------\n\n";
    final private static String DEBITED_TRANSACTION_FORMAT = "RECEIVER: %s\n" +
            "AMOUNT: %d\n" +
            "DATE : %s\n" +
            "TIME : %s\n" +
            "---------------------------------\n\n";

    final private static int FLAG_CREDITED = 0;
    final private static int FLAG_DEBITED = 1;

    private FileWriter history_writer;

    private String account_number;

    private int balance_amount;

    boolean __fail__ = false;

    public Atm(String account_num) {
        try {

            // checking if account exists or not
            // it will throw an exception if the file not found and 
            // also do not create a new file.
            new FileReader(String.format(Atm.DETAIL_FILEPATH, account_num)).close();

            this.account_number = account_num;

            this.balance_amount = this.get_balance();

            this.update_history_file();

            // when the program exits, it will call the lambda function in which it updates
            // the file.
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                try {

                    this.update_balance();

                    this.history_writer.close();

                } catch (Exception e) {

                }
            }));

        } catch (Exception e) {
            this.display_account_not_found_exception();
            __fail__ = true;
        }
    }

    private void update_balance() {
        try {
            FileWriter fw = new FileWriter(String.format(Atm.DETAIL_FILEPATH, this.account_number));
            fw.write(String.valueOf(this.balance_amount));
            fw.close();
        } catch (Exception e) {

        }
    }

    private void display_account_not_found_exception() {
        JOptionPane.showMessageDialog(null, Atm.ACCOUNT_NUMBER_NOT_EXISTS_MESSAGE, "Invalid Account Number",
                JOptionPane.WARNING_MESSAGE);
        __fail__ = true;
    }

    private void update_history_file() {
        try {
            this.history_writer = new FileWriter(String.format(Atm.HISTORY_FILEPATH, this.account_number), true);
        } catch (Exception e) {
            this.display_account_not_found_exception();
        }
    }

    private int get_balance() {
        try {

            String str = new String(
                    Files.readAllBytes(Paths.get(String.format(Atm.DETAIL_FILEPATH, this.account_number)))).trim();

            if (str.length() == 0) {
                return 0;
            }

            return Integer.parseInt(str);

        } catch (Exception e) {
            this.display_account_not_found_exception();
        }
        return this.balance_amount;
    }

    public void deposit(int amount) {
        try {

            if (amount < 1) {
                JOptionPane.showMessageDialog(null, "You cannot deposit Rs " + amount + " .", "Error",
                        JOptionPane.ERROR_MESSAGE);
                return;
            }

            int new_amount = amount + this.get_balance();

            this.balance_amount = new_amount;

            this.update_balance();

            this.save_transaction("ATM Deposit", amount, FLAG_CREDITED);

            JOptionPane.showMessageDialog(null, "Successfully deposited "+amount+" to your account.", "Success", JOptionPane.INFORMATION_MESSAGE);

        } catch (Exception e) {

            this.display_account_not_found_exception();
        }
    }

    public void withdraw(int withdraw_amount) {
        try {

            if (withdraw_amount > this.balance_amount || withdraw_amount < 1) {

                JOptionPane.showMessageDialog(null,
                        "Your account balance is Rs" + this.balance_amount + " and you cannot withdraw Rs "+withdraw_amount+" .",
                        "Error", JOptionPane.ERROR_MESSAGE);

                return;
            }

            this.balance_amount -= withdraw_amount;

            this.update_balance();

            this.save_transaction("ATM Withdraw", withdraw_amount, Atm.FLAG_DEBITED);

            JOptionPane.showMessageDialog(null, ("Successfully withdrawed Rs " + withdraw_amount
                    + ".\nYour current balance is Rs " + this.balance_amount + " ."), "Amount Withdrawed",
                    JOptionPane.INFORMATION_MESSAGE);

        } catch (Exception e) {
            this.__fail__ = true;
        }
    }

    public String get_history() {
        try {
            return new String(Files.readAllBytes(Paths.get(String.format(Atm.HISTORY_FILEPATH, this.account_number))));
        } catch (Exception e) {
            __fail__ = true;
        }
        return " ";
    }

    private void save_transaction(String _acc_num, int amount, int flag) {
        try {
            if (flag == FLAG_CREDITED) {
                history_writer.write(String.format(Atm.CREDITED_TRANSACTION_FORMAT, _acc_num, amount, LocalDate.now(),
                        (LocalTime.now().getHour() + ":" + LocalTime.now().getMinute() + ":"
                                + LocalTime.now().getSecond())));
            } else {

                history_writer.write(String.format(Atm.DEBITED_TRANSACTION_FORMAT, _acc_num, amount, LocalDate.now(),
                        (LocalTime.now().getHour() + ":" + LocalTime.now().getMinute() + ":"
                                + LocalTime.now().getSecond())));
            }
            this.history_writer.close();

            this.update_history_file();

        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Exception", JOptionPane.WARNING_MESSAGE);
        }
    }

    public void transfer(String acc_num , int amount_to_be_transferred){

        try{
            
            Atm obj = new Atm(acc_num);
            if(!obj.__fail__){

                int current_balance = this.get_balance();
                if(current_balance < amount_to_be_transferred){
                    JOptionPane.showMessageDialog(null,
                        "Your account balance is Rs" + this.balance_amount + " and you cannot transfer Rs "+amount_to_be_transferred +" .",
                        "Error", JOptionPane.ERROR_MESSAGE);
                        return;
                }
                this.balance_amount = current_balance - amount_to_be_transferred;
                this.update_balance();
                this.save_transaction(acc_num, amount_to_be_transferred, Atm.FLAG_DEBITED);

                obj.balance_amount+=amount_to_be_transferred;
                obj.update_balance();
                this.save_transaction(acc_num, amount_to_be_transferred, Atm.FLAG_CREDITED);

                JOptionPane.showMessageDialog(null, "Rs "+amount_to_be_transferred+" successfully transferred to Account Number "+acc_num+" .",  "Success", JOptionPane.INFORMATION_MESSAGE);
            }
        }
        catch (Exception e){
            JOptionPane.showMessageDialog(null, "Error caught: "+e.toString()+" .", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}