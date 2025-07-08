package com.lhu.robot.cruzrlauncher

import android.app.Activity
import android.content.Context.WIFI_SERVICE
import android.net.wifi.WifiManager
import android.text.format.Formatter
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.lhu.robot.cruzrlauncher.robot.RobotManager
import com.lhu.robot.cruzrlauncher.utils.LogUtils
import com.ubtechinc.cruzr.userverify.api.CruzrSecurityApi
import com.ubtechinc.cruzr.userverify.api.ISecurityCallBack
import com.ubtrobot.Robot
import kotlin.system.exitProcess


class RobotManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  companion object {
    const val MODULE_NAME = "RobotManager"
  }

  override fun getName(): String {
    return MODULE_NAME
  }

  private val cruzrSecurityCallback: ISecurityCallBack = object : ISecurityCallBack {
    override fun onBindSuccess() {
      LogUtils.d(MODULE_NAME, "cruzrSecurityCallback onBindSuccess")
    }

    override fun onBindfail() {
      LogUtils.d(MODULE_NAME, "cruzrSecurityCallback onBindfail")
    }

    override fun onDisconnect() {
      LogUtils.d(MODULE_NAME, "cruzrSecurityCallback onDisconnect")
    }

    override fun securityModeChange(i: Int) {
      LogUtils.d(MODULE_NAME, "cruzrSecurityCallback securityModeChange: $i")
    }
  }

  @ReactMethod
  fun init() {
    if (BuildConfig.BUILD_VARIANT == "ui"){
      LogUtils.d(MODULE_NAME, "ignore init in ui build")
      return
    }
    Robot.initialize(reactApplicationContext)
    LogUtils.d(MODULE_NAME, "has been initialized!")

    CruzrSecurityApi.get().init(reactApplicationContext, cruzrSecurityCallback)
  }

  private fun _isRobot(): Boolean {
    return BuildConfig.BUILD_VARIANT != "ui"
  }

  @ReactMethod
  fun isRobot(promise: Promise) {
    promise.resolve(_isRobot())
  }

  @ReactMethod
  fun getRobotId(promise: Promise){
    if (!_isRobot()){
      promise.resolve("config")
      return
    }
    val serial = RobotManager.getDeviceId(reactApplicationContext)
    promise.resolve(serial)
  }

  @Suppress("DEPRECATION")
  @ReactMethod
  fun getWifiIpAddress(promise: Promise){
    val wifiManager = reactApplicationContext.getSystemService(WIFI_SERVICE) as WifiManager
    val ipAddress = Formatter.formatIpAddress(wifiManager.connectionInfo.ipAddress)
    promise.resolve(ipAddress)
  }

  @ReactMethod
  fun restartApplication() {
    // Systems at 29/Q and later don't allow relaunch, but System.exit(0) on
    // all supported systems will relaunch ... but by killing the process, then
    // restarting the process with the back stack intact. We must make sure that
    // the launch activity is the only thing in the back stack before exiting.
    val activity = reactApplicationContext.currentActivity as Activity
    val pm = activity.packageManager
    val intent = pm.getLaunchIntentForPackage(activity.packageName)
    activity.finishAffinity() // Finishes all activities.
    activity.startActivity(intent) // Start the launch activity
    exitProcess(0) // System finishes and automatically relaunches us.
  }

  @ReactMethod
  fun getPassword(promise: Promise){
    promise.resolve(CruzrSecurityApi.get().password)
  }

}
