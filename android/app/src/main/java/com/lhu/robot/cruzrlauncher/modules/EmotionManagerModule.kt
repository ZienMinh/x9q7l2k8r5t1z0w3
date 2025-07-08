package com.lhu.robot.cruzrlauncher.modules

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.lhu.robot.cruzrlauncher.utils.LogUtils
import android.net.Uri
import com.lhu.robot.cruzrlauncher.robot.RobotManager


class EmotionManagerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val MODULE_NAME = "EmotionManager"
    }

    override fun getName(): String {
        return MODULE_NAME
    }


    @ReactMethod
    fun expressEmotion(emotionId: String, promise: Promise) {
        LogUtils.d(MODULE_NAME, "expressEmotion: $emotionId")
        RobotManager.expressEmotion(Uri.parse(emotionId))
            .done {
                LogUtils.d(MODULE_NAME, "expressEmotion done: $it")
                promise.resolve(null)
            }
            .fail {
                LogUtils.d(MODULE_NAME, "expressEmotion failed: $it")
                promise.reject(it.code.toString(), it.message, it.cause)
            }
    }

    @ReactMethod
    fun dismissEmotion(promise: Promise) {
        LogUtils.d(MODULE_NAME, "dismissEmotion")
        RobotManager.dismissEmotion()
            .done {
                LogUtils.d(MODULE_NAME, "dismissEmotion done: $it")
                promise.resolve(it)
            }
            .fail {
                LogUtils.d(MODULE_NAME, "dismissEmotion failed: $it")
                promise.reject(it.code.toString(), it.message, it.cause)
            }
    }

}
