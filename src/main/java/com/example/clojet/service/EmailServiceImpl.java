package com.example.clojet.service;

import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendEmail(String to, String subject, String content) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true); // HTML 형식으로 메일 내용 전송 가능
            mailSender.send(message);
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
