package com.hoshimoto.lovemyself.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/main")
public class Controller {

    @GetMapping
    public String connectServer() {
        return "Server ON";
    }
}