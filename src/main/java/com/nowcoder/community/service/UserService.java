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
    private TemplateEngine templateEngine;

    @Autowired
    private MailClient mailClient;

    @Value("${community.path.domain}")
    private String domain;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Autowired
    private LoginTicketMapper loginTicketMapper;

    public User findUserById(int id) {
        return userMapper.selectById(id);
    }

    public User findUserByUsername(String username) {
        return userMapper.selectByUsername(username);
    }

    /**
     * try to add the new user to database, and send an activation email.
     * Return a null map if success, otherwise return error messages in the map.
     * @param user
     * @return the map may have key as usernameMsg, passwordMsg and emailMsg.
     */
    public Map<String, Object> register(User user) {
        Map<String, Object> map = new HashMap<>();

        // null value handling
        if (user == null) {
            throw new IllegalArgumentException("user cannot be null");
        }
        if (StringUtils.isBlank(user.getUsername())) {
            map.put("usernameMsg", "username cannot be empty");
            return map;
        }
        if (StringUtils.isBlank(user.getPassword())) {
            map.put("passwordMsg", "password cannot be empty");
            return map;
        }
        if (StringUtils.isBlank(user.getEmail())) {
            map.put("emailMsg", "email cannot be empty");
            return map;
        }

        // check if username has been registered
        User u = userMapper.selectByUsername(user.getUsername());
        if (u != null) {
            map.put("usernameMsg", "username exists, please use a different username");
            return map;
        }

        // check if email has been registered
        u = userMapper.selectByEmail(user.getEmail());
        if (u != null) {
            map.put("emailMsg", "email exists, please use a different email");
            return map;
        }

        // register
        user.setSalt(CommunityUtil.generateUUID().substring(0,5));
        user.setPassword(CommunityUtil.md5(user.getPassword() + user.getSalt()));
        user.setType(0);
        user.setStatus(0);
        user.setActivationCode(CommunityUtil.generateUUID());
        user.setHeaderUrl(String.format("http://images.nowcoder.com/head/%dt.png", new Random().nextInt(1000)));
        user.setCreateTime(new Date());
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

    public int activate(int userId, String code) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            return ACTIVATION_FAILURE;
        } else if (user.getStatus() == 1) {
            return ACTIVATION_REPEAT;
        } else if (user.getActivationCode().equals(code)) {
            userMapper.updateStatus(userId, 1);
            return ACTIVATION_SUCCESS;
        } else {
            return ACTIVATION_FAILURE;
        }
    }

    /**
     *
     * @param username username input
     * @param password password input
     * @return the returned map may contain key usernameMsg, passwordMsg, ticket
     */
    public Map<String, Object> login(String username, String password) {
        Map<String, Object> map = new HashMap<>();
        // null value handling
        if (username == null || StringUtils.isBlank(username)) {
            map.put("usernameMsg", "username cannot be empty");
            return map;
        }
        if (password == null || StringUtils.isBlank(password)) {
            map.put("passwordMsg", "password cannot be empty");
            return map;
        }

        // check if username exist
        User user = userMapper.selectByUsername(username);
        if (user == null) {
            map.put("usernameMsg", "username does not exist");
            return map;
        }

        // check if user is activated
        if (user.getStatus() == 0) {
            map.put("usernameMsg", "this account is not activated");
            return map;
        }

        // check password
        password = CommunityUtil.md5(password + user.getSalt());
        if (!user.getPassword().equals(password)) {
            map.put("passwordMsg", "password is wrong");
            return map;
        }

        // construct login ticket
        LoginTicket loginTicket = new LoginTicket();
        loginTicket.setUserId(user.getId());
        loginTicket.setTicket(CommunityUtil.generateUUID());
        loginTicket.setStatus(LOGIN_TICKET_VALID);
        loginTicket.setExpired(new Date(System.currentTimeMillis() + 3600 * 1000));
        loginTicketMapper.insertLoginTicket(loginTicket);
        map.put("ticket", loginTicket.getTicket());

        return map;
    }

    public LoginTicket findLoginTicketByTicket(String ticket) {
        return loginTicketMapper.selectByTicket(ticket);
    }

    public void logout(User user) {
        loginTicketMapper.updateStatus(user.getId(), 1);
    }

}
