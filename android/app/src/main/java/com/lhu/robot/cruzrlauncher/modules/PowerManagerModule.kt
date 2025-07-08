package com.lhu.robot.cruzrlauncher.modules

import com.lhu.robot.cruzrlauncher.robot.RobotManager
import com.lhu.robot.cruzrlauncher.utils.LogUtils
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class PowerManagerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val MODULE_NAME = "PowerManager"
    }

    override fun getName(): String {
        return MODULE_NAME
    }

    @ReactMethod
    fun shutdown(promise: Promise) {
        LogUtils.d(MODULE_NAME, "shutdown")
        RobotManager.shutdown()
            .done {
                LogUtils.d(MODULE_NAME, "shutdown done: $it")
                promise.resolve(null)
            }
            .fail {
                LogUtils.e(MODULE_NAME, "shutdown failed: $it")
                promise.reject(it.code.toString(), it.message, it.cause)
            }
    }

}
