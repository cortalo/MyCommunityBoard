package com.nowcoder.community.controller;

import com.nowcoder.community.entity.DiscussPost;
import com.nowcoder.community.entity.LoginTicket;
import com.nowcoder.community.entity.Page;
import com.nowcoder.community.entity.User;
import com.nowcoder.community.service.DiscussPostService;
import com.nowcoder.community.service.UserService;
import com.nowcoder.community.util.CommunityConstant;
import com.nowcoder.community.util.CookieUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController implements CommunityConstant {

    @Autowired
    private DiscussPostService discussPostService;

    @Autowired
    private UserService userService;

    @RequestMapping(path = "/index", method = RequestMethod.GET)
    public String getIndexPage(Model model, Page page, HttpServletRequest request) {
        String ticket = CookieUtil.getValue(request, "ticket");
        if (ticket != null && !StringUtils.isBlank(ticket)) {
            LoginTicket loginTicket = userService.findLoginTicketByTicket(ticket);
            if (loginTicket != null && loginTicket.getStatus() == LOGIN_TICKET_VALID) {
                User user = userService.findUserById(loginTicket.getUserId());
                model.addAttribute("user", user);
            }
        }

        /* page.current will get from url argument if present, otherwise page.current by default is 1 */
        page.setPath("/index");
        page.setLimit(10);
        page.setRows(discussPostService.findDiscussPostRows(0));

        List<DiscussPost> post_list = discussPostService.findDiscussPosts(0, page.getOffset(), page.getLimit());
        if (post_list != null) {
            // store post related information in a list of hashMap;
            List<Map<String, Object>> posts = new ArrayList<>();
            for (DiscussPost post : post_list) {
                Map<String, Object> map = new HashMap<>();
                map.put("post", post);
                map.put("user", userService.findUserById(post.getUserId()));
                posts.add(map);
            }
            // save the list of hashMap in model
            model.addAttribute("posts", posts);
        }
        return "/index";
    }

}
