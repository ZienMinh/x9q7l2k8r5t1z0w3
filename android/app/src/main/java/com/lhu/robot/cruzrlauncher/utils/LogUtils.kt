package com.lhu.robot.cruzrlauncher.utils

import android.util.Log

class LogUtils {
    companion object Singleton {
        private const val tag = "ReactNative"

        fun d(message: String) {
            Log.d(tag, message)
        }
        fun d(moduleName: String, message: String) {
            Log.d(tag, "[$moduleName] $message")
        }

        fun e(message: String) {
            Log.e(tag, message)
        }
        fun e(moduleName: String, message: String) {
            Log.e(tag, "[$moduleName] $message")
        }

        fun i(message: String) {
            Log.i(tag, message)
        }
        fun i(moduleName: String, message: String) {
            Log.i(tag, "[$moduleName] $message")
        }

        fun v(message: String) {
            Log.v(tag, message)
        }
        fun v(moduleName: String, message: String) {
            Log.v(tag, "[$moduleName] $message")
        }

        fun w(message: String) {
            Log.w(tag, message)
        }
        fun w(moduleName: String, message: String) {
            Log.w(tag, "[$moduleName] $message")
        }

    }
}