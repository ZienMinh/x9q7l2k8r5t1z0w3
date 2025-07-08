package com.lhu.robot.cruzrlauncher.utils;

import android.content.ContentResolver;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;

import java.util.ArrayList;
import java.util.List;

public class SettingValueFetcher {
    public SettingValueFetcher() {
    }

    public static String getStringValue(Context context, String key, String defaultValue) {
        if (context != null && !TextUtils.isEmpty(key)) {
            String info = defaultValue;

            try {
                ContentResolver cr = context.getContentResolver();
                Uri uri = Uri.parse("content://com.ubtechinc.settings.provider/CruiserSettings");
                Bundle bundle = cr.call(uri, "getSettings", key, (Bundle)null);
                if (bundle != null) {
                    info = bundle.getString("value");
                }
            } catch (Exception var7) {
                Log.d("getStringValue", var7.getMessage());
            }

            return info;
        } else {
            throw new IllegalArgumentException("context is null or key is null");
        }
    }

    public static boolean setStringValue(Context context, String key, String value) {
        if (context != null && !TextUtils.isEmpty(key) && !TextUtils.isEmpty(value)) {
            boolean insertSuccess = false;

            try {
                ContentResolver cr = context.getContentResolver();
                Uri uri = Uri.parse("content://com.ubtechinc.settings.provider/CruiserSettings");
                Bundle bundle = new Bundle();
                bundle.putString("value", value);
                bundle = cr.call(uri, "setSettingsOuter", key, bundle);
                if (bundle != null) {
                    insertSuccess = bundle.getBoolean("resultValue");
                }
            } catch (Exception var7) {
                Log.d("setStringValue", var7.getMessage());
            }

            return insertSuccess;
        } else {
            throw new IllegalArgumentException("params contains null");
        }
    }

    public static List<String> getAllKeys(Context context) {
        if (context != null) {
            List<String> keys = new ArrayList<>();

            try {
                ContentResolver cr = context.getContentResolver();
                Uri uri = Uri.parse("content://com.ubtechinc.settings.provider/CruiserSettings");
                Bundle bundle = cr.call(uri, "getAllKeys", null, null);
                if (bundle != null) {
                    // Extract keys from the result
                    String[] keyArray = bundle.getStringArray("keys");
                    if (keyArray != null) {
                        for (String key : keyArray) {
                            if (!TextUtils.isEmpty(key)) {
                                keys.add(key);
                            }
                        }
                    }
                }
            } catch (Exception e) {
                Log.d("getAllKeys", e.getMessage());
            }

            return keys;
        } else {
            throw new IllegalArgumentException("context is null");
        }
    }

}
