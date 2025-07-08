package com.lhu.robot.cruzrlauncher.modules

import com.lhu.robot.cruzrlauncher.robot.RobotManager
import com.lhu.robot.cruzrlauncher.utils.LogUtils
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class SpeechManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    companion object {
        const val MODULE_NAME = "SpeechManager"
    }

    override fun getName(): String {
        return MODULE_NAME
    }


    @ReactMethod
    fun synthesize(text: String, promise: Promise) {
        LogUtils.d(MODULE_NAME, "synthesizing text: $text")
        RobotManager.synthesize(text)
            .done {
                LogUtils.d(MODULE_NAME, "synthesize done: $it")
                promise.resolve(null)
            }
            .fail {
                LogUtils.d(MODULE_NAME, "synthesize failed: $it")
                promise.reject(it.code.toString(), it.message, it.cause)
            }
    }
}
