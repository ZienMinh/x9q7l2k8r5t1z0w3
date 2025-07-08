package com.lhu.robot.cruzrlauncher.modules

import com.lhu.robot.cruzrlauncher.utils.LogUtils
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.ubtechinc.cruzr.assistant.sdk.AssistantManager


class AssistantManagerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val MODULE_NAME = "AssistantManager"
    }

    override fun getName(): String {
        return MODULE_NAME
    }

    @ReactMethod
    fun showAssistant() {
        LogUtils.d(MODULE_NAME, "showAssistant")
        AssistantManager.get(reactApplicationContext).showAssistant()
    }


    @ReactMethod
    fun hideAssistant() {
        LogUtils.d(MODULE_NAME, "hideAssistant")
        AssistantManager.get(reactApplicationContext).hideAssistant()
    }

    @ReactMethod
    fun showSpecificPrompt(packageName: String) {
        LogUtils.d(MODULE_NAME, "showSpecificPrompt")
        AssistantManager.get(reactApplicationContext).showSpecificPrompt(packageName)
    }

    @ReactMethod
    fun hideSpecificPrompt(packageName: String) {
        LogUtils.d(MODULE_NAME, "hideSpecificPrompt")
        AssistantManager.get(reactApplicationContext).hideSpecificPrompt(packageName)
    }

    @ReactMethod
    fun showOrHidePart(type: Int) {
        LogUtils.d(MODULE_NAME, "hideSpecificPrompt")
        AssistantManager.get(reactApplicationContext).showOrHidePart(type)
    }

    @ReactMethod
    fun switchAssistant(onOff: Boolean) {
        LogUtils.d(MODULE_NAME, "switchAssistant")
        AssistantManager.get(reactApplicationContext).switchAssistant(onOff)
    }

}
