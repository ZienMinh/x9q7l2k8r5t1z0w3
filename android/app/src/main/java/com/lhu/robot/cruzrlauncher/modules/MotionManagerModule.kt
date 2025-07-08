package com.lhu.robot.cruzrlauncher.modules

import android.net.Uri
import com.lhu.robot.cruzrlauncher.robot.RobotManager
import com.lhu.robot.cruzrlauncher.utils.LogUtils
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import okhttp3.internal.wait


class MotionManagerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val MODULE_NAME = "MotionManager"
    }

    override fun getName(): String {
        return MODULE_NAME
    }

    @ReactMethod
    fun performAction(actionId: String, promise: Promise) {
        RobotManager.performAction(Uri.parse(actionId))
            .done {
                LogUtils.d(MODULE_NAME, "performAction done: $it")
                promise.resolve(null)
            }
            .fail {
                LogUtils.d(MODULE_NAME, "performAction failed: $it")
                promise.reject(it.code.toString(), it.message, it.cause)
            }.done {
                LogUtils.d(MODULE_NAME, "performAction done: $it")
                promise.resolve(null)
            }
    }

    @ReactMethod
    fun resetAction(promise: Promise) {
        LogUtils.d(MODULE_NAME, "resetAction")
        RobotManager.resetAction()
            .done {
                LogUtils.d(MODULE_NAME, "resetAction done: $it")
                promise.resolve(it)
            }
            .fail {
                LogUtils.d(MODULE_NAME, "resetAction failed: $it")
                promise.reject(it.code.toString(), it.message, it.cause)
            }
    }


}
