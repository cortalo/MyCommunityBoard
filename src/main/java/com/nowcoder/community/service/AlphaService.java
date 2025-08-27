package com.nowcoder.community.service;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Service
@Scope("prototype")
public class AlphaService {

    public AlphaService() {
        System.out.println("Construct AlphaService");
    }

    @PostConstruct
    public void init() {
        System.out.println("Init AlphaService");
    }

    @PreDestroy
    public void destory() {
        System.out.println("Destory AlphaService");
    }
}
