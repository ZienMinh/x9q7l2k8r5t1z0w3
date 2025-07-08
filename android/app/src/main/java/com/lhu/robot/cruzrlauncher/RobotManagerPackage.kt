package com.lhu.robot.cruzrlauncher

import android.view.View
import com.lhu.robot.cruzrlauncher.modules.*
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class RobotManagerPackage : ReactPackage {

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): MutableList<NativeModule> = listOf(
        RobotManagerModule(reactContext),
        SpeechManagerModule(reactContext),
        EmotionManagerModule(reactContext),
        ServoManagerModule(reactContext),
        MotionManagerModule(reactContext),
        LocomotionManagerModule(reactContext),
        PowerManagerModule(reactContext),
        RechargingManagerModule(reactContext),
        AssistantManagerModule(reactContext),
    ).toMutableList()
}