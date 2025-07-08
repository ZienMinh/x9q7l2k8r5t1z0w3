package com.lhu.robot.cruzrlauncher.modules

import com.lhu.robot.cruzrlauncher.robot.RobotManager
import com.lhu.robot.cruzrlauncher.utils.LogUtils
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class LocomotionManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val MODULE_NAME = "LocomotionManager"
    }

    override fun getName(): String {
        return MODULE_NAME
    }

    @ReactMethod
    fun moveStraightBy(angle: Float, distance: Float, promise: Promise) {
        LogUtils.d(MODULE_NAME, "moveStraightBy $angle $distance")
        RobotManager.moveStraightBy(angle, distance)
            .done {
                LogUtils.d(MODULE_NAME, "moveStraightBy done: $it")
                promise.resolve(null)
            }
            .fail {
                promise.reject(it.code.toString(), it.message, it.cause)
            }
    }

    @ReactMethod
    fun turnBy(angle: Float, promise: Promise) {
        LogUtils.d(MODULE_NAME, "turnBy $angle")
        RobotManager.turnBy(angle)
            .done {
                LogUtils.d(MODULE_NAME, "turnBy done: $it")
                promise.resolve(null)
            }
            .fail {
                LogUtils.e(MODULE_NAME, "turnBy failed: $it")
                promise.reject(it.code.toString(), it.message, it.cause)
            }
    }
}
