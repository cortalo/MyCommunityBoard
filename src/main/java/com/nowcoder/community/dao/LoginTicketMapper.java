package com.nowcoder.community.dao;

import com.nowcoder.community.entity.LoginTicket;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginTicketMapper {

    LoginTicket selectById(int id);
    LoginTicket selectByTicket(String ticket);
    int insertLoginTicket(LoginTicket loginTicket);
    int updateStatus(int userId, int status);


}
