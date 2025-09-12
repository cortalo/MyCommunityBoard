package com.nowcoder.community.controller;

import com.nowcoder.community.entity.DiscussPost;
import com.nowcoder.community.entity.Page;
import com.nowcoder.community.service.DiscussPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController {

    @Autowired
    private DiscussPostService discussPostService;

    @RequestMapping(path = "/index", method = RequestMethod.GET)
    public String getIndexPage(Model model, Page page) {
        /* page.current will get from url argument if present, otherwise page.current by default is 1 */
        page.setPath("/index");
        page.setLimit(10);

        List<DiscussPost> post_list = discussPostService.findDiscussPosts(0, page.getOffset(), page.getLimit());
        if (post_list != null) {
            // store post related information in a list of hashMap;
            List<Map<String, Object>> posts = new ArrayList<>();
            for (DiscussPost post : post_list) {
                Map<String, Object> map = new HashMap<>();
                map.put("post", post);
                posts.add(map);
            }
            // save the list of hashMap in model
            model.addAttribute("posts", posts);
        }
        return "/index";
    }

}
