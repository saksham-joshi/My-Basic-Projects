
import java.awt.Color;
import javax.swing.*;
import java.awt.event.*;
import java.awt.Font;
import java.awt.Dimension;
import java.awt.Toolkit;

class calculator_gui extends JFrame{
    
    int decider=1;  // for switching between textfield  | 1 means textfield 1 --&-- 2 means textfield 2
    JFrame fr;
    JButton b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,beq,bpls,bsub,bmul,bdiv,bcut,bdot,bmod,bpow,bswitch;
    JTextField t1,t2;
    JButton bck1,bck2;  // for backspace
    JLabel l1;
    calculator_gui(){

        Dimension d = Toolkit.getDefaultToolkit().getScreenSize();

        ImageIcon icon = new ImageIcon("number_logo.ico");
        fr=new JFrame();
        fr.setSize(370, 490);
        fr.setIconImage(icon.getImage());
        fr.setLocation((int)d.getWidth()-380, 5);
        fr.setResizable(false);
        fr.setLayout(null);
        fr.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        fr.getContentPane().setBackground(Color.DARK_GRAY );

        Font f = new Font("Acknowledgement",Font.PLAIN,15);

        t1 = new JTextField(20);
        t1.setBackground(Color.LIGHT_GRAY);
        t1.setBounds(10,20,270,40);
        t1.setVisible(true);
        t1.setEditable(false);
        t1.setFont(f);
        fr.add(t1);
        

        t2 = new JTextField(20);
        t2.setBackground(Color.LIGHT_GRAY);
        t2.setBounds(10,110,270,40);
        t2.setVisible(true);
        t2.setEditable(false);
        t2.setFont(f);
        fr.add(t2);
        
        l1 = new JLabel("");
        l1.setBounds(135,50 , 60, 60);
        l1.setForeground(Color.WHITE);
        l1.setVisible(true);
        fr.add(l1);

        /* ======| BACKSPACE |======  */

        bck1 = new JButton("<--");
        bck1.setBounds(290,20,50,40);
        bck1.setBackground(Color.BLACK);
        bck1.setForeground(Color.WHITE);
        bck1.setVisible(true);
        fr.add(bck1);
        bck1.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                String str=t1.getText();
                t1.setText(backspace(str));
            }
        });

        bck2 = new JButton("<--");
        bck2.setBounds(290,110,50,40);
        bck2.setBackground(Color.BLACK);
        bck2.setForeground(Color.WHITE);
        bck2.setVisible(true);
        fr.add(bck2);
        bck2.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                t2.setEditable(true);
                String str = t2.getText();
                t2.setText(backspace(str));
                t2.setEditable(false);
            }
        });
        /* ======| BACKSPACE ENDS |====== */
        

        /*1 ======| STARTS BUTTON ROW 1st |====== */

        b1 = new JButton("1");
        b1.setBounds(10,170,60,60);
        b1.setVisible(true);
        b1.setBackground(Color.CYAN);
        fr.add(b1);
        b1.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                
                    t1.setText(t1.getText()+"1");
                   
                }
                else{
                    
                    t2.setText(t2.getText()+"1");
                    
                }
            }
        });

        b2 = new JButton("2");
        b2.setBounds(80,170,60,60);
        b2.setVisible(true);
        b2.setBackground(Color.cyan);
        fr.add(b2);
        b2.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                    
                    t1.setText(t1.getText()+"2");
                    
                }
                else{
                    
                    t2.setText(t2.getText()+"2");
                    
                }
            }
        });
        
        b3 = new JButton("3");
        b3.setBounds(150,170, 60,60);
        b3.setVisible(true);
        b3.setBackground(Color.cyan);
        fr.add(b3);
        b3.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                    
                    t1.setText(t1.getText()+"3");
                    
                }
                else{
                    
                    t2.setText(t2.getText()+"3");
                    
                }
            }
        });

        beq = new JButton("=");
        beq.setBounds(220, 170, 60, 60);
        beq.setBackground(Color.GREEN);
        beq.setVisible(true);
        fr.add(beq);
        beq.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                try{

                    double a=Double.parseDouble(t1.getText());
                    double b=Double.parseDouble(t2.getText());

                    if(b==0 && (l1.getText()=="/" || l1.getText()=="%")){
                        JOptionPane.showMessageDialog(null,"1/0 is Infinite !","Infinity Error",JOptionPane.PLAIN_MESSAGE);
                    }
                    else{
                        switch(l1.getText()){

                            case "+" : t1.setText(String.valueOf(a+b));break;

                            case "-" : t1.setText(String.valueOf(a-b));break;

                            case "X" : t1.setText(String.valueOf(a*b));break;

                            case "/" : t1.setText(String.valueOf(a/b));break;

                            case "%" : t1.setText(String.valueOf(a%b));break;

                            case "pow" : t1.setText(to_power(a, (int)b));break;

                            case "" : JOptionPane.showMessageDialog(null, " > You Forgot to select operation to be Performed .","NO OPERATOR FOUND",JOptionPane.PLAIN_MESSAGE);

                        }   
                    }
                    t2.setText("");
                    decider=2;
                }
                catch(Exception e1){
                    JOptionPane.showMessageDialog(null, " > Invalid Input Found.","INVALID",JOptionPane.PLAIN_MESSAGE);
                }
            }
        });

        bdot=new JButton("dot");
        bdot.setBounds(290,170,60,60);
        bdot.setBackground(Color.PINK);
        bdot.setVisible(true);
        fr.add(bdot);
        bdot.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                    t1.setText(t1.getText()+".");
                }
                else{
                    t2.setText(t2.getText()+".");
                }
            }
        });

        /*1 ======| ENDS BUTTON ROW 1 |====== */



        /*2 ======| STARTS BUTTON ROW 2 |====== */

        b4 = new JButton("4");
        b4.setBounds(10, 240, 60, 60);
        b4.setBackground(Color.cyan);
        b4.setVisible(true);
        fr.add(b4);
        b4.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                    
                    t1.setText(t1.getText()+"4");
                    
                }
                else{
                    
                    t2.setText(t2.getText()+"4");
                    
                }
            }
        });

        b5 = new JButton("5");
        b5.setBounds(80,240,60,60);
        b5.setBackground(Color.cyan);
        b5.setVisible(true);
        fr.add(b5);
        b5.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                    
                    t1.setText(t1.getText()+"5");
                    
                }
                else{
                    
                    t2.setText(t2.getText()+"5");
                    
                }
            }
        });

        b6 = new JButton("6");
        b6.setBounds(150, 240, 60, 60);
        b6.setBackground(Color.cyan);
        b6.setVisible(true);
        fr.add(b6);
        b6.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                    
                    t1.setText(t1.getText()+"6");
                    
                }
                else{
                    
                    t2.setText(t2.getText()+"6");
                   
                }
            }
        });

        bpls = new JButton("+");
        bpls.setBounds(220, 240, 60, 60);
        bpls.setBackground(Color.ORANGE );
        bpls.setVisible(true);
        fr.add(bpls);
        bpls.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                l1.setText("+");
                decider=2;
            }
        });

        bmod = new JButton("%");
        bmod.setBounds(290, 240, 60,60);
        bmod.setBackground(Color.ORANGE);
        bmod.setVisible(true);
        fr.add(bmod);
        bmod.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                l1.setText("%");
                decider=2;
            }
        });

        /*2 ======| ENDS BUTTON ROW 2 |====== */

        /*3 =====| STARTS BUTTON ROW 3 |====== */

        b7 = new JButton("7");
        b7.setBounds(10,310,60,60);
        b7.setBackground(Color.CYAN);
        b7.setVisible(true);
        fr.add(b7);
        b7.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                    t1.setText(t1.getText()+"7");          
                }
                else{
                    t2.setText(t2.getText()+"7");
                }
            }
        });

        b8 = new JButton("8");
        b8.setBounds(80,310,60,60);
        b8.setBackground(Color.CYAN);
        b8.setVisible(true);
        fr.add(b8);
        b8.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                    
                    t1.setText(t1.getText()+"8");
               
                }
                else{
                    
                    t2.setText(t2.getText()+"8");
                    
                }
            }
        });

        b9 = new JButton("9");
        b9.setBounds(150,310,60,60);
        b9.setBackground(Color.CYAN);
        b9.setVisible(true);
        fr.add(b9);
        b9.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                    
                    t1.setText(t1.getText()+"9");
                    
                }
                else{
                    
                    t2.setText(t2.getText()+"9");
                    
                }
            }
        });

        bsub = new JButton("-");
        bsub.setBounds(220,310,60,60);
        bsub.setBackground(Color.ORANGE);
        bsub.setVisible(true);
        fr.add(bsub);
        bsub.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                l1.setText("-");
                decider=2;
            }
        });

        bpow = new JButton("Pow");
        bpow.setBounds(290, 310,60,60);
        bpow.setBackground(Color.ORANGE);
        bpow.setVisible(true);
        fr.add(bpow);
        bpow.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                l1.setText("pow");
                decider=2;
            }
        });

        /*3 ======| ENDS BUTTON ROW 3 |====== */

        /*4 ======| STARTS BUTTON ROW 4 |======= */

        bcut = new JButton("C");
        bcut.setBounds(10,380,60,60);
        bcut.setBackground(new Color(255,51,51));
        bcut.setVisible(true);
        fr.add(bcut);
        bcut.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                l1.setText("");
                t1.setText("");
                t2.setText("");
                decider=1;
            }
        });

        b0 = new JButton("0");
        b0.setBounds(80,380,60,60);
        b0.setBackground(Color.CYAN);
        b0.setVisible(true);
        fr.add(b0);
        b0.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                   
                    t1.setText(t1.getText()+"0");
                    
                }
                else{
                    
                    t2.setText(t2.getText()+"0");
                    
                }
            }
        });

        bdiv = new JButton("/");
        bdiv.setBounds(150,380,60,60);
        bdiv.setBackground(Color.ORANGE);
        bdiv.setVisible(true);
        fr.add(bdiv);
        bdiv.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                l1.setText("/");
                decider=2;
            }
        });

        bmul = new JButton("X");
        bmul.setBounds(220,380,60,60);
        bmul.setBackground(Color.ORANGE);
        bmul.setVisible(true);
        fr.add(bmul);
        bmul.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                l1.setText("X");
                decider=2;
            }
        });

        //ImageIcon icon = new ImageIcon("D:\\MY PROJECTS\\Calculator\\switch_image.png");
        bswitch = new JButton();
        bswitch.setBounds(290,380,60,60);
        bswitch.setIcon(new ImageIcon("switch_image.png"));
        bswitch.setVisible(true);
        fr.add(bswitch);
        bswitch.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                if(decider==1){
                    decider=2;
                }
                else{
                    decider=1;
                }
            }
        });

        /*4 ======| END BUTTON ROW 4 |====== */

        fr.setVisible(true);
        
    }

    public static String backspace(String str){
        String fin="";
        for(int i=0;i<str.length()-1;i++){
            fin=fin+str.charAt(i);
        }
        return fin;
    }

    public static String to_power(double d,int p){
        double fin=1;
        for(int i=1;i<=p;i++){
            fin*=d;
        }
        return String.valueOf(fin);
    }

    public static void main(String[] args) {
        
        SwingUtilities.invokeLater(new Runnable(){
            public void run(){
                new calculator_gui();
            }
        });
    }
}
