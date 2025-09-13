package com.nowcoder.community.controller;

import com.google.code.kaptcha.Producer;
import com.nowcoder.community.entity.LoginTicket;
import com.nowcoder.community.entity.Page;
import com.nowcoder.community.entity.User;
import com.nowcoder.community.service.UserService;
import com.nowcoder.community.util.CommunityConstant;
import com.nowcoder.community.util.CookieUtil;
import com.nowcoder.community.util.MailClient;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController implements CommunityConstant {

    @Autowired
    private UserService userService;

    @Autowired
    private Producer kaptchaProducer;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @RequestMapping(path = "/register", method = RequestMethod.GET)
    public String getRegisterPage() {
        return "/site/register";
    }

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public String register(Model model, User user) {
        Map<String, Object> map = userService.register(user);
        if (map == null || map.isEmpty()) {
            // register success
            model.addAttribute("msg", "Register success, we have send an activation email to your email.");
            model.addAttribute("target", "/index");
            return "/site/operate-result";
        } else {
            model.addAttribute("usernameMsg", map.get("usernameMsg"));
            model.addAttribute("passwordMsg", map.get("passwordMsg"));
            model.addAttribute("emailMsg", map.get("emailMsg"));
            return "/site/register";
        }
    }

    @RequestMapping(path = "/activation/{userId}/{code}", method = RequestMethod.GET)
    public String activation(Model model, @PathVariable("userId") int userId, @PathVariable("code") String code) {
        int result = userService.activate(userId, code);
        if (result == ACTIVATION_SUCCESS) {
            model.addAttribute("msg", "Activation success, you can login now.");
            model.addAttribute("target", "/login");
        } else if (result == ACTIVATION_REPEAT) {
            model.addAttribute("msg", "This account was activated before, no need to repeat.");
            model.addAttribute("target", "/login");
        } else {
            model.addAttribute("msg", "The activation link is wrong, please check the url in your email.");
            model.addAttribute("target", "/index");
        }

        return "/site/operate-result";
    }

    @RequestMapping(path = "/login", method = RequestMethod.GET)
    public String getLoginPage() {
        return "/site/login";
    }

    @RequestMapping(path = "/kaptcha", method = RequestMethod.GET)
    public void getKaptcha(HttpServletResponse response, HttpSession session) {
        String text = kaptchaProducer.createText();
        BufferedImage image = kaptchaProducer.createImage(text);

        session.setAttribute("kaptcha", text);
        response.setContentType("image/png");
        try {
            OutputStream os = response.getOutputStream();
            ImageIO.write(image, "png", os);
        } catch (IOException e) {
            logger.error("stream kaptcha image fail: " + e.getMessage());
        }
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public String login(Model model, User user, String kaptchaCode, HttpSession session ,HttpServletResponse response) {

        String kaptchaText = (String) session.getAttribute("kaptcha");
        if (kaptchaText == null || StringUtils.isBlank(kaptchaText)) {
            model.addAttribute("kaptchaMsg", "server side kaptcha error");
            return "/site/login";
        }
        if (kaptchaCode == null || StringUtils.isBlank(kaptchaCode) || !kaptchaText.equalsIgnoreCase(kaptchaCode)) {
            model.addAttribute("kaptchaMsg", "kaptcha code is not correct");
            return "/site/login";
        }
        Map<String, Object> loginResult = userService.login(user.getUsername(), user.getPassword());
        if (loginResult.containsKey("ticket")) {
            Cookie cookie = new Cookie("ticket", loginResult.get("ticket").toString());
            cookie.setPath(contextPath);
            /* cookie max age 3600 seconds */
            cookie.setMaxAge(3600);
            response.addCookie(cookie);
            return "redirect:/index";
        } else {
            model.addAttribute("usernameMsg", loginResult.get("usernameMsg"));
            model.addAttribute("passwordMsg", loginResult.get("passwordMsg"));
            return "/site/login";
        }

    }

    @RequestMapping(path = "/logout", method = RequestMethod.GET)
    public String logout(HttpServletRequest request) {
        String ticket = CookieUtil.getValue(request, "ticket");
        if (ticket != null && !StringUtils.isBlank(ticket)) {
            LoginTicket loginTicket = userService.findLoginTicketByTicket(ticket);
            if (loginTicket != null && loginTicket.getStatus() == LOGIN_TICKET_VALID) {
                User user = userService.findUserById(loginTicket.getUserId());
                userService.logout(user);
            }
        }
        return "redirect:/index";
    }

}
