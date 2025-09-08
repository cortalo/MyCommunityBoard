package com.nowcoder.community.dao;

import com.nowcoder.community.entity.Message;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MessageMapper {

    // get conversation list for a user, for every conversation return the newest message.
    List<Message> selectConversations(int userId, int offset, int limit);

    // get the numbers of total conversation for a user
    int selectConversationCount(int userId);

    // get all conversations for a conversationId
    List<Message> selectLetters(String conversationId, int offset, int limit);

    // get number of letters in one conversation
    int selectLetterCount(String conversationId);

    // get number of unread letters in one conversation (or all conversations)
    int selectLetterUnreadCount(int userId, String conversationId);

    // insert message
    int insertMessage(Message message);

    // update status of message (read, unread,...)
    int updateStatus(List<Integer> ids, int status);

}
