package com.nowcoder.community.dao;

import com.nowcoder.community.entity.DiscussPost;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DiscussPostMapper {

    /**
     * select DiscussPosts from database
     * @param userId: if userId = 0, return posts from any userId
     * @param offset
     * @param limit
     * @return
     */
    List<DiscussPost> selectDiscussPosts(int userId, int offset, int limit);

    /**
     * return number of rows
     * @param userId: if userId = 0, return total number of posts from any userId
     * @return
     */
    int selectDiscussPostRows(int userId);

    /**
     * select by id
     * @param id
     * @return
     */
    DiscussPost selectById(int id);

}
