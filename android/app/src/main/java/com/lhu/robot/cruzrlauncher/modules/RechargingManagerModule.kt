package com.lhu.robot.cruzrlauncher.modules

import com.lhu.robot.cruzrlauncher.robot.RobotManager
import com.lhu.robot.cruzrlauncher.utils.LogUtils
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class RechargingManagerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val MODULE_NAME = "RechargingManager"
    }

    override fun getName(): String {
        return MODULE_NAME
    }

    @ReactMethod
    fun connectToStation(promise: Promise) {
        LogUtils.d(MODULE_NAME, "connectToStation")
        RobotManager.connectToStation()
            .done {
                LogUtils.d(MODULE_NAME, "connectToStation done: $it")
                promise.resolve(it)
            }
            .fail {
                LogUtils.d(MODULE_NAME, "connectToStation failed: $it")
                promise.reject(it.code.toString(), it.message, it.cause)
            }
    }
}
