package com.nowcoder.community.dao;

import com.nowcoder.community.entity.DiscussPost;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface DiscussPostMapper {

    List<DiscussPost> selectDiscussPosts(int userId, int offset, int limit);

    // @Param used to give alias for parameter
    // If there is only one parameter, and used in <if>, then it must have alias.
    int selectDiscussPostRows(@Param("userId") int userId);

}
