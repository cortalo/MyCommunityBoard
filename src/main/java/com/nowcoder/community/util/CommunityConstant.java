package com.nowcoder.community.util;

public interface CommunityConstant {

    int ACTIVATION_SUCCESS = 0;
    int ACTIVATION_REPEAT = 1;
    int ACTIVATION_FAILURE = 2;

    int LOGIN_TICKET_VALID = 0;
    int LOGIN_TICKET_INVALID = 1;


    /**
     * entity type: post
     */
    int ENTITY_TYPE_POST = 1;

    /**
     * entity type: comment
     */
    int ENTITY_TYPE_COMMENT = 2;

    /**
     * entity type: user
     */
    int ENTITY_TYPE_USER = 3;

    /**
     * Event Topic: comment
     */
    String TOPIC_COMMENT = "comment";

    /**
     * Event Topic: like
     */
    String TOPIC_LIKE = "like";

    /**
     * Event Topic: follow
     */
    String TOPIC_FOLLOW = "follow";

    /**
     * System user id
     */
    int SYSTEM_USER_ID = 1;

}
