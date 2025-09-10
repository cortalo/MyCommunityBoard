package com.nowcoder.community.util;

import org.apache.kafka.common.protocol.types.Field;

public interface CommunityConstant {

    /**
     * Activation Success
     */
    int ACTIVATION_SUCCESS = 0;

    /**
     * Repeat Activation
     */
    int ACTIVATION_REPEAT = 1;

    /**
     * Activation Fail
     */
    int ACTIVATION_FAILURE = 2;

    /**
     * Default loginTicket expire time in seconds
     */
    int DEFAULT_EXPIRED_SECONDS = 3600 * 12;

    /**
     * Extended loginTicket expire time in seconds
     */
    int REMEMBER_EXPIRED_SECONDS = 3600 * 24 * 100;

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
     * System User Id
     */
    int SYSTEM_USER_ID = 1;


}
