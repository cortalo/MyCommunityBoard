package com.nowcoder.community.controller;

import com.nowcoder.community.annotation.LoginRequired;
import com.nowcoder.community.entity.User;
import com.nowcoder.community.service.FollowService;
import com.nowcoder.community.service.LikeService;
import com.nowcoder.community.service.UserService;
import com.nowcoder.community.util.CommunityConstant;
import com.nowcoder.community.util.CommunityUtil;
import com.nowcoder.community.util.HostHolder;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController implements CommunityConstant {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Value("${community.path.upload}")
    private String uploadPath;

    @Value("${community.path.domain}")
    private String domain;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Autowired
    private UserService userService;

    @Autowired
    private HostHolder hostHolder;

    @Autowired
    private LikeService likeService;

    @Autowired
    private FollowService followService;

    @LoginRequired
    @RequestMapping(path = "/setting", method = RequestMethod.GET)
    public String getSettingPage() {
        return "/site/setting";
    }

    @LoginRequired
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public String uploadHeader(MultipartFile headerImage, Model model) {
        if (headerImage == null) {
            model.addAttribute("error", "You did not select image.");
            return "/site/setting";
        }

        String filename = headerImage.getOriginalFilename();
        int lastIndex = filename.lastIndexOf(".");
        if (lastIndex == -1) {
            model.addAttribute("error", "This file does not have suffix.");
            return "/site/setting";
        }
        String suffix = filename.substring(lastIndex);
        if(StringUtils.isBlank(suffix)) {
            model.addAttribute("error", "This file does not have suffix.");
            return "/site/setting";
        }

        // generate random file name
        filename = CommunityUtil.generateUUID() + suffix;
        File dest = new File(uploadPath + "/" + filename);
        try {
            // save file
            headerImage.transferTo(dest);
        } catch (IOException e) {
            logger.error("upload file failure: " + e.getMessage());
            throw new RuntimeException("upload file failure, there is problem in the server." ,e);
        }

        // update user's headerUrl (web visit path)
        // http://localhost:8080/community/user/header/xxx.png
        User user = hostHolder.getUser(); // hostHolder is auto generate by interceptor
        String headerUrl = domain + contextPath + "/user/header/" + filename;
        userService.updateHeader(user.getId(), headerUrl);

        return "redirect:/index";
    }

    // http://localhost:8080/community/user/header/xxx.png
    @RequestMapping(path = "/header/{fileName}", method = RequestMethod.GET)
    public void getHeader(@PathVariable("fileName") String fileName, HttpServletResponse response) {
        // path in the server
        fileName = uploadPath + "/" + fileName;
        String suffix = fileName.substring(fileName.lastIndexOf("."));
        response.setContentType("image/" + suffix);
        try (
                FileInputStream fis = new FileInputStream(fileName);
                OutputStream os = response.getOutputStream();
                ) {
            byte[] buffer = new byte[1024];
            int b = 0;
            while((b = fis.read(buffer)) != -1) {
                os.write(buffer, 0, b);
            }
        } catch (IOException e) {
            logger.error("read image failure: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @RequestMapping(path = "/changePassword", method = RequestMethod.POST)
    public String changePassword(@CookieValue("ticket") String ticket, String password, String newPassword, Model model) {
        User user = hostHolder.getUser();
        Map<String, Object> map = userService.changePassword(user.getId(), password, newPassword);
        if (map.containsKey("passwordMsg")) {
            model.addAttribute("passwordMsg", map.get("passwordMsg"));
            return "/site/setting";
        }
        if (map.containsKey("newPasswordMsg")) {
            model.addAttribute("newPasswordMsg", map.get("newPasswordMsg"));
            return "/site/setting";
        }
        if (map.containsKey("successMsg")) {
            userService.logout(ticket);
            return "redirect:/login";
        }

        logger.error("change password failure");
        throw new RuntimeException("change password failure");
    }

    // personal homepage
    @RequestMapping(path = "/profile/{userId}", method = RequestMethod.GET)
    public String getProfilePage(@PathVariable("userId") int userId, Model model) {
        User user = userService.findUserById(userId);
        if (user == null) {
            throw new RuntimeException("This user does not exist.");
        }

        // user
        model.addAttribute("user", user);
        // like count
        int likeCount = likeService.findUserLikeCount(userId);
        model.addAttribute("likeCount", likeCount);

        // followee count
        long followeeCount = followService.findFolloweeCount(userId, ENTITY_TYPE_USER);
        model.addAttribute("followeeCount", followeeCount);

        // follower count
        long followerCount = followService.findFollowerCount(ENTITY_TYPE_USER, userId);
        model.addAttribute("followerCount", followerCount);

        // find if the user is following
        boolean hasFollowed = false;
        if (hostHolder.getUser() != null) {
            hasFollowed = followService.hasFollowed(hostHolder.getUser().getId(), ENTITY_TYPE_USER, userId);
        }
        model.addAttribute("hasFollowed", hasFollowed);


        return "/site/profile";
    }

}
