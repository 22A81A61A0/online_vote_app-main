package com.sau.onlinevoting.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, int otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Your OTP Code for Online Voting");
            helper.setText("Your OTP is: " + otp + "\nUse this to verify your account.", false);
            mailSender.send(message);
        } catch (MessagingException e) {
            System.out.println("Email sending failed: " + e.getMessage());
        }
    }

    public void sendVoteConfirmation(String voterIdEmail) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(voterIdEmail);
            helper.setSubject("Online Voting Confirmation");
            helper.setText("Your vote has been successfully cast. Thank you for participating in the election!", false);
            mailSender.send(message);
        } catch (MessagingException e) {
            System.out.println("Vote confirmation email failed: " + e.getMessage());
        }
    }
    
    
}