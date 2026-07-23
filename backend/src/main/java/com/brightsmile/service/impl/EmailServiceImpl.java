package com.brightsmile.service.impl;

import com.brightsmile.entity.Appointment;
import com.brightsmile.entity.ContactMessage;
import com.brightsmile.exception.EmailException;
import com.brightsmile.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;

    @Value("${clinic.email.address:staff@brightsmiledental.com}")
    private String clinicEmailAddress;

    @Value("${spring.mail.username:sender@gmail.com}")
    private String fromEmail;

    // Constructor Injection
    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendAppointmentEmailToPatient(Appointment appointment) {
        String subject = "Appointment Request Received";
        String htmlBody = buildPatientEmailBody(appointment);

        try {
            sendHtmlEmail(appointment.getEmail(), subject, htmlBody);
            log.info("Email Sent: Appointment confirmation sent successfully to patient: {}", appointment.getEmail());
        } catch (Exception e) {
            log.error("Email Failed: Failed to send appointment email to patient: {}. Reason: {}", appointment.getEmail(), e.getMessage());
            throw new EmailException("Failed to send appointment confirmation to patient.", e);
        }
    }

    @Override
    public void sendAppointmentEmailToStaff(Appointment appointment) {
        String subject = "New Appointment Request - " + appointment.getPatientName();
        String htmlBody = buildStaffEmailBody(appointment);

        try {
            sendHtmlEmail(clinicEmailAddress, subject, htmlBody);
            log.info("Email Sent: Appointment notification sent successfully to clinic staff at: {}", clinicEmailAddress);
        } catch (Exception e) {
            log.error("Email Failed: Failed to send appointment email to staff. Reason: {}", e.getMessage());
            throw new EmailException("Failed to send appointment notification to staff.", e);
        }
    }

    @Override
    public void sendContactFormEmailToStaff(ContactMessage message) {
        String subject = "New Contact Message - " + message.getName();
        String htmlBody = buildContactStaffEmailBody(message);

        try {
            sendHtmlEmail(clinicEmailAddress, subject, htmlBody);
            log.info("Email Sent: Contact form notification sent successfully to clinic staff at: {}", clinicEmailAddress);
        } catch (Exception e) {
            log.error("Email Failed: Failed to send contact email to staff. Reason: {}", e.getMessage());
            throw new EmailException("Failed to send contact notification to staff.", e);
        }
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }

    private String buildPatientEmailBody(Appointment app) {
        String formattedDate = app.getAppointmentDate().format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy"));
        String formattedTime = app.getAppointmentTime().format(DateTimeFormatter.ofPattern("h:mm a"));

        return """
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; color: #333333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 5px solid #0ea5e9; }
                .header { text-align: center; margin-bottom: 25px; }
                .logo { font-size: 24px; font-weight: bold; color: #0ea5e9; text-transform: uppercase; letter-spacing: 1px; }
                .title { font-size: 20px; color: #1e293b; margin-top: 10px; }
                .content { line-height: 1.6; color: #475569; }
                .details-box { background-color: #f8fafc; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0; }
                .details-row { margin: 8px 0; font-size: 15px; }
                .label { font-weight: bold; color: #334155; display: inline-block; width: 100px; }
                .footer { text-align: center; margin-top: 30px; font-size: 13px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">BrightSmile</div>
                    <div class="title">Appointment Request Received</div>
                </div>
                <div class="content">
                    <p>Hello <strong>%s</strong>,</p>
                    <p>Thank you for choosing BrightSmile Dental Care. We have received your appointment request and are currently processing it.</p>
                    
                    <div class="details-box">
                        <div class="details-row"><span class="label">Doctor:</span> <span>%s</span></div>
                        <div class="details-row"><span class="label">Date:</span> <span>%s</span></div>
                        <div class="details-row"><span class="label">Time Slot:</span> <span>%s</span></div>
                        <div class="details-row"><span class="label">Reason:</span> <span>%s</span></div>
                    </div>
                    
                    <p>Our clinic staff will contact you at <strong>%s</strong> within 12–24 hours to confirm your scheduled time slot.</p>
                    <p>If you have any urgent queries, please do not hesitate to contact our clinic directly.</p>
                    <p>Warm regards,<br/><strong>BrightSmile Dental Care Team</strong></p>
                </div>
                <div class="footer">
                    &copy; 2026 BrightSmile Dental Care. All rights reserved.<br/>
                    123 Dental Suite, Medical District, NY | Phone: (555) 019-2831
                </div>
            </div>
        </body>
        </html>
        """.formatted(
                app.getPatientName(),
                app.getDoctor(),
                formattedDate,
                formattedTime,
                app.getReason(),
                app.getPhone()
        );
    }

    private String buildStaffEmailBody(Appointment app) {
        String formattedDate = app.getAppointmentDate().format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy"));
        String formattedTime = app.getAppointmentTime().format(DateTimeFormatter.ofPattern("h:mm a"));

        return """
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fef2f2; color: #333333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 5px solid #ef4444; }
                .header { text-align: center; margin-bottom: 25px; }
                .badge { background-color: #fef2f2; color: #ef4444; padding: 6px 12px; font-size: 13px; font-weight: bold; border-radius: 20px; display: inline-block; border: 1px solid #fee2e2; }
                .title { font-size: 20px; color: #1e293b; margin-top: 15px; font-weight: bold; }
                .content { line-height: 1.6; color: #475569; }
                .details-box { background-color: #fafafa; border: 1px solid #f1f5f9; padding: 20px; margin: 20px 0; border-radius: 6px; }
                .details-row { margin: 10px 0; font-size: 15px; border-bottom: 1px dashed #f1f5f9; padding-bottom: 8px; }
                .details-row:last-child { border-bottom: none; padding-bottom: 0; }
                .label { font-weight: bold; color: #475569; display: inline-block; width: 140px; }
                .alert-action { background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; padding: 12px; border-radius: 4px; font-size: 14px; margin-top: 20px; text-align: center; font-weight: 500; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <span class="badge">ALERT: ACTION REQUIRED</span>
                    <div class="title">New Appointment Request</div>
                </div>
                <div class="content">
                    <p>Hi Staff,</p>
                    <p>A new appointment request has been received. Please review the details below and contact the patient to confirm their scheduled appointment within 24 hours.</p>
                    
                    <div class="details-box">
                        <div class="details-row"><span class="label">Patient Name:</span> <strong>%s</strong></div>
                        <div class="details-row"><span class="label">Email:</span> <span>%s</span></div>
                        <div class="details-row"><span class="label">Phone:</span> <span>%s</span></div>
                        <div class="details-row"><span class="label">Doctor:</span> <span>%s</span></div>
                        <div class="details-row"><span class="label">Date:</span> <span>%s</span></div>
                        <div class="details-row"><span class="label">Time Slot:</span> <span>%s</span></div>
                        <div class="details-row"><span class="label">Reason:</span> <span>%s</span></div>
                    </div>
                    
                    <div class="alert-action">
                        Please dial %s or write to %s to complete this booking.
                    </div>
                </div>
            </div>
        </body>
        </html>
        """.formatted(
                app.getPatientName(),
                app.getEmail(),
                app.getPhone(),
                app.getDoctor(),
                formattedDate,
                formattedTime,
                app.getReason(),
                app.getPhone(),
                app.getEmail()
        );
    }

    private String buildContactStaffEmailBody(ContactMessage msg) {
        return """
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0fdf4; color: #333333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 5px solid #22c55e; }
                .header { text-align: center; margin-bottom: 25px; }
                .badge { background-color: #f0fdf4; color: #16a34a; padding: 6px 12px; font-size: 13px; font-weight: bold; border-radius: 20px; display: inline-block; border: 1px solid #dcfce7; }
                .title { font-size: 20px; color: #1e293b; margin-top: 15px; font-weight: bold; }
                .content { line-height: 1.6; color: #475569; }
                .details-box { background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 6px; }
                .details-row { margin: 10px 0; font-size: 15px; }
                .label { font-weight: bold; color: #475569; display: inline-block; width: 120px; }
                .msg-box { background-color: #ffffff; border: 1px solid #e5e7eb; border-left: 4px solid #16a34a; padding: 15px; border-radius: 4px; margin-top: 10px; font-style: italic; color: #374151; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <span class="badge">CONTACT FORM SUBMISSION</span>
                    <div class="title">New Inquiry Message</div>
                </div>
                <div class="content">
                    <p>Hi Staff,</p>
                    <p>A web user has submitted a question or comment via the clinic contact form:</p>
                    
                    <div class="details-box">
                        <div class="details-row"><span class="label">Sender Name:</span> <strong>%s</strong></div>
                        <div class="details-row"><span class="label">Email Address:</span> <span>%s</span></div>
                        <div class="details-row"><span class="label">Phone Number:</span> <span>%s</span></div>
                        <div class="details-row"><span class="label">Message:</span>
                            <div class="msg-box">"%s"</div>
                        </div>
                    </div>
                    
                    <p>Please reply directly to the patient's email (%s) or phone (%s) to resolve their inquiry.</p>
                </div>
            </div>
        </body>
        </html>
        """.formatted(
                msg.getName(),
                msg.getEmail(),
                msg.getPhone(),
                msg.getMessage(),
                msg.getEmail(),
                msg.getPhone()
        );
    }
}
