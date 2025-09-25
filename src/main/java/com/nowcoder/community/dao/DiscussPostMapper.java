package com.nowcoder.community.dao;

import com.nowcoder.community.entity.DiscussPost;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DiscussPostMapper {

    /**
     * select DiscussPosts from database
     * @param userId: if userId = 0, return posts from any userId
     * @param offset: offset
     * @param limit: limit
     * @return a list of discussPost
     */
    List<DiscussPost> selectDiscussPosts(int userId, int offset, int limit);

    /**
     * return number of rows
     * @param userId: if userId = 0, return total number of posts from any userId
     * @return number of posts
     */
    int selectDiscussPostRows(int userId);

    /**
     * select by id
     * @param id: id
     * @return a discussPost
     */
    DiscussPost selectById(int id);

}
