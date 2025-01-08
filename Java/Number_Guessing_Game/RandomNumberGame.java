import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.JComboBox;
import javax.swing.ImageIcon;
import javax.swing.JOptionPane;
import javax.swing.SwingUtilities;
import javax.swing.border.EmptyBorder;

import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.BorderLayout;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;

public class RandomNumberGame extends JFrame {
    private JButton playButton, checkButton;
    private JTextField numberField;
    private JComboBox<String> difficultyComboBox;
    private JLabel messageLabel, hintLabel;

    private JPanel mainPanel;

    final static private String APP_TITLE = "Random Guess";
    
    final static private Font BUTTON_FONT = new Font("verdana", Font.BOLD, 12);
    final static private Font HINT_FONT = new Font("verdana", Font.BOLD, 13);
    final static private Font NUMBER_FIELD_FONT = new Font("arial", Font.BOLD,14);
    final static private Font MESSAGE_LABEL_FONT = new Font("arial", Font.BOLD, 14);

    final static private Color BG_COLOR = new Color(24, 200, 216);

    final static private Color BG_PLAY_BUTTON_COLOR = new Color(229, 255, 249);
    final static private Color FORE_PLAY_BUTTON_COLOR = new Color(0, 68, 158);

    final static private Color BG_CHECK_BUTTON_COLOR= new Color(0 ,194 ,0);
    final static private Color FORE_CHECK_BUTTON_COLOR= new Color(255,255,255);

    final static private Color BG_COMBOBOX_COLOR = new Color(24 , 211 , 214);
    final static private Color FORE_COMBOBOX_COLOR= new Color(0, 68, 158);

    private int randomNumber;
    private int chancesLeft = 2;

    private int min = 0;
    private int max = 0;

    public RandomNumberGame() {
        setTitle(RandomNumberGame.APP_TITLE);
        setSize(500, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setIconImage(new ImageIcon("icon.png").getImage());
        getContentPane().setBackground(RandomNumberGame.BG_COLOR);

        this.mainPanel = new JPanel();
        this.mainPanel.setBackground(RandomNumberGame.BG_COLOR);
        this.mainPanel.setLayout(new GridLayout(6, 1,10,10));
        this.mainPanel.setBorder(new EmptyBorder(10,30,10,30));

        playButton = new JButton("PLAY");
        playButton.setFont(RandomNumberGame.BUTTON_FONT);
        playButton.setBackground(RandomNumberGame.BG_PLAY_BUTTON_COLOR);
        playButton.setForeground(RandomNumberGame.FORE_PLAY_BUTTON_COLOR);
        playButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                playButtonClicked();
            }
        });
        mainPanel.add(playButton, BorderLayout.CENTER);

        difficultyComboBox = new JComboBox<>();
        difficultyComboBox.addItem("Easy");
        difficultyComboBox.addItem("Medium");
        difficultyComboBox.addItem("Hard");

        difficultyComboBox.setFont(RandomNumberGame.BUTTON_FONT);
        difficultyComboBox.setBackground(RandomNumberGame.BG_COMBOBOX_COLOR );
        difficultyComboBox.setForeground(RandomNumberGame.FORE_COMBOBOX_COLOR);
        mainPanel.add(difficultyComboBox);

        numberField = new JTextField(10);
        numberField.setFont(RandomNumberGame.NUMBER_FIELD_FONT);
        numberField.setVisible(false);
        mainPanel.add(numberField);

        checkButton = new JButton("CHECK");
        checkButton.setVisible(false);
        checkButton.setFont(RandomNumberGame.BUTTON_FONT);
        checkButton.setBackground(RandomNumberGame.BG_CHECK_BUTTON_COLOR);
        checkButton.setForeground(RandomNumberGame.FORE_CHECK_BUTTON_COLOR);
        checkButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                checkButtonClicked();
            }
        });
        mainPanel.add(checkButton);

        messageLabel = new JLabel();
        messageLabel.setFont(RandomNumberGame.MESSAGE_LABEL_FONT);
        mainPanel.add(messageLabel);

        hintLabel = new JLabel();
        hintLabel.setForeground(RandomNumberGame.FORE_PLAY_BUTTON_COLOR);
        hintLabel.setFont(RandomNumberGame.HINT_FONT);
        hintLabel.setVisible(false);

        mainPanel.add(hintLabel);

        add(mainPanel);
    }

    private void playButtonClicked() {
        String difficulty = (String) difficultyComboBox.getSelectedItem();
        if (difficulty.equals("Easy")) {
            randomNumber = generateRandomNumber(1, 10);
            chancesLeft = 2;
        } else if (difficulty.equals("Medium")) {
            randomNumber = generateRandomNumber(1, 25);
            chancesLeft = 3;
        } else if (difficulty.equals("Hard")) {
            randomNumber = generateRandomNumber(1, 50);
            chancesLeft = 4;
        }
        
        numberField.setVisible(true);

        hintLabel.setText("Hints: ");
        makeHint();
        hintLabel.setVisible(true);

        checkButton.setVisible(true);
        updateChancesLeft();

        this.playButton.setVisible(false);
        this.difficultyComboBox.setVisible(false);
    }

    private int generateRandomNumber(int min, int max) {
        this.min = min;
        this.max = max;
        return new Random().nextInt(max - min + 1) + min;
    }

    private void updateChancesLeft(){
        this.messageLabel.setText("Chances Left: "+this.chancesLeft);
        this.messageLabel.setVisible(true);
    }

    private void playingAgain(){

        this.playButton.setVisible(true);
        this.difficultyComboBox.setVisible(true);

        this.numberField.setVisible(false);
        this.numberField.setText("");

        this.checkButton.setVisible(false);
        this.hintLabel.setVisible(false);
        this.messageLabel.setVisible(false);
    }

    private void checkButtonClicked() {
        if (chancesLeft == 0) {
            messageLabel.setText("Try Again! You will win.");
            return;
        }
        String numberStr = numberField.getText().trim() ;
        if (numberStr.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please enter a number.");
            return;
        }
        int guessedNumber = Integer.parseInt(numberStr);
        if (guessedNumber == randomNumber) {
            JOptionPane.showMessageDialog(this , "Hurrahh! You predicted the number... Awesome!","Awesome!",JOptionPane.PLAIN_MESSAGE);
            playingAgain();
        } else {
            if (chancesLeft == 1) {
                JOptionPane.showMessageDialog(this , "Try again... You will Win!","Lack of Luck!",JOptionPane.PLAIN_MESSAGE);
                playingAgain();
                return;
            } else {
                this.updateChancesLeft();
                
            }
            chancesLeft--;
            this.updateChancesLeft();
        }
    }

    private void makeHint(){
        hintLabel.setText("Range is "+this.min+" and "+this.max+" .\n");
        if (randomNumber % 2 == 0) {
            hintLabel.setText(hintLabel.getText() + "The number is even and");
        } else {
            hintLabel.setText(hintLabel.getText() + "The number is odd and");
        }
        if (isPrime(randomNumber)) {
            hintLabel.setText(hintLabel.getText() + " is prime.");
        } else {
            hintLabel.setText(hintLabel.getText() + " is not prime.");
        }
    }

    private boolean isPrime(int num) {
        if (num <= 1) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                RandomNumberGame game = new RandomNumberGame();
                game.setVisible(true);
            }
        });
    }
}
