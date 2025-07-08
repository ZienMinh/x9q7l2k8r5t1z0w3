package com.ubtechinc.cruzr.userverify.api;

public interface ISecurityCallBack {
    void onBindSuccess();

    void onBindfail();

    void onDisconnect();

    void securityModeChange(int i);
}
