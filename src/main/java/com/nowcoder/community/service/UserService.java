package com.nowcoder.community.service;

import com.nowcoder.community.dao.LoginTicketMapper;
import com.nowcoder.community.dao.UserMapper;
import com.nowcoder.community.entity.LoginTicket;
import com.nowcoder.community.entity.User;
import com.nowcoder.community.util.CommunityConstant;
import com.nowcoder.community.util.CommunityUtil;
import com.nowcoder.community.util.MailClient;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class UserService implements CommunityConstant {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MailClient mailClient;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private LoginTicketMapper loginTicketMapper;

    @Value("${community.path.domain}")
    private String domain;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    public User findUserById(int id) {
        return userMapper.selectById(id);
    }

    public Map<String, Object> register(User user) {
        Map<String, Object> map = new HashMap<>();

        // null value handling
        if(user == null) {
            throw new IllegalArgumentException("user cannot be null!");
        }
        if(StringUtils.isBlank(user.getUsername())) {
            map.put("usernameMsg", "Username cannot by empty");
            return map;
        }
        if(StringUtils.isBlank(user.getPassword())) {
            map.put("passwordMsg", "Password cannot by empty");
            return map;
        }
        if(StringUtils.isBlank(user.getEmail())) {
            map.put("emailMsg", "Email cannot by empty");
            return map;
        }

        // Check if username has been registered
        User u = userMapper.selectByName(user.getUsername());
        if(u != null) {
            map.put("usernameMsg", "This username has already been registered!");
            return map;
        }

        // Check if email has been registered
        u = userMapper.selectByEmail(user.getEmail());
        if(u != null) {
            map.put("emailMsg", "This email has already been registered!");
            return map;
        }

        // Register
        user.setSalt(CommunityUtil.generateUUID().substring(0, 5));
        user.setPassword(CommunityUtil.md5(user.getPassword() + user.getSalt()));
        user.setType(0);
        user.setStatus(0);
        user.setActivationCode(CommunityUtil.generateUUID());
        user.setHeaderUrl(String.format("http://images.nowcoder.com/head/%dt.png", new Random().nextInt(1000)));
        user.setCreateTime(new Date());
        // after insertUser() the primary get automatically injected into user object
        // because in application.properties the mybatis.configuration.useGeneratedKeys=true
        // and in the mapper we specify the primary key.
        userMapper.insertUser(user);

        // sending activation email
        Context context = new Context();
        context.setVariable("email", user.getEmail());
        // http://localhost:8080/community/activation/101/code
        String url = domain + contextPath + "/activation/" + user.getId() + "/" + user.getActivationCode();
        context.setVariable("url", url);
        String content = templateEngine.process("/mail/activation", context);
        mailClient.sendMail(user.getEmail(), "Activate Your Account", content);

        return map;
    }

    public int activation(int userId, String code) {
        User user = userMapper.selectById(userId);
        if (user.getStatus() == 1) {
            return ACTIVATION_REPEAT;
        } else if (user.getActivationCode().equals(code)) {
            userMapper.updateStatus(userId, 1);
            return ACTIVATION_SUCCESS;
        } else {
            return ACTIVATION_FAILURE;
        }
    }

    public Map<String, Object> login(String username, String password, int expiredSeconds) {
        Map<String, Object> map = new HashMap<>();
        // null value handling
        if (StringUtils.isBlank(username)) {
            map.put("usernameMsg", "Username cannot be empty.");
            return map;
        }
        if (StringUtils.isBlank(password)) {
            map.put("passwordMsg", "Password cannot be empty.");
            return map;
        }

        // check if the username exists
        User user = userMapper.selectByName(username);
        if(user == null) {
            map.put("usernameMsg", "Username doesn't exist.");
            return map;
        }

        // check if the account is activated
        if (user.getStatus() == 0) {
            map.put("usernameMsg", "This account has not been activated, check your email to activate the account.");
            return map;
        }

        password = CommunityUtil.md5(password + user.getSalt());
        if (!user.getPassword().equals(password)) {
            map.put("passwordMsg", "password is not correct.");
            return map;
        }

        // generate loginTicket
        LoginTicket loginTicket = new LoginTicket();
        loginTicket.setUserId(user.getId());
        loginTicket.setTicket(CommunityUtil.generateUUID());
        loginTicket.setStatus(0);
        loginTicket.setExpired(new Date(System.currentTimeMillis() + expiredSeconds * 1000));
        loginTicketMapper.insertLoginTicket(loginTicket);

        map.put("ticket", loginTicket.getTicket());
        return map;
    }

    public void logout(String ticket) {
        loginTicketMapper.updateStatus(ticket, 1);
    }

}
