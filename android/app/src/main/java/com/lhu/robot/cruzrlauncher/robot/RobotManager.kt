package com.lhu.robot.cruzrlauncher.robot

import android.content.Context
import android.util.Log
import com.lhu.robot.cruzrlauncher.utils.SettingValueFetcher
import com.ubtrobot.Robot
import com.ubtrobot.async.ProgressivePromise
import com.ubtrobot.async.Promise
import com.ubtrobot.emotion.EmotionException
import com.ubtrobot.emotion.EmotionManager
import com.ubtrobot.emotion.ExpressingProgress
import com.ubtrobot.locomotion.LocomotionException
import com.ubtrobot.locomotion.LocomotionManager
import com.ubtrobot.locomotion.LocomotionProgress
import com.ubtrobot.motion.*
import com.ubtrobot.power.PowerException
import com.ubtrobot.power.PowerManager
import com.ubtrobot.recharging.ConnectingProgress
import com.ubtrobot.recharging.RechargingException
import com.ubtrobot.recharging.RechargingManager
import com.ubtrobot.resource.ResourceManager
import com.ubtrobot.sensor.SensorListener
import com.ubtrobot.sensor.SensorManager
import com.ubtrobot.servo.*
import com.ubtrobot.skill.Directive
import com.ubtrobot.skill.SkillManager
import com.ubtrobot.skill.exception.DispatchException
import com.ubtrobot.speech.SpeechManager
import com.ubtrobot.speech.SynthesisException
import com.ubtrobot.speech.SynthesisProgress

class RobotManager private constructor() {

    companion object Singleton {

        private const val tag = "RobotManager_SDK"

        private var mEmotionManager: EmotionManager
        private var mMotionManager: MotionManager
        private var mResourceManager: ResourceManager
        private var mSensorManager: SensorManager
        private var mServoManager: ServoManager
        private var mSpeechManager: SpeechManager
        private var mSkillManager: SkillManager
        private var mRechargingManager: RechargingManager
        private var mLocomotionManager: LocomotionManager
        private var mPowerManager: PowerManager

        init {
            Log.d(tag, "RobotManager Singleton init")
            mEmotionManager = Robot.globalContext().getSystemService(EmotionManager.SERVICE)
            mMotionManager = Robot.globalContext().getSystemService(MotionManager.SERVICE)
            mResourceManager = Robot.globalContext().getSystemService(ResourceManager.SERVICE)
            mSensorManager = Robot.globalContext().getSystemService(SensorManager.SERVICE)
            mServoManager = Robot.globalContext().getSystemService(ServoManager.SERVICE)
            mSpeechManager = Robot.globalContext().getSystemService(SpeechManager.SERVICE)
            mSkillManager = Robot.globalContext().getSystemService(SkillManager.SERVICE)
            mRechargingManager = Robot.globalContext().getSystemService(RechargingManager.SERVICE)
            mLocomotionManager = Robot.globalContext().getSystemService(LocomotionManager.SERVICE)
            mPowerManager = Robot.globalContext().getSystemService(PowerManager.SERVICE)
        }

        fun getDeviceId(context: Context): String {
            Log.d(tag, "RobotManager getDeviceId")
            getDeviceKeys(context)
            return SettingValueFetcher.getStringValue(context, "SerialText", "Cruzr")
        }

        private fun getDeviceKeys(context: Context){
            Log.d(tag, "RobotManager getDeviceKeys")
            SettingValueFetcher.getAllKeys(context).let { mutableList ->
                Log.d(tag, "RobotManager getDeviceKeys: $mutableList")
                mutableList.forEach {
                    Log.d(tag, it.toString())
                }
            }
        }

        fun dismissEmotion(): Promise<Void, EmotionException> {
            return mEmotionManager.dismiss()
        }

        fun expressEmotion(uri: android.net.Uri): ProgressivePromise<Void, EmotionException, ExpressingProgress> {
            return mEmotionManager.express(uri)
        }

        fun registerSensorListener(sensorId: String, sensorListener: SensorListener) {
            mSensorManager.registerListener(sensorId, sensorListener)
        }

        fun unregisterSensorListener(sensorListener: SensorListener) {
            mSensorManager.unregisterListener(sensorListener)
        }

        fun dispatchDirective(directive: Directive): Promise<Void, DispatchException>? {
            return mSkillManager.dispatchDirective(directive)
        }

        fun sendIntentInternally(str: String?, obj: Any?): Promise<Void?, DispatchException?>? {
            return if (obj == null) {
                Robot.globalContext().dispatchDirective(str)
            } else Robot.globalContext().dispatchDirective(str, obj)
        }

        fun synthesize(str: String): ProgressivePromise<Void, SynthesisException, SynthesisProgress> {
            return mSpeechManager.synthesize(str)
        }

        fun performAction(uri: android.net.Uri): Promise<Void, PerformingException> {
            return mMotionManager.performAction(uri)
        }

        fun resetAction(): Promise<Void, PerformingException> {
            return mMotionManager.performAction(ActionUris.RESET)
        }

        fun connectToStation(): Promise<Void, RechargingException> {
            return mRechargingManager.connectToStation()
        }

        fun moveStraightBy(
            angle: Float,
            distance: Float
        ): ProgressivePromise<Void, LocomotionException, LocomotionProgress> {
            return mLocomotionManager.moveStraightBy(angle, distance)
        }

        fun turnBy(angle: Float): ProgressivePromise<Void, LocomotionException, LocomotionProgress> {
            return mLocomotionManager.turnBy(angle)
        }

        fun shutdown(): Promise<Void, PowerException> {
            return mPowerManager.shutdown()
        }

        // Servo
        fun getDeviceList(): MutableList<ServoDevice> {
            return mServoManager.deviceList
        }

        fun rotateServoTo(
            servoId: String,
            angle: Float,
            duration: Long
        ): Promise<Void, ServoException> {
            return mServoManager.rotateTo(servoId, angle, duration)
        }

        fun isServoRotating(servoId: String): Boolean {
            return mServoManager.isRotating(servoId)
        }

        fun getServoAngle(servoId: String): Float {
            return mServoManager.getAngle(servoId)
        }

        fun releaseServo(servoId: String): Promise<Void, ServoException> {
            return mServoManager.release(servoId)
        }

        fun rotateServoSerially(optionSeries: List<RotationOption>): Promise<Void, ServoException> {
            return mServoManager.rotateSerially(optionSeries)
        }
    }
}
