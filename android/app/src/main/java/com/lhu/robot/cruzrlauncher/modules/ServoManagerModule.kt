package com.lhu.robot.cruzrlauncher.modules

import com.facebook.react.bridge.*
import com.lhu.robot.cruzrlauncher.robot.RobotManager
import com.lhu.robot.cruzrlauncher.utils.LogUtils
import com.ubtrobot.servo.RotationOption


class ServoManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val MODULE_NAME = "ServoManager"
    }

    override fun getName(): String {
        return MODULE_NAME
    }

    @ReactMethod
    fun getDeviceList(promise: Promise){
        val writableArray = Arguments.createArray()
        LogUtils.d(MODULE_NAME, "getDeviceList")
        val deviceList = RobotManager.getDeviceList()
        LogUtils.d(MODULE_NAME, "total device count: ${deviceList.size}")
        for (device in deviceList){
            val writableMap = Arguments.createMap()
            LogUtils.d(MODULE_NAME, "device: ${device.name} - id: ${device.id} - minAngle: ${device.minAngle} - maxAngle: ${device.maxAngle} - minSpeed: ${device.minSpeed} - maxSpeed: ${device.maxSpeed} - defaultSpeed: ${device.defaultSpeed}")
            writableMap.putString("id", device.id)
            writableMap.putString("name", device.name)
            writableMap.putString("description", device.description)
            writableMap.putDouble("minAngle", device.minAngle.toDouble())
            writableMap.putDouble("maxAngle", device.maxAngle.toDouble())
            writableMap.putDouble("minSpeed", device.minSpeed.toDouble())
            writableMap.putDouble("maxSpeed", device.maxSpeed.toDouble())
            writableMap.putDouble("defaultSpeed", device.defaultSpeed.toDouble())
            writableArray.pushMap(writableMap)
        }
        promise.resolve(writableArray)
    }

    @ReactMethod
    fun rotateTo(servoId: String, angle: Float, duration: Float, promise: Promise){
        LogUtils.d(MODULE_NAME, "rotateTo: $servoId - angle: $angle - duration: $duration")
        RobotManager.rotateServoTo(servoId, angle, duration.toLong())
            .done {
                LogUtils.d(MODULE_NAME, "$servoId rotateTo $angle done!")
                promise.resolve(null)
            }
            .fail {
                LogUtils.d(MODULE_NAME, "$servoId rotateTo $angle failed: $it")
                promise.reject(it.code.toString(), it.message, it.cause)
            }
    }

    @ReactMethod
    fun isRotating(servoId: String, promise: Promise){
        promise.resolve(RobotManager.isServoRotating(servoId))
    }

    @ReactMethod
    fun release(servoId: String, promise: Promise){
        RobotManager.releaseServo(servoId)
            .done {
                promise.resolve(null)
            }.fail {
                LogUtils.d(MODULE_NAME, "release failed: $it")
                promise.reject(it.code.toString(), it.message, it.cause)
            }
    }

    @ReactMethod
    fun getAngle(servoId: String, promise: Promise){
        promise.resolve(RobotManager.getServoAngle(servoId))
    }

    @ReactMethod
    fun rotateSerially(rotateOptions: ReadableArray, promise: Promise){
        val rotationOptions = ArrayList<RotationOption>()
        for (i in 0 until rotateOptions.size()){
            val option = rotateOptions.getMap(i)
            val servoId = option.getString("servoId")
            val angle = option.getDouble("angle").toFloat()
            val duration = option.getDouble("duration").toLong()
            val rotationOption = RotationOption.Builder(servoId).setAngle(angle).setDuration(duration).setAngleAbsolute(true).build()
            rotationOptions.add(rotationOption)
        }
        RobotManager.rotateServoSerially(rotationOptions)
            .done {
                promise.resolve(null)
            }.fail {
                LogUtils.d(MODULE_NAME, "rotateSerially failed: $it")
                promise.reject(it.code.toString(), it.message, it.cause)
            }
    }
}
