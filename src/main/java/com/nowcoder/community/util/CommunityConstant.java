package com.nowcoder.community.util;

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

}
